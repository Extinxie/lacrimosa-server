import Elysia, { t } from 'elysia'
import z from 'zod'
import { betterAuthplugin } from '../../lib/http/plugins/better-auth'
import { prisma } from '../../lib/prisma'
import { uploadAvatar } from '../../lib/upload/upload-avatar'

export const UsersProfiles = new Elysia({ prefix: '/user' })
	.use(betterAuthplugin)
	.get(
		'/me',
		async ({ user, status }) => {
			const profile = await prisma.user.findUnique({
				where: { id: user.id },
				select: {
					id: true,
					name: true,
					image: true,
					bio: true,
					email: true
				}
			})

			if (!profile) {
				return status(404, { message: 'user-not-found' })
			}

			return profile
		},
		{
			auth: true,
			detail: {
				summary: 'get authenticated user profile me',
				tags: ['users']
			},
			response: {
				200: z.object({
					id: z.string(),
					name: z.string(),
					image: z.string().nullable(),
					bio: z.string().nullable()
				}),
				404: z.object({
					message: z.literal('user-not-found')
				})
			}
		}
	)
	.get(
		'/:id',
		async ({ params, status }) => {
			const profile = await prisma.user.findUnique({
				where: { id: params.id },
				select: { id: true, name: true, image: true, bio: true }
			})

			if (!profile) {
				return status(404, { message: 'user-not-found' })
			}

			return profile
		},
		{
			detail: {
				summary: 'get public user profile by id',
				tags: ['users']
			},
			params: z.object({
				id: z.string()
			}),
			response: {
				200: z.object({
					id: z.string(),
					name: z.string(),
					image: z.string().nullable(),
					bio: z.string().nullable()
				}),
				404: z.object({
					message: z.literal('user-not-found')
				})
			}
		}
	)
	.post(
		'/upload-avatar',
		async ({ user, body, status }) => {
			try {
				const file = body.avatar

				if (file.size > 5 * 1024 * 1024) {
					return status(400, {
						success: false,
						message: 'file-too-large. Max 5MB'
					})
				}

				const imageUrl = await uploadAvatar(file, user.id)

				const updatedUser = await prisma.user.update({
					where: { id: user.id },
					data: { image: imageUrl },
					select: {
						id: true,
						name: true,
						image: true,
						bio: true,
						email: true
					}
				})

				return {
					success: true,
					message: 'avatar-uploaded-successfully',
					user: updatedUser
				}
			} catch (error) {
				if (
					error instanceof Error &&
					error.message === 'invalid-file-type'
				) {
					return status(400, {
						success: false,
						message: 'invalid-file-type. Only JPEG, PNG, WEBP'
					})
				}
				return status(500, {
					success: false,
					message: 'failed-to-upload-avatar'
				})
			}
		},
		{
			auth: true,
			detail: {
				summary: 'upload avatar file',
				tags: ['users']
			},
			body: t.Object({
				avatar: t.File({
					type: [
						'image/jpeg',
						'image/png',
						'image/webp',
						'image/jpg'
					],
					maxSize: '5m'
				})
			}),
			response: {
				200: z.object({
					success: z.boolean(),
					message: z.string(),
					user: z.object({
						id: z.string(),
						name: z.string(),
						image: z.string().nullable(),
						bio: z.string().nullable(),
						email: z.string()
					})
				}),
				400: z.object({
					success: z.boolean(),
					message: z.string()
				}),
				500: z.object({
					success: z.boolean(),
					message: z.string()
				})
			}
		}
	)

import Elysia from 'elysia'
import z from 'zod'
import { betterAuthplugin } from '../../lib/http/plugins/better-auth'
import { prisma } from '../../lib/prisma'

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

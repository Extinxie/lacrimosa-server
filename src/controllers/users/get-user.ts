import Elysia from 'elysia'
import { prisma } from '../../lib/prisma'

export const getAwayUser = new Elysia({ prefix: '/users' }).get(
	'/users-top',
	async () => {
		const userstop = await prisma.user.findMany()
		return { userstop }
	}
)

import { Elysia } from 'elysia'
import { auth } from '../better-auth/auth'

export const authMiddleware = new Elysia().macro({
	isAuth: {
		async resolve({ request: { headers }, set }) {
			const session = await auth.api.getSession({
				headers: headers as Headers
			})

			if (!session) {
				set.status = 401
				throw new Error('Unauthorized')
			}

			return {
				user: session.user,
				session: session.session
			}
		}
	}
})

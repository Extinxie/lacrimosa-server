import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '../../../generated/prisma/client'
import { openAPI } from 'better-auth/plugins'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

export const auth = betterAuth({
	basePath: '/auth',
	plugins: [openAPI()],
	baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3001',
	secret: process.env.BETTER_AUTH_SECRET,
	trustedOrigins: ['http://localhost:5173'],
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
		usePlural: false
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		password: {
			hash: (password: string) => Bun.password.hash(password),
			verify: ({ password, hash }) => Bun.password.verify(password, hash)
		},
		requireEmailVerification: false
	},
	session: {
		expiresIn: 60 * 60 * 24 * 14,
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5
		}
	}
})

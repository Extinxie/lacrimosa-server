import cookie from '@elysiajs/cookie'
import cors from '@elysiajs/cors'
import openapi from '@elysiajs/openapi'
import Elysia from 'elysia'
import { betterAuthplugin, OpenAPI } from './lib/http/plugins/better-auth'
import { UsersProfiles } from './controllers/auth/profile-get'
import { ShikimoriFetch } from './controllers/parser-fetch'
import { animeControllers, getAwayUser, KodikParserLists } from './controllers'

const app = new Elysia()
	.use(
		openapi({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths()
			}
		})
	)
	.use(betterAuthplugin)
	.use(
		cors({
			origin: 'http://localhost:5173',
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
			allowedHeaders: ['Content-Type', 'Authorization']
		})
	)

	.use(UsersProfiles)
	.use(cookie())
	.listen(3001)
	.use(ShikimoriFetch)
	.use(KodikParserLists)
	.use(getAwayUser)
	.use(animeControllers)

console.log(`${app} 🦊 Elysia running on http://localhost:3001`)

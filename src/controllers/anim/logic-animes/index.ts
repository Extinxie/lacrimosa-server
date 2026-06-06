import Elysia, { t } from 'elysia'
import { prisma } from '../../../lib/prisma'

export const animeControllers = new Elysia({
	name: '@controller/post-animes',
	prefix: '/post-animes'
})
	.get('/animes', async () => {
		const animes = await prisma.anime.findMany({ take: 50 })
		return { data: animes }
	})

	.get('/latests', async () => {
		const latestsReales = await prisma.anime.findMany({
			where: {
				releasedOn: {
					not: null,
					lte: new Date()
				}
			},
			orderBy: {
				releasedOn: 'desc'
			},
			take: 20,
			select: {
				id: true,
				slug: true,
				nativeTitle: true,
				russianTitle: true,
				englishTitle: true,
				releasedOn: true,
				poster: true,
				type: true,
				status: true,
				episodesCount: true
			}
		})

		return latestsReales
	})

	.get('/:id', async ({ params: { id } }) => {
		try {
			const result = await prisma.anime.findUnique({
				where: {
					id: id
				},
				select: {
					rating: true,
					poster: true,
					englishTitle: true,
					nativeTitle: true,
					russianTitle: true,
					episodesCount: true
				}
			})
			return result
		} catch (e) {
			console.error(e)
			return []
		}
	})

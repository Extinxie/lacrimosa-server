import Elysia, { t } from 'elysia'
import { prisma } from '../../../lib/prisma'

export const animeControllers = new Elysia({
	name: '@controller/post-animes',
	prefix: '/post-animes'
})

	// тейк 50 тайтлов для глав странциы
	.get('/animes', async () => {
		const animes = await prisma.anime.findMany({ take: 50 })
		return { data: animes }
	})

	// последние тайтлы по выхрду не учитывая FAQ
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

	// открытие аниме тайтла по айди (сравнение slug)
	// переделать
	.get('/:id', async ({ params: { id } }) => {
		try {
			const result = await prisma.anime.findUnique({
				where: {
					slug: id
				},
				select: {
					rating: true,
					poster: true,
					englishTitle: true,
					nativeTitle: true,
					russianTitle: true,
					episodesCount: true,
					description: true,
					tags: true,
					studios: true,
					licensors: true,
					episodes: {
						orderBy: {
							number: 'asc'
						}
					}
				}
			})
			return result
		} catch (e) {
			console.error(e)
		}
	})

	// серч
	.post(
		'',
		async ({ body: { query, limit = 20 } }) => {
			const animes = await prisma.anime.findMany({
				where: {
					isDeleted: false,
					OR: [
						{
							nativeTitle: {
								contains: query,
								mode: 'insensitive'
							}
						},
						{
							russianTitle: {
								contains: query,
								mode: 'insensitive'
							}
						},
						{
							englishTitle: {
								contains: query,
								mode: 'insensitive'
							}
						}
					]
				},
				take: limit,
				orderBy: {
					shikimoriRating: 'desc'
				},
				select: {
					id: true,
					slug: true,
					shikimoriId: true,
					nativeTitle: true,
					russianTitle: true,
					englishTitle: true,
					poster: true,
					type: true,
					status: true,
					episodesCount: true,
					shikimoriRating: true,
					releasedOn: true
				}
			})

			return { data: animes }
		},
		{
			body: t.Object({
				query: t.String({ minLength: 1 }),
				limit: t.Optional(t.Number({ minimum: 1, maximum: 50 }))
			})
		}
	)

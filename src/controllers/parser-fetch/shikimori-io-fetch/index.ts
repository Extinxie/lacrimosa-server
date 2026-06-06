import Elysia from 'elysia'
import { $Enums } from '../../../../generated/prisma/client'
import { apiShikimoriGlobal } from '../../../constants/ports'
import {
	mapShikimoriKind,
	mapShikimoriStatus
} from '../../../utils/shiki-balancer/shiki-balancer'
import { RawShikimoriApiResponse } from '../../../@types/types/shiki.type'
import { prisma } from '../../../lib/prisma'
import { animeControllers } from '../../anim/logic-animes'

export const ShikimoriFetch = new Elysia({
	prefix: '/shikimori',
	name: '@controller/shikimori'
})
	.get('/fetch', async () => {
		try {
			const res = await fetch(
				`${apiShikimoriGlobal}/api/animes?limit=50&order=popularity`
			)
			if (!res.ok) {
				console.error(
					'строка 49, парсер не сработал на популярные анимки'
				)
				return []
			}
			const items: RawShikimoriApiResponse[] = await res.json()

			const results = []
			for (const item of items) {
				const animeData = {
					shikimoriId: item.id,
					myanimelistId: item.id,
					anilistId: null /* kodik */,
					anilibriaId: null /* kodik */,
					kinopoiskId: null /* kodik */,
					imdbId: null /* kodik */,
					kodikId: null /* kodik */,
					aksorId: null /* kodik */,

					// Titles
					nativeTitle: item.name,
					russianTitle: item.russian,
					englishTitle: item.name,

					// Media
					poster: item.image.original
						? `${apiShikimoriGlobal}${item.image.original}`
						: null,
					banner: null /* anilist */,

					// Description
					description: item.description,
					synonyms: [] /* kodik */,
					note: null /* kodik */,
					hashtag: null /* anilist  */,

					// Enums
					country: $Enums.AnimeCountry.JAPAN,
					status: mapShikimoriStatus(item.status),
					type: mapShikimoriKind(item.kind),
					rating: $Enums.AnimeRating.SAFE,
					season: null /* kodik */,

					// Dates & episodes
					year: item.aired_on
						? new Date(item.aired_on).getFullYear()
						: null,
					airedOn: item.aired_on ? new Date(item.aired_on) : null,
					releasedOn: item.released_on
						? new Date(item.released_on)
						: null,
					nextEpisodeAt: null /* kodik */,
					episodesCount: item.episodes,
					episodesAired: item.episodes_aired,
					duration: null /* kodik */,

					// Ratings
					shikimoriRating: parseFloat(item.score) || 0,
					myanimelistRating: 0 /* kodik */,
					anilistRating: 0 /* kodik */,
					kinopoiskRating: 0 /* kodik */,
					imdbRating: 0 /* kodik */,
					averageRating: 0 /* kodik */,
					bayesianRating: 0 /* kodik */,

					// Flags
					hasLgbt: false,
					isCensored: false,
					isDeleted: false
				}
				const saved = await prisma.anime.upsert({
					where: {
						shikimoriId: item.id
					},
					update: animeData,
					create: { ...animeData, slug: item.id.toString() }
				})
				results.push(saved)
			}
			return { success: true, count: results.length }
		} catch (e) {
			console.error(`${e} строка 58`)
			return []
		}
	})

	.use(animeControllers)

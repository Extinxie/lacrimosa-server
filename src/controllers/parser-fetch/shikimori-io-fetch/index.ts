import Elysia from 'elysia'
import { $Enums } from '../../../../generated/prisma/client'
import { apiShikimoriGlobal } from '../../../constants/ports'
import {
	mapShikimoriGenreType,
	mapShikimoriKind,
	mapShikimoriRating,
	mapShikimoriStatus
} from '../../../utils/shiki-balancer/shiki-balancer'
import { fetchShikimoriJson } from '../../../utils/shiki-balancer/shikimori-api'
import {
	RawShikimoriApiDetail,
	RawShikimoriApiResponse,
	ShikimoriGenre
} from '../../../@types/types/shiki.type'
import { prisma } from '../../../lib/prisma'

const upsertGenreTags = async (genres: ShikimoriGenre[]) => {
	const tagIds: { id: string }[] = []

	for (const genre of genres) {
		const russianTitle = genre.russian ?? genre.name
		const tag = await prisma.tag.upsert({
			where: { shikimoriId: genre.id },
			update: {
				russianTitle,
				englishTitle: genre.name,
				type: mapShikimoriGenreType(genre.name)
			},
			create: {
				shikimoriId: genre.id,
				russianTitle,
				englishTitle: genre.name,
				type: mapShikimoriGenreType(genre.name)
			}
		})
		tagIds.push({ id: tag.id })
	}

	return tagIds
}

const buildAnimeData = (item: RawShikimoriApiDetail) => ({
	shikimoriId: item.id,
	myanimelistId: item.myanimelist_id ?? item.id,
	nativeTitle: item.name,
	russianTitle: item.russian,
	englishTitle: item.name,
	poster: item.image.original
		? `${apiShikimoriGlobal}${item.image.original}`
		: null,
	description: item.description,
	synonyms: item.synonyms ?? [],
	country: $Enums.AnimeCountry.JAPAN,
	status: mapShikimoriStatus(item.status),
	type: mapShikimoriKind(item.kind),
	rating: mapShikimoriRating(item.rating),
	year: item.aired_on ? new Date(item.aired_on).getFullYear() : null,
	airedOn: item.aired_on ? new Date(item.aired_on) : null,
	releasedOn: item.released_on ? new Date(item.released_on) : null,
	episodesCount: item.episodes,
	episodesAired: item.episodes_aired,
	duration: item.duration || null,
	shikimoriRating: parseFloat(item.score) || 0,
	isCensored: false,
	isDeleted: false
})

const buildAnimeCreateDefaults = (shikimoriId: number) => ({
	slug: shikimoriId.toString(),
	anilistId: null,
	anilibriaId: null,
	kinopoiskId: null,
	imdbId: null,
	kodikId: null,
	aksorId: null,
	banner: null,
	note: null,
	hashtag: null,
	season: null,
	nextEpisodeAt: null,
	myanimelistRating: 0,
	anilistRating: 0,
	kinopoiskRating: 0,
	imdbRating: 0,
	averageRating: 0,
	bayesianRating: 0,
	hasLgbt: false
})

export const upsertAnimeFromShikimori = async (shikimoriId: number) => {
	const detail = await fetchShikimoriJson<RawShikimoriApiDetail>(
		`${apiShikimoriGlobal}/api/animes/${shikimoriId}`
	)

	if (!detail) return null

	const animeData = buildAnimeData(detail)
	const genreTags = await upsertGenreTags(detail.genres ?? [])

	return prisma.anime.upsert({
		where: { shikimoriId },
		update: {
			...animeData,
			tags: { set: genreTags }
		},
		create: {
			...animeData,
			...buildAnimeCreateDefaults(shikimoriId),
			tags: { connect: genreTags }
		}
	})
}

export const ShikimoriFetch = new Elysia({
	prefix: '/shikimori',
	name: '@controller/shikimori'
}).get('/fetch', async () => {
	try {
		const items = await fetchShikimoriJson<RawShikimoriApiResponse[]>(
			`${apiShikimoriGlobal}/api/animes?limit=50&order=popularity`
		)

		if (!items?.length) {
			console.error('парсер не сработал на популярные анимки')
			return { success: false, count: 0, failed: 0 }
		}

		const results = []
		let failed = 0

		for (const item of items) {
			const saved = await upsertAnimeFromShikimori(item.id)

			if (!saved) {
				failed++
				continue
			}

			results.push(saved)
		}

		return {
			success: results.length > 0,
			count: results.length,
			failed,
			total: items.length
		}
	} catch (e) {
		console.error(`${e} — ошибка парсера Shikimori`)
		return { success: false, count: 0, failed: 0 }
	}
})


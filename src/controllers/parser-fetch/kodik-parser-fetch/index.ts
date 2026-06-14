import Elysia from 'elysia'
import { $Enums } from '../../../../generated/prisma/client'
import {
	KodikApiResponse,
	KodikRawItem
} from '../../../@types/types/kodik.type'
import { loadTranslations } from '../../../utils/cache/cache-translation'
import { prisma } from '../../../lib/prisma'
import { upsertAnimeFromShikimori } from '../shikimori-io-fetch'

export const baseUrlKodikBz = 'https://kodik-api.com'

const ANIME_TYPES = new Set(['anime-serial', 'anime'])

const mapKodikTranslationType = (
	type: KodikRawItem['translation']['type']
): $Enums.TranslationType =>
	type === 'subtitles'
		? $Enums.TranslationType.SUBTITLES
		: $Enums.TranslationType.VOICE

const parseShikimoriId = (value: string | null): number | null => {
	if (!value) return null

	const id = Number.parseInt(value, 10)
	return Number.isNaN(id) ? null : id
}

const ensureEpisodes = async (animeId: string, lastEpisode: number) => {
	if (lastEpisode < 1) return

	const existing = await prisma.episode.findMany({
		where: { animeId },
		select: { number: true }
	})

	const existingNumbers = new Set(existing.map((e) => e.number))
	const missing = []

	for (let number = 1; number <= lastEpisode; number++) {
		if (!existingNumbers.has(number)) {
			missing.push({ animeId, number })
		}
	}

	if (missing.length > 0) {
		await prisma.episode.createMany({ data: missing })
	}
}

const upsertKodikTranslation = async ({
	animeId,
	episodeNumber,
	translatorId,
	item,
	playerUrl
}: {
	animeId: string
	episodeNumber: number
	translatorId: string
	item: KodikRawItem
	playerUrl: string
}) => {
	const episode = await prisma.episode.findFirst({
		where: { animeId, number: episodeNumber }
	})

	if (!episode) return false

	const translationType = mapKodikTranslationType(item.translation.type)
	const source = {
		playerUrl,
		kodikId: item.id,
		season: item.last_season,
		episode: episodeNumber,
		quality: item.quality
	}

	const existing = await prisma.translation.findFirst({
		where: {
			episodeId: episode.id,
			translatorId
		}
	})

	if (existing) {
		await prisma.translation.update({
			where: { id: existing.id },
			data: {
				type: translationType,
				player: $Enums.TranslationPlayer.KODIK,
				source
			}
		})
		return true
	}

	await prisma.translation.create({
		data: {
			episodeId: episode.id,
			translatorId,
			type: translationType,
			player: $Enums.TranslationPlayer.KODIK,
			source
		}
	})

	return true
}

const ensureAnimeForKodik = async (shikimoriId: number) => {
	const existing = await prisma.anime.findUnique({
		where: { shikimoriId },
		select: { id: true, kodikId: true }
	})

	if (existing) {
		return { ...existing, createdFromShikimori: false }
	}

	const created = await upsertAnimeFromShikimori(shikimoriId)

	if (!created) return null

	return {
		id: created.id,
		kodikId: created.kodikId,
		createdFromShikimori: true
	}
}

const syncKodikItem = async (
	item: KodikRawItem,
	translations: Map<number, string>
) => {
	if (!ANIME_TYPES.has(item.type)) {
		return { status: 'skipped' as const, reason: 'not-anime' }
	}

	const shikimoriId = parseShikimoriId(item.shikimori_id)

	if (!shikimoriId) {
		return { status: 'skipped' as const, reason: 'no-shikimori-id' }
	}

	const anime = await ensureAnimeForKodik(shikimoriId)

	if (!anime) {
		return {
			status: 'skipped' as const,
			reason: 'shikimori-not-found',
			shikimoriId
		}
	}

	const translationTitle =
		translations.get(item.translation.id) || item.translation.title

	const translator = await prisma.translator.upsert({
		where: { title: translationTitle },
		update: {},
		create: { title: translationTitle }
	})

	const playerUrl = `https:${item.link}`
	const lastEpisode = item.last_episode || item.episodes_count || 1

	try {
		await prisma.anime.update({
			where: { id: anime.id },
			data: {
				kodikId: item.id,
				...(item.kinopoisk_id
					? { kinopoiskId: Number.parseInt(item.kinopoisk_id, 10) }
					: {}),
				...(item.imdb_id ? { imdbId: item.imdb_id } : {}),
				episodesCount: item.episodes_count,
				hasLgbt: item.lgbt
			}
		})
	} catch (e) {
		await prisma.anime.update({
			where: { id: anime.id },
			data: {
				kodikId: item.id,
				episodesCount: item.episodes_count,
				hasLgbt: item.lgbt
			}
		})
	}

	await ensureEpisodes(anime.id, lastEpisode)

	const linked = await upsertKodikTranslation({
		animeId: anime.id,
		episodeNumber: lastEpisode,
		translatorId: translator.id,
		item,
		playerUrl
	})

	return {
		status: 'linked' as const,
		shikimoriId,
		kodikId: item.id,
		translator: translationTitle,
		episode: lastEpisode,
		linked,
		createdFromShikimori: anime.createdFromShikimori
	}
}

const fetchKodikList = async (token: string) => {
	const response = await fetch(
		`${baseUrlKodikBz}/list?token=${token}&limit=50&with_material_data=true&types=anime-serial,anime`
	)

	if (!response.ok) {
		throw new Error(`kodik-api-error:${response.status}`)
	}

	return response.json() as Promise<KodikApiResponse>
}

export const KodikParserLists = new Elysia({
	prefix: '/parser',
	name: '@controller/parser'
}).get('/kodik', async () => {
	const KODIK_TOKEN = process.env.KODIK_TOKEN

	if (!KODIK_TOKEN) {
		return {
			success: false,
			message: 'KODIK_TOKEN is not set'
		}
	}

	try {
		const translations = await loadTranslations()
		const data = await fetchKodikList(KODIK_TOKEN)
		const linked = []
		const skipped = []

		for (const item of data.results) {
			try {
				const result = await syncKodikItem(item, translations)

				if (result.status === 'linked') {
					linked.push(result)
				} else {
					skipped.push(result)
				}
			} catch (e) {
				console.error(e)
				skipped.push({
					status: 'error' as const,
					kodikId: item.id,
					shikimoriId: item.shikimori_id
				})
			}
		}

		return {
			success: true,
			total: data.results.length,
			linked: linked.length,
			skipped: skipped.length,
			linkedItems: linked,
			skippedItems: skipped
		}
	} catch (e) {
		console.error(e)
		return {
			success: false,
			message: e instanceof Error ? e.message : 'kodik-parser-failed'
		}
	}
})

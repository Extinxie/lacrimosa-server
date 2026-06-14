import 'dotenv/config'
import { prisma } from '../../../lib/prisma'
import type { KodikRawItem } from '../../../@types/types/kodik.type'

const baseUrlKodikBz = 'https://kodik-api.com'

/**
 * Поиск материала в Kodik по Shikimori ID
 */
const searchKodikByShikimoriId = async (
	token: string,
	shikimoriId: number
): Promise<KodikRawItem | null> => {
	const url = `${baseUrlKodikBz}/search?token=${token}&shikimori_id=${shikimoriId}&limit=1`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			console.error(
				`Kodik search error: ${response.status} for shikimori_id ${shikimoriId}`
			)
			return null
		}

		const data = await response.json()

		if (data.results && data.results.length > 0) {
			return data.results[0]
		}

		return null
	} catch (error) {
		console.error(
			`Failed to search Kodik for shikimori_id ${shikimoriId}:`,
			error
		)
		return null
	}
}

/**
 * Поиск материала в Kodik по названию (fallback)
 */
const searchKodikByTitle = async (
	token: string,
	title: string
): Promise<KodikRawItem | null> => {
	const url = `${baseUrlKodikBz}/search?token=${token}&title=${encodeURIComponent(
		title
	)}&limit=5`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			console.error(`Kodik search by title error: ${response.status}`)
			return null
		}

		const data = await response.json()

		if (data.results && data.results.length > 0) {
			// Ищем наиболее релевантный результат
			return data.results[0]
		}

		return null
	} catch (error) {
		console.error(`Failed to search Kodik by title "${title}":`, error)
		return null
	}
}

/**
 * Обновление kodikId для одного аниме
 */
const updateAnimeKodikId = async (
	token: string,
	animeId: string,
	shikimoriId: number,
	title?: string | null
): Promise<{ success: boolean; kodikId?: string; error?: string }> => {
	try {
		// Сначала ищем по Shikimori ID
		let kodikItem = await searchKodikByShikimoriId(token, shikimoriId)

		// Если не нашли и есть название, пробуем поиск по названию
		if (!kodikItem && title) {
			console.log(
				`Поиск по Shikimori ID ${shikimoriId} не дал результатов, пробуем по названию: ${title}`
			)
			kodikItem = await searchKodikByTitle(token, title)
		}

		if (!kodikItem || !kodikItem.id) {
			return { success: false, error: 'Not found in Kodik' }
		}

		// Обновляем запись в базе данных
		await prisma.anime.update({
			where: { id: animeId },
			data: {
				kodikId: kodikItem.id,
				kinopoiskId: kodikItem.kinopoisk_id
					? Number.parseInt(kodikItem.kinopoisk_id, 10)
					: null,
				imdbId: kodikItem.imdb_id || null,
				episodesCount: kodikItem.episodes_count,
				hasLgbt: kodikItem.lgbt || false
			}
		})

		return { success: true, kodikId: kodikItem.id }
	} catch (error) {
		console.error(`Failed to update anime ${animeId}:`, error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		}
	}
}

/**
 * Массовое обновление аниме без kodikId
 */
const updateMissingKodikIds = async (
	token: string,
	batchSize: number = 50
): Promise<{
	totalProcessed: number
	updated: number
	failed: number
	details: {
		title: string
		shikimoriId: number
		success: boolean
		kodikId?: string
		error?: string
	}[]
}> => {
	// Получаем аниме без kodikId, у которых есть shikimoriId
	const animesWithoutKodik = await prisma.anime.findMany({
		where: {
			kodikId: null,
			shikimoriId: {
				gt: 0 // ✅ Правильно: проверяем, что не null
			}
		},
		select: {
			id: true,
			shikimoriId: true,
			nativeTitle: true,
			russianTitle: true
		},
		take: batchSize
	})

	const results = []
	let updated = 0
	let failed = 0

	for (const anime of animesWithoutKodik) {
		const title = anime.russianTitle || anime.nativeTitle
		console.log(`Обработка: ${title} (Shikimori ID: ${anime.shikimoriId})`)

		const result = await updateAnimeKodikId(
			token,
			anime.id,
			anime.shikimoriId,
			title
		)

		if (result.success) {
			updated++
			console.log(`✅ Привязан Kodik ID: ${result.kodikId}`)
		} else {
			failed++
			console.log(`❌ Ошибка: ${result.error}`)
		}

		results.push({
			title: title || 'Unknown',
			shikimoriId: anime.shikimoriId,
			success: result.success,
			kodikId: result.kodikId,
			error: result.error
		})

		// Небольшая задержка, чтобы не флудить API
		await new Promise((resolve) => setTimeout(resolve, 100))
	}

	return {
		totalProcessed: animesWithoutKodik.length,
		updated,
		failed,
		details: results
	}
}

/**
 * Поиск конкретного аниме по Shikimori ID и привязка
 */
const findAndLinkAnimeByShikimoriId = async (
	token: string,
	shikimoriId: number
): Promise<{ success: boolean; message: string; kodikId?: string }> => {
	try {
		// Находим аниме в базе
		const anime = await prisma.anime.findUnique({
			where: { shikimoriId },
			select: { id: true, nativeTitle: true, russianTitle: true }
		})

		if (!anime) {
			return {
				success: false,
				message: `Аниме с Shikimori ID ${shikimoriId} не найдено в базе данных`
			}
		}

		const title = anime.russianTitle || anime.nativeTitle
		const result = await updateAnimeKodikId(
			token,
			anime.id,
			shikimoriId,
			title
		)

		if (result.success) {
			return {
				success: true,
				message: `✅ Найдено и привязано: ${title}`,
				kodikId: result.kodikId
			}
		} else {
			return {
				success: false,
				message: `❌ Не найдено в Kodik: ${title} (${result.error})`
			}
		}
	} catch (error) {
		return {
			success: false,
			message: `Ошибка: ${error instanceof Error ? error.message : 'Unknown error'}`
		}
	}
}

// Экспортируем функции для использования в других местах
export {
	searchKodikByShikimoriId,
	searchKodikByTitle,
	updateAnimeKodikId,
	updateMissingKodikIds,
	findAndLinkAnimeByShikimoriId
}

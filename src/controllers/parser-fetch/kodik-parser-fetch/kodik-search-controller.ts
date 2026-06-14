import 'dotenv/config'
import Elysia from 'elysia'
import {
	updateMissingKodikIds,
	findAndLinkAnimeByShikimoriId
} from './kodik-search'

export const KodikSearchRoutes = new Elysia({
	prefix: '/parser/kodik-search',
	name: '@controller/kodik-search'
})
	// Массовое обновление аниме без kodikId
	.get('/update-missing', async () => {
		const KODIK_TOKEN = process.env.KODIK_TOKEN

		if (!KODIK_TOKEN) {
			return {
				success: false,
				message: 'KODIK_TOKEN is not set in environment variables'
			}
		}

		try {
			const result = await updateMissingKodikIds(KODIK_TOKEN, 50)

			return {
				success: true,
				message: `Обработано: ${result.totalProcessed}, Обновлено: ${result.updated}, Не найдено: ${result.failed}`,
				data: {
					totalProcessed: result.totalProcessed,
					updated: result.updated,
					failed: result.failed,
					details: result.details.slice(0, 10) // Показываем только первые 10 для читаемости
				}
			}
		} catch (error) {
			console.error('Update missing Kodik IDs error:', error)
			return {
				success: false,
				message:
					error instanceof Error ? error.message : 'Unknown error'
			}
		}
	})

	// Поиск конкретного аниме по Shikimori ID
	.get('/find/:shikimoriId', async ({ params }) => {
		const KODIK_TOKEN = process.env.KODIK_TOKEN
		const { shikimoriId } = params

		if (!KODIK_TOKEN) {
			return {
				success: false,
				message: 'KODIK_TOKEN is not set in environment variables'
			}
		}

		const shikimoriIdNum = Number.parseInt(shikimoriId, 10)

		if (isNaN(shikimoriIdNum)) {
			return {
				success: false,
				message: 'Invalid shikimoriId. Must be a number.'
			}
		}

		try {
			const result = await findAndLinkAnimeByShikimoriId(
				KODIK_TOKEN,
				shikimoriIdNum
			)

			return result
		} catch (error) {
			console.error('Find anime by Shikimori ID error:', error)
			return {
				success: false,
				message:
					error instanceof Error ? error.message : 'Unknown error'
			}
		}
	})

	// Поиск конкретного аниме с возможностью указать название
	.get('/find-by-id/:shikimoriId/:title?', async ({ params }) => {
		const KODIK_TOKEN = process.env.KODIK_TOKEN
		const { shikimoriId, title } = params

		if (!KODIK_TOKEN) {
			return {
				success: false,
				message: 'KODIK_TOKEN is not set in environment variables'
			}
		}

		const shikimoriIdNum = Number.parseInt(shikimoriId, 10)

		if (isNaN(shikimoriIdNum)) {
			return {
				success: false,
				message: 'Invalid shikimoriId. Must be a number.'
			}
		}

		try {
			const result = await findAndLinkAnimeByShikimoriId(
				KODIK_TOKEN,
				shikimoriIdNum
			)

			return result
		} catch (error) {
			console.error('Find anime by Shikimori ID error:', error)
			return {
				success: false,
				message:
					error instanceof Error ? error.message : 'Unknown error'
			}
		}
	})

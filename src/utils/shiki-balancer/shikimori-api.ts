const SHIKIMORI_MIN_INTERVAL_MS = 700
const SHIKIMORI_MAX_RETRIES = 5

let lastRequestAt = 0

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const waitForRateLimit = async () => {
	const elapsed = Date.now() - lastRequestAt
	if (elapsed < SHIKIMORI_MIN_INTERVAL_MS) {
		await delay(SHIKIMORI_MIN_INTERVAL_MS - elapsed)
	}
	lastRequestAt = Date.now()
}

const getRetryDelayMs = (res: Response, attempt: number) => {
	const retryAfter = res.headers.get('Retry-After')
	if (retryAfter) {
		const seconds = Number(retryAfter)
		if (!Number.isNaN(seconds)) return seconds * 1000
	}
	return Math.min(30_000, 2_000 * 2 ** attempt)
}

export const fetchShikimoriJson = async <T>(url: string): Promise<T | null> => {
	for (let attempt = 0; attempt <= SHIKIMORI_MAX_RETRIES; attempt++) {
		await waitForRateLimit()

		const res = await fetch(url)

		if (res.ok) return res.json()

		if (res.status === 429 && attempt < SHIKIMORI_MAX_RETRIES) {
			const retryMs = getRetryDelayMs(res, attempt)
			console.warn(
				`Shikimori 429, retry ${attempt + 1}/${SHIKIMORI_MAX_RETRIES} через ${retryMs}ms`
			)
			await delay(retryMs)
			continue
		}

		console.error(`Shikimori API error ${res.status}: ${url}`)
		return null
	}

	return null
}

export type KodikTranslation = {
	id: number
	title: string
	type: 'voice' | 'subtitles'
}

export type KodikRawItem = {
	id: string
	type: string
	link: string
	title: string
	title_orig: string
	other_title: string
	translation: KodikTranslation
	year: number
	last_season: number
	last_episode: number
	episodes_count: number
	kinopoisk_id: string | null
	imdb_id: string | null
	worldart_link: string | null
	shikimori_id: string | null
	quality: string
	camrip: boolean
	lgbt: boolean
	blocked_countries: string[]
	screenshots: string[]
	created_at: string
	updated_at: string
}

export type KodikApiResponse = {
	time: string
	total: number
	prev_page: string | null
	next_page: string | null
	results: KodikRawItem[]
}

export type KodikTranslationsResponse = {
	time: string
	total: number
	results: {
		id: number
		title: string
		count: number
	}[]
}

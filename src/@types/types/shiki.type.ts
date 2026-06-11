export type ShikimoriGenre = {
	id: number
	name: string
	russian: string | null
	kind: string
}

export type RawShikimoriApiResponse = {
	id: number
	name: string
	russian: string
	image: {
		original: string
		preview: string
	}
	url: string
	kind: string
	score: string
	status: string
	episodes: number
	episodes_aired: number
	aired_on: string | null
	description: string | null
	released_on: string | null
}

export type RawShikimoriApiDetail = RawShikimoriApiResponse & {
	duration: number
	rating: string
	synonyms: string[]
	myanimelist_id: number
	genres: ShikimoriGenre[]
}
    
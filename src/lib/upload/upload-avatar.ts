import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const AVATARS_DIR = path.join(process.cwd(), 'uploads', 'avatars')

const MIME_TO_EXT: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/jpg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp'
}

export async function uploadAvatar(file: File, userId: string): Promise<string> {
	const ext = MIME_TO_EXT[file.type]

	if (!ext) {
		throw new Error('invalid-file-type')
	}

	await mkdir(AVATARS_DIR, { recursive: true })

	const filename = `${userId}.${ext}`
	const filepath = path.join(AVATARS_DIR, filename)

	await Bun.write(filepath, file)

	const baseUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001'
	return `${baseUrl}/uploads/avatars/${filename}`
}

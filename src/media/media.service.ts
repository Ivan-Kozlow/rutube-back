import { Injectable } from '@nestjs/common'

import { IMediaResponse } from './media.interface'
import { ensureDir, writeFile } from 'fs-extra'
import { path } from 'app-root-path'

@Injectable()
export class MediaService {
	async saveMedia(file: Express.Multer.File, folder?: string): Promise<IMediaResponse> {
		const uploadFile = `${path}/uploads/${folder}`
		await ensureDir(uploadFile)

		await writeFile(`${uploadFile}/${file.originalname}`, file.buffer)

		return { url: `/uploads/${folder}/${file.originalname}`, name: file.originalname }
	}
}

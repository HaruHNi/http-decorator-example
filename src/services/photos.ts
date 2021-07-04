import { HttpService, GET } from './core'

export interface Photo {
  albumId: number
  id: string
  title: string
  url: string
  thumbnailUrl: string
}

export default class PhotosService extends HttpService {
  @GET('/photos')
  async getPhotos(): Promise<Photo[] | null> {
    return null
  }
}

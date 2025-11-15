export interface roomRes {
  roomId: string,
  createdAt: string,
}

export interface roomPayload {
  name: string,
  hostId: number,
  isPrivate: boolean,
  thumbUrl: string,
  videoId: string,
}
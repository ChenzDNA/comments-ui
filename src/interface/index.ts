export interface Entity {
  id?: number
  ctime?: number
  mtime?: number
}

export interface User extends Entity {
  nickname: string
  username?: string
  password?: string
}

export interface Comment extends Entity {
  context: string
  content: string
  reply: number
  parent: number
  user: number
  subComments: Array<Comment>
}

export interface Res<R> {
  code: number
  msg: string
  data: R
}
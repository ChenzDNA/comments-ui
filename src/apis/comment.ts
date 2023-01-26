import req from "../utils/req";
import { Comments, Res, User } from "../interface";
import { ContentType } from "../utils/contentType";

export async function create(context: string, content: string, reply: number, parent: number): Promise<Res<Comments>> {
  return await req({
    url: '/comment/create',
    method: 'POST',
    data: { context, content, reply, parent },
  }) as Res<Comments>
}

export async function del(id: number): Promise<Res<number>> {
  return await req({
    url: '/comment/delete',
    method: 'POST',
    data: { id },
  }, ContentType.FORM_DATA) as Res<number>
}

export async function getByContext(context: string): Promise<Res<{ 'users': Array<User>, 'comments': Array<Comments>, 'author': string }>> {
  return await req({
    url: '/comment/getByContext',
    method: 'GET',
    params: { context }
  }) as Res<{ 'users': Array<User>, 'comments': Array<Comments>, 'author': string }>
}

import req from "../utils/req";
import { Comments, GetByContext, Res } from "../interface";

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
  }) as Res<number>
}

export async function getByContext(context: string): Promise<Res<GetByContext>> {
  return await req({
    url: '/comment/getByContext',
    method: 'GET',
    params: { context },
  }) as Res<GetByContext>
}

export async function top(id: number): Promise<Res<number>> {
  return await req({
    url: '/comment/top',
    method: 'POST',
    data: { id },
  }) as Res<number>
}

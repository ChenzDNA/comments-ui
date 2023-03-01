import req from "../utils/req";
import { ContentType } from "../utils/contentType";
import { Res } from "../interface";

/**
 *
 * @param cid
 * @param type 1:点赞 0:点踩
 */
export async function create(cid: number, type: number): Promise<Res<number>> {
  return await req({
    url: '/like/create',
    method: 'POST',
    data: { cid, type },
  }, ContentType.FORM_DATA) as Res<number>
}

export async function del(id: number): Promise<Res<number>> {
  return await req({
    url: '/like/delete',
    method: 'POST',
    data: { id },
  }) as Res<number>
}
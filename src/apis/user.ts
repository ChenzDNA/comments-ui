import { Res, User } from "../interface";
import req from "../utils/req";
import { ContentType } from "../utils/contentType";

export async function login(username: string, password: string): Promise<Res<User>> {
  return await req({
    url: '/user/login',
    method: 'POST',
    data: { username, password },
  }) as Res<User>
}

export async function register(username: string, password: string): Promise<Res<User>> {
  return await req({
    url: '/user/register',
    method: 'POST',
    data: { username, password },
  }) as Res<User>
}

export async function updateNickname(nickname: string): Promise<Res<number>> {
  return await req({
    url: '/user/updateNickname',
    method: 'POST',
    data: { nickname },
  }, ContentType.FORM_DATA) as Res<number>
}

export async function updatePassword(password: string): Promise<Res<number>> {
  return await req({
    url: '/user/updatePassword',
    method: 'POST',
    data: { password },
  }, ContentType.FORM_DATA) as Res<number>
}

export async function tokenLogin(): Promise<Res<User>> {
  return await req({
    url: '/user/t',
    method: 'POST',
  }) as Res<User>
}

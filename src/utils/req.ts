import axios, { AxiosRequestConfig } from "axios";
import { ContentType } from "./contentType";

export default async function req(config: AxiosRequestConfig, type: ContentType<any> = ContentType.APPLICATION_JSON): Promise<unknown> {
  const instance = axios.create({
    timeout: 3000,
    baseURL: '/api',
    headers: { Authorization: localStorage.getItem('t'), 'Content-Type': type.value }
  });

  instance.interceptors.response.use((value) => {
    const authorization = value.headers['authorization'];
    authorization && localStorage.setItem('t', authorization)
    return value.data
  })

  if (config.method!.toUpperCase() !== 'GET') {
    config.data = type.resolve(config.data)
  }

  return await instance(config)
}

import axios, { AxiosRequestConfig } from "axios";
import { ContentType } from "./contentType";

export default async function req(config: AxiosRequestConfig, type: ContentType<any> = ContentType.APPLICATION_JSON): Promise<unknown> {
  const instance = axios.create({
    timeout: 3000,
    baseURL: '/api',
    headers: { Authentication: localStorage.getItem('t'), 'Content-Type': type.value }
  });

  instance.interceptors.response.use((value) => {
    const authentication = value.headers['Authentication'];
    if (authentication) {
      localStorage.setItem('t', authentication)
    }
    return value.data
  })

  config.data = type.resolve(config.data)

  return await instance(config)
}

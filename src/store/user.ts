import { defineStore } from "pinia";
import * as UserApi from "../apis/user";
import { Res, User } from "../interface";

export const useUserStore = defineStore('user', {
  state() {
    return {
      hasLogin: false,
      user: {} as User
    }
  },
  actions: {
    async t() {
      let userRes = await UserApi.tokenLogin();
      return this.resolveUserRes(userRes)
    },
    async login(username: string, password: string) {
      const userRes = await UserApi.login(username, password);
      return this.resolveUserRes(userRes)
    },
    async register(username: string, password: string) {
      const userRes = await UserApi.register(username, password)
      return this.resolveUserRes(userRes)
    },
    resolveUserRes(userRes: Res<User>) {
      if (userRes.code !== 200) {
        return userRes.msg
      }
      this.hasLogin = true
      this.user = userRes.data
      return null
    },
    async updateNickname(nickname: string) {
      if (nickname && nickname === this.user.nickname) {
        return
      }
      const res = await UserApi.updateNickname(nickname);
      if (res.code !== 200) {
        return res.msg
      }
      this.user.nickname = nickname
      return null
    },
    async updatePassword(password: string) {
      if (password) {
        return
      }
      const res = await UserApi.updatePassword(password);
      if (res.code !== 200) {
        return res.msg
      }
      return null
    },
    logout() {
      localStorage.removeItem('t')
      this.user = {} as User
      this.hasLogin = false
    }
  }
})
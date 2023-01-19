import { defineStore } from "pinia";
import { tokenLogin } from "../apis/user";
import { User } from "../interface";

export const useUserStore = defineStore('user', {
  state() {
    return {
      hasLogin: false,
      user: {} as User
    }
  },
  actions: {
    async t() {
      let userRes = await tokenLogin();
      if (userRes.code != 200) {

        return
      }
      this.hasLogin = true
      this.user = userRes.data
    }
  }
})
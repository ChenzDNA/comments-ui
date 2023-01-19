import { defineStore } from "pinia";
import { Comments, CommentsView, User } from "../interface";
import * as CommentApi from '../apis/comment'

export const useCommentStore = defineStore('comment', {
  state() {
    return {
      commentList: [] as Array<Comments>,
      userList: [] as Array<User>
    }
  },
  actions: {
    async create(context: string, content: string, reply: number, parent: number) {
      const res = await CommentApi.create(context, content, reply, parent)
      if (res.code !== 200) {
        return res.msg
      }
      this.commentList.push(res.data)
      return null
    },
    async del(id: number) {
      const res = await CommentApi.del(id)
      if (res.code !== 200) {
        return res.msg
      }
      let ind = this.commentList.findIndex((item) => item.id == id);
      this.commentList.splice(ind, 1)
      return null
    },
    async getByContext(context: string) {
      const res = await CommentApi.getByContext(context);
      this.commentList = res.data.comments
      this.userList = res.data.users
    },
  },
  getters: {
    contextComments(state): Array<CommentsView> {
      let res = new Array<CommentsView>()
      let userMap = new Map<number, User>()
      for (const user of state.userList) {
        userMap.set(user.id, user)
      }
      for (const comment of state.commentList) {
        let subComments = new Array<CommentsView>()
        for (const sub of comment.subComments) {
          subComments.push({ user: userMap.get(sub.user)!, comment: sub, subComments: [] })
        }
        res.push({ user: userMap.get(comment.user)!, comment: comment, subComments })
      }
      return res;
    }
  }
})
<script setup lang="ts">
import { CommentsView } from "../interface";
import MarkdownView from "./MarkdownView.vue";
import dayjs from "dayjs";
import { useCommentStore } from "../store/comment";
import { NButton } from 'naive-ui'
import { useUserStore } from "../store/user";
import { computed } from "vue";

const props = defineProps<{ comment: CommentsView }>();

const userStore = useUserStore()
const commentStore = useCommentStore()

function formatDate(time: number): string {
  return dayjs(time).format('YYYY/MM/DD HH:mm')
}

const markdownContent = computed(() => {
  if (props.comment.comment.reply && props.comment.comment.reply !== props.comment.comment.parent) {
    let user = commentStore.getStoreUserByCommentId(props.comment.comment.reply)
    return `**\`${user ? '回复: ' + user.nickname : '回复的评论已删除'}\`**\n\n${props.comment.comment.content}`
  }
  return props.comment.comment.content
})
</script>

<template>
  <div>
    <div class="comment-item">
      <div style="width: 90px;min-width:90px;text-align: center;margin-right: 10px">
        <p :title="comment.user.nickname"
           class="comment-user"
           :style="{color:comment.user.username===commentStore.author?'#0A8CDE':'#495057'}">
          <b>{{ `${comment.user.nickname}${comment.user.username === commentStore.author ? ' (Author)' : ''}` }}</b>
        </p>
      </div>
      <div style="flex: 1;width: 0;min-width: 0">
        <MarkdownView class="comment-content beautify-scrollbar" :content="markdownContent"/>
        <n-button style="margin-right: 10px" @click="commentStore.replyTo(comment.comment.id,comment.comment.parent)">
          回复
        </n-button>
        <n-button v-if="comment.user.id===userStore.user.id" style="color: red"
                  @click="commentStore.del(comment.comment.id,comment.comment.parent)">删除
        </n-button>
        <p style="float: right">{{ formatDate(comment.comment.ctime) }}</p>
      </div>
    </div>
    <SingleComment style="margin-left: 30px" v-for="item of comment.subComments" :comment="item"
                   :key="item.comment.id"/>
  </div>
</template>

<style scoped>
.comment-item {
  display: flex;
}

.comment-content {
  border: 1px solid #495057;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  max-height: 300px;
  margin-bottom: 10px;
}

.comment-user {
  line-break: anywhere;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
</style>
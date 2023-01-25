<script lang="ts" setup>
import { useCommentStore } from "../store/comment";
import SingleComment from "./SingleComment.vue";

const props = defineProps<{ context: string }>()

const commentStore = useCommentStore()

function waitForContext() {
  return new Promise<void>((res) => {
    function w() {
      if (props.context !== '') {
        commentStore.getByContext(props.context)
        res()
        return
      }
      setTimeout(w, 200)
    }

    w()
  })
}

await waitForContext()
</script>

<template>
  <div style="margin: 10px;">
    <span>共 {{ commentStore.count }} 条评论</span>
  </div>
  <hr style="width: calc(100vw - 20px);margin-left: 10px"/>
  <SingleComment style="width: 100vw;box-sizing: border-box;padding: 10px"
                 v-for="(item) of commentStore.contextComments" :comment="item" :key="item.comment.id"/>
</template>
<script setup lang="ts">
import UserHeader from './components/UserHeader.vue'
import { NMessageProvider } from 'naive-ui'
import CommentContainer from "./components/CommentContainer.vue";
import { ref } from "vue";

let host = ''
let context = ref('')

function loop() {
  window.parent.postMessage(`${document.body.scrollWidth}:${document.body.scrollHeight}`, host)
  setTimeout(loop, 1000)
}

window.addEventListener('message', (e) => {
  if (e.origin === window.origin) {
    return
  }
  host = e.data
  loop()
})
</script>

<template>
  <NMessageProvider>
    <Suspense>
      <template #default>
        <UserHeader :context="context"/>
      </template>
      <template #fallback>
        <p>用户组件加载中...</p>
      </template>
    </Suspense>
  </NMessageProvider>
  <Suspense>
    <template #default>
      <CommentContainer/>
    </template>
    <template #fallback>
      <p>评论列表加载中...</p>
    </template>
  </Suspense>
</template>

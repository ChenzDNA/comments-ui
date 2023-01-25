<script setup lang="ts">
import UserHeader from './components/UserHeader.vue'
import { NMessageProvider } from 'naive-ui'
import CommentContainer from "./components/CommentContainer.vue";
import { ref } from "vue";

let host = ref('')
let context = ref('')

function loop() {
  window.parent.postMessage(document.body.scrollHeight, host.value)
  setTimeout(loop, 200)
}

window.addEventListener('message', (e) => {
  if (e.origin === window.origin) {
    return
  }
  let split = e.data.split('\n');
  console.log('split', split)
  host.value = split[0]
  context.value = split[1]
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
      <CommentContainer :context="context"/>
    </template>
    <template #fallback>
      <p>评论列表加载中...</p>
    </template>
  </Suspense>
</template>

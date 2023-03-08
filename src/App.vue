<script setup lang="ts">
import UserHeader from './components/UserHeader.vue'
import { NMessageProvider } from 'naive-ui'
import CommentContainer from "./components/CommentContainer.vue";
import { ref } from "vue";
import { useUserStore } from "./store/user";

let host = ref('')
let context = ref('')

const dispatcher = {
  init(data: any) {
    host.value = data.origin
    context.value = data.context
  },
  adapt(data: any) {
    useUserStore().adaptLogin(data.user)
    localStorage.setItem('t', data.token)
  },
  logout() {
    useUserStore().logout()
  }
}

function loop() {
  window.parent.postMessage(document.body.scrollHeight, host.value)
  setTimeout(loop, 200)
}

window.addEventListener('message', (e) => {
  if (e.origin === window.origin) {
    return
  }
  // @ts-ignore
  dispatcher[e.data.type](e.data)
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
    <Suspense>
      <template #default>
        <CommentContainer :context="context"/>
      </template>
      <template #fallback>
        <p>评论列表加载中...</p>
      </template>
    </Suspense>
  </NMessageProvider>
</template>

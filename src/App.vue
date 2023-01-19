<script setup lang="ts">
import UserHeader from './components/UserHeader.vue'

if (window.parent !== window) {
  function loop() {
    window.parent.frames[0].frameElement!.setAttribute('height', String(document.body.scrollHeight))
    setTimeout(loop, 500)
  }

  loop()
}


</script>

<template>
  <Suspense>
    <UserHeader/>
  </Suspense>
  <div class="comment-container vw100">
    456
  </div>
</template>

<style scoped>


</style>

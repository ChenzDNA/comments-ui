<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";

const props = defineProps<{ content: string }>()

marked.setOptions({
  renderer: new marked.Renderer,
  gfm: true,
  pedantic: false,
  async: true,
  highlight(code: string, language: string): string {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value
  }
})
const result = computed(() => {
  return marked(props.content)
})
</script>

<template>
  <div v-html="result"></div>
</template>

<style scoped>

</style>
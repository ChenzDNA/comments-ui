<script setup lang="ts">
import { ref } from "vue";
import MarkdownView from "./MarkdownView.vue";
import { NButton, NInput, NInputGroup, NInputGroupLabel } from 'naive-ui';
import { useUserStore } from "../store/user";

const flag = ref<'input' | 'view' | 'user'>('user')

const content = ref('# we can talk with markdown!')
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const opt = ref<0 | 1>(0)

</script>

<template>
  <div class="header vw100">
    <div class="header-top">
      <div class="button" @click="flag='input'">输入</div>
      |
      <div class="button" @click="flag='view'">预览</div>
      <b class="button" style="float: right" @click="flag='user'">{{
          userStore.hasLogin ? userStore.user.nickname : '未登录'
        }}</b>
    </div>
    <hr style="margin-bottom: 12px"/>
    <template v-if="flag==='input'">
      <n-input
        :disabled="!userStore.hasLogin"
        type="textarea"
        v-model:value="content"
        :resizable="false"
        :autosize="{minRows:7,maxRows:7}"
        style="border-radius: 5px;"
        maxlength="16384"
        show-count
        class="beautify-scrollbar"
        placeholder="write your comment here"/>
    </template>
    <template v-else-if="flag==='view'">
      <MarkdownView :content="content" class="markdown-view beautify-scrollbar"/>
    </template>
    <template v-else-if="flag==='user'">
      <n-input-group class="user-input position-relative" ref="inputUsername"
                     :class="opt===0?'state-register-inputs':'state-login-inputs'">
        <n-input-group-label>username:</n-input-group-label>
        <n-input type="text" v-model:value="username" placeholder="账号" maxlength="20" clearable
                 :show-count="opt===1"/>
      </n-input-group>
      <n-input-group style="top: 20px" class="user-input position-relative" ref="inputPassword"
                     :class="opt===0?'state-register-inputs':'state-login-inputs'">
        <n-input-group-label>password:</n-input-group-label>
        <n-input type="password" v-model:value="password" show-password-on="mousedown" placeholder="密码" clearable/>
      </n-input-group>
      <div style="position: absolute;top: 170px;width: 100vw;left: 0;">
        <n-button ref="buttonLogin" :class="opt===0?'state-register-buttons':'state-login-buttons'">
          {{ opt === 0 ? '登&emsp;录' : '注&emsp;册' }}
        </n-button>
        <n-button quaternary @click="opt^=1" class="position-absolute right-10" ref="buttonSwitch"
                  :class="opt===0?'state-login-buttons':'state-register-buttons'">
          <b>去{{ opt === 0 ? '注册' : '登录' }}</b>
        </n-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.header {
  background-color: #fff7e0;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  height: 245px;
  position: relative;
}

.header-top {
  padding-right: 20px;
  margin-bottom: 12px;
}

.header-top > * {
  display: inline-block;
}

.button {
  border: #495057 1px solid;
  padding: 2px 5px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  display: inline-block;
}

.button:hover {
  background-color: #fffaf8;
}

.button:active {
  background-color: #f3f0f0;
}

.markdown-view {
  border: 1px solid #495057;
  box-sizing: border-box;
  padding-left: 10px;
  height: 170px;
  overflow: auto;
  border-radius: 5px;
}

.user-input {
  width: 60vw;
}

.user-input > div:nth-child(1) {
  width: 90px;
}



</style>
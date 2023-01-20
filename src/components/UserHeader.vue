<script setup lang="ts">
import { ref } from "vue";
import MarkdownView from "./MarkdownView.vue";
import { MessageOptions, NButton, NInput, NInputGroup, NInputGroupLabel, useMessage } from 'naive-ui';
import { useUserStore } from "../store/user";
import { useCommentStore } from "../store/comment";

const props = defineProps<{ context: string }>();

const flag = ref<'input' | 'view' | 'user'>('input')

const content = ref('')

const userStore = useUserStore()
const commentStore = useCommentStore()
const message = useMessage()
let messageOptions = { duration: 2000 } as MessageOptions

const username = ref('')
const password = ref('')
const nickname = ref('')

function flush() {
  username.value = ''
  password.value = ''
  nickname.value = ''
}

const opt = ref<0 | 1>(0)
const changeNickname = ref<0 | 1>(0)
const changePassword = ref<0 | 1>(0)

let tres = await userStore.t()
if (tres) {
  flag.value = 'user'
}

const optClick = {
  0: async () => {
    const res = await userStore.login(username.value, password.value)
    flush()
    res && message.error(res, messageOptions)
  },
  1: async () => {
    const res = await userStore.register(username.value, password.value)
    flush()
    res && message.error(res, messageOptions)
  },
  2: async () => {
    flush()
    userStore.logout()
  },
  3: async () => {
    const res = await userStore.updateNickname(nickname.value)
    flush()
    res && message.error(res, messageOptions)
  },
  4: async () => {
    const res = await userStore.updatePassword(password.value)
    flush()
    res && message.error(res, messageOptions)
  }
}


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
        placeholder="# we can write with markdown!"/>
      <n-button :disabled="!userStore.hasLogin" style="position: absolute;right: 22px;bottom: 43px"
                @click="commentStore.create(context,content,null,null)">发送
      </n-button>
    </template>
    <template v-else-if="flag==='view'">
      <MarkdownView :content="content" class="markdown-view beautify-scrollbar"/>
    </template>
    <template v-else-if="flag==='user'">
      <div v-if="!userStore.hasLogin">
        <n-input-group class="user-input position-relative" ref="inputUsername"
                       :class="opt===0?'state-register-inputs':'state-login-inputs'">
          <n-input-group-label>账号:</n-input-group-label>
          <n-input type="text" v-model:value="username" placeholder="账号" maxlength="20" clearable
                   :show-count="opt===1"/>
        </n-input-group>
        <n-input-group style="top: 20px" class="user-input position-relative" ref="inputPassword"
                       :class="opt===0?'state-register-inputs':'state-login-inputs'">
          <n-input-group-label>密码:</n-input-group-label>
          <n-input @keydown.enter="optClick[opt]" type="password" v-model:value="password" show-password-on="mousedown"
                   placeholder="密码" clearable/>
        </n-input-group>
        <div style="position: absolute;top: 170px;width: 100vw;left: 0;">
          <n-button @click="optClick[opt]" ref="buttonLogin"
                    :class="opt===0?'state-register-buttons':'state-login-buttons'">
            {{ opt === 0 ? '登&emsp;录' : '注&emsp;册' }}
          </n-button>
          <n-button quaternary @click="opt^=1" class="position-absolute right-10" ref="buttonSwitch"
                    :class="opt===0?'state-login-buttons':'state-register-buttons'">
            <b><i style="border-bottom: 2px solid #495057">去{{ opt === 0 ? '注册' : '登录' }}</i></b>
          </n-button>
        </div>
      </div>
      <div v-else class="user-header__info">
        <n-input v-show="changeNickname===1" v-model:value="nickname" class="user-input"
                 placeholder="new nickname"/>
        <n-button v-show="changeNickname===1" @click="optClick[3]();changeNickname^=1" type="primary">确认</n-button>
        <br v-show="changeNickname===1"/>
        <n-button @click="changeNickname^=1">修改昵称</n-button>
        <br/>
        <n-input v-show="changePassword===1" v-model:value="password" type="password" class="user-input"
                 placeholder="new password" show-password-on="mousedown"/>
        <n-button v-show="changePassword===1" @click="optClick[4]();changePassword^=1" type="primary">确认</n-button>
        <br v-show="changePassword===1"/>
        <n-button @click="changePassword^=1">修改密码</n-button>
        <br/>
        <n-button type="error" @click="optClick[2]" style="position: absolute;bottom: 0;right: 0">登&nbsp;出
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
  width: 55px;
}

.user-header__info > * {
  margin-bottom: 11.5px;
  margin-right: 10px;
}
</style>
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 侧边栏 -->
    <div class="bg-gray-800 text-gray-100 w-28 flex-shrink-0">
      <div class="flex justify-center pt-4">
        <!-- 添加按钮 -->
        <button class="bg-gray-700 text-white font-bold py-2 rounded-full flex justify-center w-10/12"
          @click="userStore.addUser">
          <AddIcon />
        </button>
      </div>
      <ul class="py-4">
        <li v-for="item in  userStore.userList " :key="item.partition" :class="[
            'py-2 flex justify-center group hover:bg-gray-700',
            { 'bg-gray-700': userStore.present === item.partition && userStore.showRemoveIcon === null ? item.partition : null === item.partition }
          ]" @mouseover="userStore.showRemoveIcon = item.partition" @mouseleave="userStore.showRemoveIcon = null"
          @click="userStore.present = item.partition">
          <div class="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
            <UserIcon />
          </div>
          <div class="flex items-center justify-center ml-2" @click.stop="userStore.removeUser(item.partition)">
            <RemoveIcon v-show="userStore.showRemoveIcon === item.partition" />
          </div>
        </li>
      </ul>
    </div>

    <!-- 正文区域 -->
    <div class="flex-1" ref="webViewList">
      <webview v-for=" item  in  userStore.userList" :id="item?.partition" :src="item.url"
        v-show="userStore.present == item?.partition" :partition="item.partition" class="w-full h-screen"
        preload="file:///D:/web/open-more-telegram/dist-electron/preload.js"></webview>
      <EmptyPage v-if="!userStore.userList.length" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user"
import UserIcon from "@/assets/user.svg"
import AddIcon from "@/assets/add.svg"
import RemoveIcon from "@/assets/remove.svg"
import EmptyPage from "@/components/empty.vue"
import { ref, onMounted } from "vue"

const userStore = useUserStore()
const webViewList = ref()

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    //打开选中的webview的devtools
    if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === 'w') {
      webViewList.value.children[userStore.present] && (webViewList.value.children[userStore.present].openDevTools())
    }
  });


  userStore.userList.forEach((item) => {
    console.log(webViewList.value.children[item.partition])
    webViewList.value.children[item.partition].addEventListener('ipc-message', (event) => {
      const message = event.args[0]
      console.log("接收webview消息",message)
      userStore.updatedUser(item.partition,message.avatar,message.name)
      console.log(userStore)
      // Prints "pong"
    })
  });
})

</script>

<style></style>
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
        <li
          :class="{ 'bg-gray-700': userStore.present == item?.partition, 'px-4 py-2 hover:bg-gray-700 cursor-pointer flex justify-center': true }"
          v-for="item in userStore.userList" @click="userStore.present = item.partition">
          <div class="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
            <UserIcon />
          </div>
        </li>
      </ul>
    </div>

    <!-- 正文区域 -->
    <div class="flex-1">
      <webview v-for="item in userStore.userList" :src="item.url" v-show="userStore.present == item?.partition"
        :partition="item.partition" class="w-full h-screen"></webview>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user"
import UserIcon from "@/assets/user.svg"
import AddIcon from "@/assets/add.svg"

const userStore = useUserStore()



</script>

<style></style>
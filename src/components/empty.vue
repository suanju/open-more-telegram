<template>
    <div class="w-full h-screen" style="background-color: #212121;">
        <div>

        </div>
        <div class="h-screen flex flex-col justify-center items-center text-gray-100 font-bold">
            <div>
                <AddUserIcon class="W-32 h-32" />
            </div>
            <span class="mt-8">
                <button class="border border-blue-500 text-blue-500 w-28 font-bold py-2 px-4 rounded-3xl
                hover:bg-blue-500 hover:text-white hover:border-blue-500" @click="userStore.addUser">
                    添加
                </button>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user"
import AddUserIcon from "@/assets/add_user.svg"

const userStore = useUserStore()
</script>
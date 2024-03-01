import { ref } from "vue"
import { defineStore } from "pinia"
import { generateUUID } from "@/utlis/random"

export const webViewUrl = "https://web.telegram.org/"

export const useUserStore = defineStore('user', () => {
  const userList = ref([
    {
      avatar: "",
      url: webViewUrl,
      partition: generateUUID()
    }
  ]);
  const present = ref(userList.value[0].partition)


  const addUser = () => {
    userList.value.push({
      avatar: "",
      url: webViewUrl,
      partition: generateUUID()
    })
    console.log(userList.value)
  }

  
  return {
    userList,
    addUser,
    present
  }
},{
  persist: true,
})
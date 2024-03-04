import { ref } from "vue";
import { defineStore } from "pinia";
import { generateUUID } from "@/utlis/random";

export const webViewUrl = "https://web.telegram.org/";

export const useUserStore = defineStore(
  "user",
  () => {
    const userList = ref([
      {
        avatar: "",
        name: "",
        url: webViewUrl,
        partition: "persist:" + generateUUID(),
      },
    ]);
    const present = ref(userList.value[0].partition);
    const showRemoveIcon = ref(<string | null>"");

    const addUser = () => {
      userList.value.push({
        avatar: "",
        name: "",
        url: webViewUrl,
        partition: "persist:" + generateUUID(),
      });
      //如果是第一个则默认选中
      userList.value.length === 1 &&
        (present.value = userList.value[0].partition);
    };

    const updatedUser = (partition: string, avatar: string, name: string) => {
      userList.value = userList.value.filter((item) => {
        if (item.partition === partition) {
          item.avatar = avatar;
          item.name = name;
        }
        return item;
      });
    };

    const removeUser = (partition: string) => {
      userList.value = userList.value.filter((item) => {
        return item.partition !== partition;
      });
      //删除的是当前选中
      if (present.value === partition) {
        present.value = userList.value[0].partition;
      }
      //清空选中
      showRemoveIcon.value = null;
    };

    return {
      userList,
      present,
      showRemoveIcon,
      addUser,
      updatedUser,
      removeUser,
    };
  },
  {
    persist: true,
  }
);

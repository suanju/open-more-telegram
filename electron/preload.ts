import { contextBridge, ipcRenderer,remote } from "electron";


window.addEventListener("DOMContentLoaded", () => {
  //执行状态
  let isProcess = false;
  let menusClick = false;
  let settingClick = false;
  let isGetAvatar = false;
  let isGetName = false;
  let backClick = false;

  //用户信息
  let avatar = null;
  let name = null;

  //当前域名为telegram进行处理
  if (window.location.hostname == "web.telegram.org") {
    console.log(remote);
    
    if (isProcess) return false;
    isProcess = true;
    const observer = new MutationObserver((mutationsList, observerInfo) => {
      console.log("dom 发生了改变");
      //打开菜单
      const menus = document.querySelector(".DropdownMenu.main-menu > button");
      if (menus && !menusClick) {
        //需要触发mousedown事件
        menus.dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        menusClick = true;
      }
      //进入设置
      const setting = document
        .querySelector(".Menu.compact.main-menu")
        ?.querySelector(".icon-settings");
      if (setting && !settingClick) {
        setting.click();
        settingClick = true;
      }
      //获取头像
      // console.log("头像", isGetAvatar, avatar, !avatar && !isGetAvatar);
      if (!avatar && !isGetAvatar) {
        avatar = document
          .querySelector(".settings-content.custom-scroll")
          ?.querySelector(".ProfilePhoto > img").src;

        avatar && (isGetAvatar = true);
        console.log("获取头像成功为", avatar);
      }
      //获取昵称
      // console.log("昵称", isGetName, name, !name && !isGetName);
      if (!name && !isGetName) {
        name = document
          .querySelector(".settings-content.custom-scroll")
          ?.querySelector(".fullName").textContent;
        name && (isGetName = true);
        console.log("获取昵称成功为", name);
      }

      //信息获取完毕
      if (avatar && isGetAvatar && name && isGetName) {
        console.log("停止监控");
        observer.disconnect();
        Settings.querySelector(".left-header > button").dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        //获取完毕与主进程通信
        ipcRenderer.sendToHost("update-user", {
          avatar,
          name
        }); 
      }
      isProcess = false;
    });

    const config = { attributes: true, childList: true, subtree: true };
    //开始监听
    observer.observe(document.body, config);
  }
});

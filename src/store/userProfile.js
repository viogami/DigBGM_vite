import { defineStore } from 'pinia';

const useUserStore = defineStore('userProfile', {
  state: () => ({
    username: '',
    nickname: '',
    avatarUrl: '',
    sign:'',
    favorList: []
  }),
  actions: {
    // 定义一个动作用于设置用户信息
    setUserInfo(username, nickname, avatarUrl,userSign) {
      this.username = username;
      this.nickname = nickname;
      this.avatarUrl = avatarUrl;
      this.sign=userSign;
    },
    // 添加收藏到数组中
    addFavorList(value) {
      this.favorList.push(value);
    },
    // 获取收藏数组
    getFavorList(i) {
      if ( i === 'all')
        return this.favorList;
      else 
        return this.favorList.slice(8*i,8*i+8)
    },
    
    // 修改信息
    updateUsername(newUsername) {
      this.username = newUsername;
    },
    updateNickname(newNickname) {
      this.nickname = newNickname;
    },
    updateAvatarUrl(newAvatarUrl) {
      this.avatarUrl = newAvatarUrl;
    },
    updateSign(newUserSign) {
      this.sign = newUserSign;
    }
  }
});

export { useUserStore }
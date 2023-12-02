import { defineStore } from 'pinia'

const useSearchStore = defineStore('searchRes',{
    state: () => ({
        searchType: '',
    }),
    
    actions:{
      getSearchType(){
          switch (this.searchType){
              case '全部类型':
                  return ''
              case '书籍':
                  return 1
              case '动画':
                  return 2
              case '音乐':
                  return 3
              case '游戏':
                  return 4
              case '三次元':
                  return 6
          }
          return this.searchType
      }  
    }
})

export { useSearchStore }
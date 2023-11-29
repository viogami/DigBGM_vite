import axios from '../utils/axios.js'

// get用户信息的函数
function login (username) {
  return axios.get('/v0/users/' + username, {
    username
  })
}

// get用户头像
function getUserAvatar (username, size) {
  return axios.get('/v0/users/' + username + '/avatar', {
    params: {
      username:username,
      size:size
    }
  })
}

//获得用户收藏信息
function userFavorite (username,subject_type,type,limit,offset) {
  return axios.get('/v0/users/' + username+'/collections' , {
    params:{
      subject_type:subject_type,
      type:type,
      limit:limit,
      offset:offset,
    }
  })
}
export { login, getUserAvatar , userFavorite }

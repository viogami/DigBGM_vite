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
      username,
      size
    }
  })
}

export { login, getUserAvatar }

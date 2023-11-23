import axios from '../utils/axios.js'

// get用户信息的函数
function SearchSubject (keywords) {
  return axios.get('/search/subject/' + keywords, {
    keywords
  })
}

export { SearchSubject}
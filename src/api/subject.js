import axios from '../utils/axios.js'

// get条目的函数
function SearchSubject (keywords) {
  return axios.get('/search/subject/' + keywords, {
    keywords
  })
}

export { SearchSubject }

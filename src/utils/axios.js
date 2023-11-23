import axios from 'axios'

const bangumiService = axios.create({
  baseURL: '/api'
})

export default bangumiService

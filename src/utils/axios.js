import axios from 'axios'

const bangumiService = axios.create({
  baseURL: '/bgmapi'
})
const digbgmService = axios.create({
  baseURL: '/api'
})
export default { bangumiService, digbgmService }

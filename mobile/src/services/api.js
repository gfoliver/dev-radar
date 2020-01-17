import axios from 'axios'
import credentials from '../credentials.json'

const api = axios.create({
    baseURL: credentials.apiURL
})

export default api

import Vue from 'vue'
import axios from 'axios'
const baseURL = 'http://localhost:5000'
const axiosInstance = axios.create({
  baseURL: baseURL
})
Vue.prototype.$axios = axiosInstance
Vue.prototype.$baseURL = baseURL

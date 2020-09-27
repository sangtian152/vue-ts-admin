import axios from 'axios'
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store
import store from '@/store/index'  //引入store
import router from '@/router'  //引入router
import { UserModule } from '@/store/modules/user'

const server = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000,
});

// http request 拦截器
server.interceptors.request.use(
  config => {
    const token = UserModule.token;
    if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['X-Access-Token'] = token  //请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
server.interceptors.response.use(
	response => {
		const res = response.data;
		if (res.code != 20000) {
			return Promise.reject(new Error(res.message))
		} else {
			return response.data
		}
	},
	error => {
		return Promise.reject(error)
	})

export default server;
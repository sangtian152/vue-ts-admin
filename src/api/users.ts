import request from '@/utils/request'

export const login = (data: any) => 
	request({
		url:"/users/login",
		method: "post",
		data
})
export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })
export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })
import request from '@/utils/request'

export function loginByUsername(username, password) {
  return request({
    url: '/login/login',
    method: 'get',
    params:{
      username:username,
      password:password
    }
  })
}

export function logout() {
  return request({
    url: '/Login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/Login/GetUserinfo',
    method: 'get',
    params: { token }
  })
}


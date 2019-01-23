import request from '@/utils/request'

export function loginByUsername(username, password) {
  return request({
    url: '/user/login',
    method: 'get',
    params:{
      username:username,
      password:password
    }
  })
}

export function logout(username) {
  return request({
    url: '/user/logout',
    method: 'post',
    params: { 
      username:username
     }
  })
}

export function getUserInfo(token) {
  return request({
    url: 'user/getUserInfo',
    method: 'get',
    params: { 
      username:token
     }
  })
}

export function createUser(data){
  return request({
    url: 'user/register',
    method: 'post',
    params: { 
      username:data.username,
      password:data.password,
      role:data.role,
      district:data.district
     }
  })
}

export function changePsd(data){
  return request({
    url: 'user/changePassword',
    method: 'post',
    params: { 
      username:data.username,
      password:data.password,
      newPassword:data.newPassword,
     }
  })
}


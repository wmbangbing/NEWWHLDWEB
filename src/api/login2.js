import request from '@/utils/request'
import qs from 'qs'
import axios from 'axios'
import store from '@/store'

var loginAxios = axios.create({
  baseURL:"http://202.114.148.160/whldwebapi2/"
})

export function loginByUsername(username, password) {
  // return request({
  //   url: '/token',
  //   method: 'post',
  //   data:qs.stringify({grant_type:"password",username: username,password: password}),
  //   headers:{
  //     'Content-Type':'application/x-www-form-urlencoded'
  //   },
  //   transformRequest: [function (data, headers) {    
  //     return data;
  //   }]    
  // })

  return loginAxios({
    url: '/token',
    method: 'post',
    data:qs.stringify({grant_type:"password",username: username,password: password}),
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, headers) {    
      return data;
    }]    
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  // var s = 'Bearer ' +  store.getters.token;
  // return request({
  //   url: 'api/user/getUserInfo',
  //   method: 'get',
  //   params: { 
  //     username : token     
  //   },
  //   headers:{
  //     'Authorization': 'Bearer r9y2t7xupNlNjs3wnoUSFIJJzCm262WIIhwIPgRNSxXqevrU6J6cgTgv1WoQXaufavMrsvMmd6Kzlbk1nUtNq7RBR1MXIxHJ9iF7RAIdtMQtsTAZJlrMK5FkYCpMttKBzmdc50luVgy1bJPToLBaQhfB91Xx0E5c7XVR0NeqwJ9cQnzDOkKwzOYlPD_M0JKbAWZXZftC3aaWOtXvR0tsUBDAY1ZZuIno--0VwEJRNMI'
  //   }
  // })

  return axios.get('http://202.114.148.160/whldwebapi2/api/user/getuserinfo',
    {
      params:{
        username:token
      },
      // headers:{
      //   'Authorization': 'Bearer r9y2t7xupNlNjs3wnoUSFIJJzCm262WIIhwIPgRNSxXqevrU6J6cgTgv1WoQXaufavMrsvMmd6Kzlbk1nUtNq7RBR1MXIxHJ9iF7RAIdtMQtsTAZJlrMK5FkYCpMttKBzmdc50luVgy1bJPToLBaQhfB91Xx0E5c7XVR0NeqwJ9cQnzDOkKwzOYlPD_M0JKbAWZXZftC3aaWOtXvR0tsUBDAY1ZZuIno--0VwEJRNMI'      
      // },
      headers:{
        'cache-control': 'no-cache',
        "Authorization": 'Bearer r9y2t7xupNlNjs3wnoUSFIJJzCm262WIIhwIPgRNSxXqevrU6J6cgTgv1WoQXaufavMrsvMmd6Kzlbk1nUtNq7RBR1MXIxHJ9iF7RAIdtMQtsTAZJlrMK5FkYCpMttKBzmdc50luVgy1bJPToLBaQhfB91Xx0E5c7XVR0NeqwJ9cQnzDOkKwzOYlPD_M0JKbAWZXZftC3aaWOtXvR0tsUBDAY1ZZuIno--0VwEJRNMI',           
        // "test":"123"
        

      },
    }
  )  
}


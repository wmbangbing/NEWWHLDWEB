import request from '@/utils/request'

export function getHistoryTime() {
  return request({
    url: '/HistXBInfo',
    method: 'get',
  })
}

export function  GetXBInfoByTime(data) {
  return request({
    url: '/HistXBInfo',
    method: 'get',
    params:{
      Time:data
    }
  })
}
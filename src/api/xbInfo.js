
import request from '@/utils/request'
import qs from 'qs'

export function putData(data) {
  return request({
    url: '/XBInfo/upload',
    method:"put",
    data:qs.stringify(data),
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, headers) {    
      return data;
    }]    
  })
}

export function getXBInfoByDistrict(district)
{
  return request({
    url: '/XBInfo/GetByDistrict',
    method: 'get',
    params:{
      district:district
    }
  })
}

export function getXBInfoByXBH(xbh)
{
  return request({
    url: '/XBInfo/GetByXBH',
    method: 'get',
    params:{
      xbh:xbh
    }
  })
}

export function getHistoryTime() {
  return request({
    url: '/XBInfo/GetHistoryTime',
    method: 'get',
  })
}

export function  GetXBInfoByTime(data) {
  return request({
    url: '/XBInfo/GetByHistory',
    method: 'get',
    params:{
      Time:data
    }
  })
}

export function getHistoryByXBH(XBH){
  return request({
    url: '/XBInfo/GetHistoryByXBH',
    method: 'get',
    params:{
      XBH:XBH
    }
  })
}
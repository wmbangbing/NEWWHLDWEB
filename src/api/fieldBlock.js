import request from '@/utils/request'

export function getList(params) {
  return request({
    // url: 'http://223.255.43.21:82/webapi/api/values',
    url: 'values',
    method: 'get',
    params
  })
}

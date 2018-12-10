
import request from '@/utils/request'

export function putData(data) {
  return request({
    url: '/XBInfo',
    method: 'put',
    data
  })
}
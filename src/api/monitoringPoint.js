import request from '@/utils/request'

export function getMPData(params) {
  return request({
    url: 'MonitoringPoints',
    method: 'get',
    params
  })
}

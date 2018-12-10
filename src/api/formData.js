import request from '@/utils/request'

export function getFormData(param) {
  return request({
    url: "values",
    // url:"http://223.255.43.21/webapi/api/values",
    method: 'get',
    params: {
      form: param
    }  
  })
}

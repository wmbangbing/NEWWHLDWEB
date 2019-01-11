import request from '@/utils/request'
import qs from 'qs'

export function fetchList(query) {
  return request({
    url:process.env.BASE_API+'/task/list',
    method: 'get',
    params: query
  })
}

export function getPassTask(district){
  return request({
    url:"/task/getpasstask",
    method: 'get',
    params:{
      district:district
    }
  })
}

export function getReviewTask(district){
  return request({
    url:"/task/getreviewtask",
    method: 'get',
    params:{
      district:district
    }
  })
}

export function getBaseTask(district){
  return request({
    url:"/task/getbasetask",
    method: 'get',
    params:{
      district:district
    }
  })
}

export function reviewTask(data){
  return request({
    url:"/task/review",
    method:"post",
    params:{
      TaskName:data.TaskName,
      Status:data.Status,
      Text:data.Text
    }
  })
}

export function getNote(district){
  return request({
    url:"/task/GetNote",
    method:"get",
    params:{
      district:district,
    }
  })
}

export function confirmNote(NId){
  return request({
    url:"/task/confirmNote",
    method:"post",
    params:{
      NId:NId,
    }
  })
}

export function confirmAllNote(district){
  return request({
    url:"/task/confirmAllNote",
    method:"post",
    params:{
      district:district,
    }
  })
}
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = [];
const count = 60;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    task_name:'@first',
    task_manager:"@first",
    'district|1':['蔡甸区','东湖高新区','东西湖区','洪山区','黄陂区','江夏区','新洲区'],
    submit_time:'@datetime',
    'status|1': ['unreview', 'pass', 'refuse']
  }))
}

export default {
  getList: config => {
    const { task_name, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      // if (importance && item.importance !== +importance) return false
      // if (type && item.type !== type) return false
      if (task_name && item.task_name.indexOf(task_name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
}
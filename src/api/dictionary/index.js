import request from '@/api/request'

function getDictList(data) {
  return request({
    url: `/api/leju/admin/dict/list`,
    method: 'get',
    data: data

  })

}
// 明细
function DictDetail(data) {
  return request({
    url: `/api/leju/admin/dict/detail`,
    method: 'get',
    data: data

  })

}
// 新增更新
function saveDictList(data) {
  return request({
    url: `/api/leju/admin/dict/saveOrUpdate`,
    method: 'post',
    data: data

  })

}
// 删除
function delDictList(data) {
  return request({
    url: `/api/leju/admin/dict/del`,
    method: 'get',
    data: data

  })

}

export default {
  getDictList,
  delDictList,
  saveDictList,
  DictDetail

}

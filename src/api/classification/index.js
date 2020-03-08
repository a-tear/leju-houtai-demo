import request from '@/api/request'

function getKindList(data) {
  return request({
    url: `/api/leju/admin/kind/list`,
    method: 'get',
    data: data

  })

}
// 更新和编辑
function saveKindList(data) {
  return request({
    url: `/api/leju/admin/kind/saveOrUpdate`,
    method: 'post',
    data: data

  })

}
// 删除
function delKindList(data) {
  return request({
    url: `/api/leju/admin/kind/del`,
    method: 'post',
    data: data

  })

}

export default {
  getKindList,
  saveKindList,
  delKindList

}

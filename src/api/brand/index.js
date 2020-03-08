import request from '@/api/request'

function getBrandList(data) {
  return request({
    url: `/api/leju/admin/brand/list`,
    method: 'get',
    data: data

  })

}
// 明细
function brandDetail(data) {
  return request({
    url: `/api/leju/admin/brand/detail`,
    method: 'get',
    data: data

  })

}
// 更新和编辑
function saveBrandList(data) {
  return request({
    url: `/api/leju/admin/brand/saveOrUpdate`,
    method: 'post',
    data: data

  })

}
// 删除
function delBrandList(data) {
  return request({
    url: `/api/leju/admin/brand/del`,
    method: 'get',
    data: data

  })

}

export default {
  getBrandList,
  brandDetail,
  saveBrandList,
  delBrandList

}

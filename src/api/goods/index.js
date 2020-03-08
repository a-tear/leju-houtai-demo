import request from '@/api/request'

function getGoodsList(data) {
  return request({
    url: `/api/leju/admin/goods/list`,
    method: 'get',
    data: data

  })

}
// 明细
function getGoodsDetail(data) {
  return request({
    url: `/api/leju/admin/goods/detail`,
    method: 'get',
    data: data

  })

}
// 更新新增
function saveGoodsList(data) {
  return request({
    url: `/api/leju/admin/goods/saveOrUpdate`,
    method: 'post',
    data: data

  })

}

// 删除
function delGoodsList(data) {
  return request({
    url: `/api/leju/admin/goods/del`,
    method: 'get',
    data: data

  })

}

export default {
  getGoodsList,
  delGoodsList,
  getGoodsDetail,
  saveGoodsList

}

import request from '@/api/request'

function getStockList(data) {
  return request({
    url: `/api/leju/admin/sku/list`,
    method: 'get',
    data: data

  })

}

// 明细
function getStockDetail(data) {
  return request({
    url: `/api/leju/admin/sku/detail`,
    method: 'get',
    data: data

  })

}
// 根据商品id获取颜色集合
function getByIdList(data) {
  return request({
    url: `/api/leju/admin/sku/colorsByGoodsId`,
    method: 'get',
    data: data

  })

}

// 更新和编辑
function saveStockList(data) {
  return request({
    url: `/api/leju/admin/sku/saveOrUpdate`,
    method: 'post',
    data: data

  })

}
// 删除
function delStockList(data) {
  return request({
    url: `/api/leju/admin/sku/del`,
    method: 'get',
    data: data

  })

}

export default {
  getStockList,
  saveStockList,
  delStockList,
  getStockDetail,
  getByIdList
}

import request from '@/api/request'

function getOrderList(data) {
  return request({
    url: `/api/leju/admin/order/list`,
    method: 'get',
    data: data

  })

}
// 明细
function orderDetail(data) {
  return request({
    url: `/api/leju/admin/order/detail`,
    method: 'get',
    data: data

  })

}
// 新增更新
function saveOrderList(data) {
  return request({
    url: `/api/leju/admin/order/updateStatus`,
    method: 'post',
    data: data

  })

}
// 删除
function delOrderList(data) {
  return request({
    url: `/api/leju/admin/order/del`,
    method: 'get',
    data: data

  })

}

export default {
  getOrderList,
  orderDetail,
  saveOrderList,
  delOrderList

}

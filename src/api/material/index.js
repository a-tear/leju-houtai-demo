import request from '@/api/request'
// 获取图片
function getImgList(data) {
  return request({
    url: `/api/leju/admin/material/list`,
    method: 'get',
    data: data

  })

}
// 删除图片
function delImgList(data) {
  return request({
    url: `/api/leju/admin/material/del`,
    method: 'get',
    data: data

  })

}

export default {
  getImgList,
  delImgList

}

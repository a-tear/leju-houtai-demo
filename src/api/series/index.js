import request from '@/api/request'

function getSeriesList(data) {
  return request({
    url: `/api/leju/admin/series/list`,
    method: 'get',
    data: data

  })

}

// 更新和编辑
function saveSeriesList(data) {
  return request({
    url: `/api/leju/admin/series/saveOrUpdate`,
    method: 'post',
    data: data

  })

}
// 删除
function delSeriesList(data) {
  return request({
    url: `/api/leju/admin/series/del`,
    method: 'get',
    data: data

  })

}

export default {
  getSeriesList,
  saveSeriesList,
  delSeriesList,
}

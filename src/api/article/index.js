import request from '@/api/request'

function getArticleList(data) {
  return request({
    url: `/api/leju/admin/article/list`,
    method: 'get',
    data: data

  })

}
// 明细
function articleDetail(data) {
  return request({
    url: `/api/leju/admin/article/detail`,
    method: 'get',
    data: data

  })

}
// 更新和编辑
function saveArticleList(data) {
  return request({
    url: `/api/leju/admin/article/saveOrUpdate`,
    method: 'post',
    data: data

  })

}
// 删除
function delArticleList(data) {
  return request({
    url: `/api/leju/admin/article/del`,
    method: 'get',
    data: data

  })

}

export default {
  getArticleList,
  articleDetail,
  saveArticleList,
  delArticleList
}

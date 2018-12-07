$(function () {
  'use strict';
  var url = GetRequest()

  getData("/api/article/get_info",{
    id: url.id
  },function(res) {
    $("#particularsHtml").html(res.data.content)
  })

  window.onload = function() {
    // 左侧导航二级目录
    navsecond()
  }

})
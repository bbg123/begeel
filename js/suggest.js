$(function () {
  'use strict';

  getTitleData()

  // 获取标题数据
  function getTitleData() {
    var url = GetRequest()
    getData("/api/article/get_list",{
      cid:url.cid
    },function(res) {
      // pc端
      var html = "<li>\n        <h2>" + res.data.category.name + "</h2>\n      </li>"
      var id = url.id || ''

      res.data.data.forEach(function (item, index) {
        // 判断是否是第一个,添加类
        if (item.id == id) {
          html += '<li class="text active" data-index="' + item.id + '">' + item.title + '</li>'
        } else {
          if (index == 0 && id == '') {
            html += '<li class="text active" data-index="' + item.id + '">' + item.title + '</li>'
            id = item.id
          } else {
            html += '<li class="text" data-index="' + item.id + '">' + item.title + '</li>'
          }
        }
      })
      
      $('.suggest_main_content_left').html(html)
      
      
      // 拿到第一条数据,获取文章详情
      getData("/api/article/get_info",{
        id:id
      },function(res) {
        var html1 = "<li>\n          <h2>" + res.data.title + "</h2>\n        </li>"
        html1 += res.data.content
        $(".suggest_main_content_right").html(html1)
      })


      // 移动端
      var Mhtml = ''
      res.data.data.forEach(function (item) {
        Mhtml += "<li class=\"yelbtn\" data-index=\"" + item.id + "\">\n          " + item.title + "\n          <div class=\"suggest_down\">\n            <img src=\"./images/suggest_down.png\" alt=\"\">\n          </div>\n        </li>\n        <li class=\"yelbtn_content\"></li>"
      })
      $(".suggest_main_content #Mul").html(Mhtml)

    }) 
  }

  // 点击之后获取数据
  function clickdata() {
    $(".suggest_main_content_left").on("click",".text",function() {
      $(this).addClass("active").siblings().removeClass("active")
      var index = $(this).data("index")
      $(".suggest_main_content_right").eq(index).show().siblings(".suggest_main_content_right").hide()
      getData("/api/article/get_info",{
        id:index
      },function(res) {
        var html1 = "<li>\n          <h2>" + res.data.title + "</h2>\n        </li>"
        html1 += res.data.content
        $(".suggest_main_content_right").html(html1)
      })
    })
  }

  // 点击黄色按钮
  function clickbtn() {
    $(".suggest_main_content ul").on("click",".yelbtn", function () {
      var that = $(this)
      var index = $(this).data("index")
      getData("/api/article/get_info",{
        id:index
      },function(res) {
        var Mhtml1 = "<div class=\"shou\">\n          \u6536\u8D77\n        </div>\n        <div><h2>" + res.data.title + "</h2></div>"
        Mhtml1 += res.data.content
        that.next().html(Mhtml1)

        // 内容撑开收起
        that.next().stop().slideToggle()
        that.next().siblings(".yelbtn_content").stop().slideUp()
        that.next().children(".shou").show()

        if (that.next().css("height") == "2px") {
          that.children(".suggest_down").children("img").css({
            transform: "rotate(180deg)"
          })
          that.siblings(".yelbtn").children(".suggest_down").children("img").css({
            transform: "rotate(0deg)"
          })
        } else {
          that.children(".suggest_down").children("img").css({
            transform: "rotate(0deg)"
          })
        }

      })
    })
  }

  window.onload = function() {

    // 判断是否是移动端
    if (document.body.clientWidth < 992) {
      
      clickbtn()

      // 左侧导航二级目录
      navsecond()

      // 点击收起按钮
      $("#Mul").on("click",".shou", function () {
        $(this).parent().stop().slideUp()
        $(this).parent().prev().children(".suggest_down").children("img").css({
          transform: "rotate(0deg)"
        })
      })

    } else {
      clickdata()
    }
  }

})
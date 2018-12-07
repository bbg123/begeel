// 获取通用数据
getdata()

// ajax请求函数
function getData(url, data, fn) {
  $.ajax({
    url: url,
    type: 'post',
    data: data,
    dataType: "json",
    crossDomain: true == !(document.all),
    success: fn
  })
}

// 顶部置顶
$(window).scroll(function (e) {
  var logoHeight = $(".homelogo").height()
  var topHeight = $("#home_top").innerHeight()
  if (document.body.clientWidth < 992) {
    if (e.currentTarget.pageYOffset >= logoHeight) {
      $("#home_top").addClass("home_top2").removeClass("home_top1")
      $("#home_top").prev().css({
        paddingBottom: topHeight
      })
    } else {
      $("#home_top").addClass("home_top1").removeClass("home_top2")
      $("#home_top").prev().css({
        paddingBottom: 0
      })
    }
  }
})

// 打开弹出窗
$(".homenav").on("click", function () {
  $(".home_nav").show().animate({
    left: "0",
  }, function () {
    $(".mask_layer").show();
  });
})

// 关闭弹出窗
$(".mask_layer").on("click", function () {
  $(".home_nav").animate({
    left: "-100%"
  }, function () {
    $(".home_nav").hide()
  });
  $(this).hide();
})

// 回到顶部
$(".pchome_gotop").on("click", function () {
  $('body,html').animate({
    scrollTop: 0
  }, 200);
  return false;
})

// 点击显示客服二维码
$('.pchome_ewm1').on('click', function () {
  var ewm = $(this).data('ewm')
  var html = ''
  if (ewm) {
    html += "<div class=\"service_title\">\n    <div class=\"service_title_text\">\u5BBE\u7235\u8868\u5FAE\u4FE1\u516C\u4F17\u53F7</div>\n    <a href=\"javascript:;\" class=\"glyphicon glyphicon-remove service_close\"></a>\n  </div>\n  <div class=\"service_content\">\n    <div class=\"service_content_img\">\n      <img src=\"" + ewm + "\" alt=\"\" srcset=\"\">\n    </div>\n    <div class=\"service_content_text\">\n      <div class=\"service_content_text_title\">\n        \u5BBE\u7235\u8868\u5FAE\u4FE1\u516C\u4F17\u53F7\n      </div>\n      <div class=\"service_content_text1\">\n        <div class=\"glyphicon glyphicon-eye-open\"></div>\n        <div>\u54C1\u724C\u4F53\u9A8C\u9986</div>\n      </div>\n      <div class=\"service_content_text1\">\n        <div class=\"glyphicon glyphicon-book\"></div>\n        <div>\u54C1\u724C\u6587\u5316\u9986</div>\n      </div>\n      <div class=\"service_content_text1\">\n        <div class=\"glyphicon glyphicon-bullhorn\"></div>\n        <div>\u54C1\u724C\u4E92\u52A8\u9986</div>\n      </div>\n    </div>\n  </div>"
    $('.service').html(html)
  } else {
    html += "<div class=\"service_title\">\n    <div class=\"service_title_text\">\u5BBE\u7235\u8868\u5B98\u65B9\u5BA2\u670D\u5FAE\u4FE1\u4E8C\u7EF4\u7801</div>\n    <a href=\"javascript:;\" class=\"glyphicon glyphicon-remove service_close\"></a>\n  </div>\n  <div class=\"service_content\">\n    <div class=\"service_content_img\">\n      <img src=\"./images/service.jpg\" alt=\"\" srcset=\"\">\n    </div>\n    <div class=\"service_content_text\">\n      <div class=\"service_content_text_title\">\n        \u5BBE\u7235\u8868\u5B98\u65B9\u5BA2\u670D\u5FAE\u4FE1\n      </div>\n      <div class=\"service_content_text1\">\n        <div class=\"glyphicon glyphicon-phone-alt\"></div>\n        <div>\u4EBA\u5DE5\u552E\u540E\u5BA2\u670D</div>\n      </div>\n      <div class=\"service_content_text1\">\n        <div class=\"glyphicon glyphicon-duplicate\"></div>\n        <div>\u83B7\u53D6\u6700\u65B0\u8D44\u8BAF</div>\n      </div>\n      <div class=\"service_content_text1\">\n        <div class=\"glyphicon glyphicon-piggy-bank\"></div>\n        <div>\u9886\u53D6\u798F\u5229\u4F18\u60E0</div>\n      </div>\n    </div>\n  </div>";
    $('.service').html(html)
  }

  $('.mask_layer1').fadeIn()
  $('.service').fadeIn()
})

// 点击关闭客服二维码
$('.service').on('click', '.service_close', function () {
  $('.mask_layer1').fadeOut()
  $('.service').fadeOut()
})

// 滚动显示
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 550) {
    $(".pchome_gotop").show()
  } else {
    $(".pchome_gotop").hide()
  }
})

// 获取通用数据
function getdata() {
  getData("/api/index/init", {}, function (res) {
    if (res.code == 0) {
      var data = res.data.category
      var html = ''
      var pchtml1 = ''
      var pchtml2 = ''
      var pchtml3 = ''
      html += '<li class="home_nav_homeicon home_nav_homecontent">' +
        '<a href="/index.html" style="display: block;width: 100%;height: 100%;">' +
        '<i class="glyphicon glyphicon-home"></i>' +
        '<span>首页</span>' +
        '</a>' +
        '</li>'
      for (var i = 0; i < data.length; i++) {
        html += '<li class="home_nav_homecontent open">'
        html += '<div class="navseconds">' +
          '<span>' + data[i].name + '</span>' +
          '<i class="glyphicon glyphicon-menu-down home_nav_homecontent_down"></i>' +
          '</div>' +
          '<ul class="navsecond">'
        for (var j = 0; j < data[i].children.length; j++) {
          html += '<li>' +
            '<a href="' + data[i].children[j].url + '">' +
            data[i].children[j].name +
            '</a>' +
            '</li>'
        }
        html += '</ul></li>'
      }

      html += '<li class="home_nav_homecontent">' +
        '<i class="glyphicon glyphicon-phone-alt"></i>' +
        '<span>售后服务热线:<span class="tel"></span></span>' +
        '</li>'

      $(".home_nav_main").html(html)
      // 移动端

      for (var x = 0; x < data.length; x++) {
        switch (data[x].name) {
          case "品牌":
            for (var c = 0; c < data[x].children.length; c++) {
              pchtml1 += '<li>' +
                '<a href="' + data[x].children[c].url + '">' +
                data[x].children[c].name +
                '</a>' +
                '</li>'
            }

            pchtml1 += '<li class="pchome_input fr">' +
              '<input type="text" placeholder="请输入搜索内容">' +
              '<i class="glyphicon glyphicon-search pchome_search"></i>' +
              '</li>'
            $("#pchome_nav").append(pchtml1)
            break;

          case "服务":
            for (var v = 0; v < data[x].children.length; v++) {
              pchtml2 += '<li>' +
                '<a href="' + data[x].children[v].url + '">' +
                data[x].children[v].name +
                '</a>' +
                '</li>'
            }
            $(".pchome_floorserve_left").html(pchtml2)
            break;
        }
      }
      // pc端

      $(".tel").html(res.data.service.tel)
      $(".address").html(res.data.service.address)
    }

  })
}

// 截取url参数
function GetRequest() {
  var strs
  var url_search = location.search;
  var theRequest = new Object();
  if (url_search.indexOf("?") != -1) {
    var str = url_search.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


// 左侧导航二级目录
function navsecond() {
  var height
  var height1
  $(".home_nav_main").on("click", ".navseconds", function () {
    // 判断是否打开
    if ($(this).next(".navsecond").css("display") == "none") {
      height = $(this).parent().height()
      height1 = $(this).next(".navsecond").height() + height;
      $(this).parent().stop().animate({
        height: height1
      })
      $(this).children("i").attr("class", "home_nav_homecontent_down glyphicon glyphicon-menu-up")
      $(this).attr("class", "navseconds bor_bto").next().show()
    } else {
      var that = $(this)
      $(this).parent().stop().animate({
        height: height
      }, function () {
        that.attr("class", "navseconds").next().hide()
      })
      $(this).children("i").attr("class", "home_nav_homecontent_down glyphicon glyphicon-menu-down")
    }
  })
}

// pc端导航栏
function pcnav() {
  $(".pcnav>li").on("mouseover", function () {
    var index = $(this).data("index")
    $(".pcsecondnav").show()
    $(".pcsecondnav>li").eq(index).children().stop().slideToggle()
    $(".pcsecondnav>li").eq(index).siblings().children().stop().slideUp()
  })

  $(".pcsecondnav_menu").on("mouseover", function () {
    $(this).show()
    $(this).parent().siblings().children().slideUp()
  })

  $(".pcsecondnav_menu").on("mouseleave", function () {
    $(this).stop().slideUp(function () {
      $(".pcsecondnav").hide()
    })
  })
}

window.onload = function () {

  // pc端导航栏
  pcnav()

  // 左侧导航二级目录
  navsecond()

}
$('#pchome_nav').on('click', '.pchome_search', function () {
  var val = $(this).siblings().val()
  if (val != '') {
    $(this).siblings().val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})
$('#pchome_nav').on('blur', '.pchome_input input', function () {
  var val = $(this).val()
  if (val != '') {
    $(this).val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})

$(window).on('keydown', function (e) {
  var val = $('.pchome_input input').val() || $('.form-control').val()
  if (e.keyCode == 13 && val != '') {
    $('.pchome_input input').val('')
    $('.form-control').val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})

$('.form-control').on('click', function () {
  var val = $(this).siblings().val()
  if (val != '') {
    $(this).siblings().val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})
$('.form-control').on('blur', function () {
  var val = $(this).val()
  if (val != '') {
    $(this).val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})
'use strict';
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
  let logoHeight = $(".homelogo").height()
  let topHeight = $("#home_top").innerHeight()
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
  let ewm = $(this).data('ewm')
  let html = ''
  if (ewm) {
    html += `<div class="service_title">
    <div class="service_title_text">宾爵表微信公众号</div>
    <a href="javascript:;" class="glyphicon glyphicon-remove service_close"></a>
  </div>
  <div class="service_content">
    <div class="service_content_img">
      <img src="${ewm}" alt="" srcset="">
    </div>
    <div class="service_content_text">
      <div class="service_content_text_title">
        宾爵表微信公众号
      </div>
      <div class="service_content_text1">
        <div class="glyphicon glyphicon-eye-open"></div>
        <div>品牌体验馆</div>
      </div>
      <div class="service_content_text1">
        <div class="glyphicon glyphicon-book"></div>
        <div>品牌文化馆</div>
      </div>
      <div class="service_content_text1">
        <div class="glyphicon glyphicon-bullhorn"></div>
        <div>品牌互动馆</div>
      </div>
    </div>
  </div>`
    $('.service').html(html)
  } else {
    html += `<div class="service_title">
    <div class="service_title_text">宾爵表官方客服微信二维码</div>
    <a href="javascript:;" class="glyphicon glyphicon-remove service_close"></a>
  </div>
  <div class="service_content">
    <div class="service_content_img">
      <img src="./images/service.jpg" alt="" srcset="">
    </div>
    <div class="service_content_text">
      <div class="service_content_text_title">
        宾爵表官方客服微信
      </div>
      <div class="service_content_text1">
        <div class="glyphicon glyphicon-phone-alt"></div>
        <div>人工售后客服</div>
      </div>
      <div class="service_content_text1">
        <div class="glyphicon glyphicon-duplicate"></div>
        <div>获取最新资讯</div>
      </div>
      <div class="service_content_text1">
        <div class="glyphicon glyphicon-piggy-bank"></div>
        <div>领取福利优惠</div>
      </div>
    </div>
  </div>`
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
  getData("/v2/public/api/index/init", {}, function (res) {
    if (res.code == 0) {
      let data = res.data.category
      let html = ''
      let pchtml1 = ''
      let pchtml2 = ''
      let pchtml3 = ''
      html += `
            <li class="home_nav_homeicon home_nav_homecontent">
              <a href="/index.html" style="display: block;width: 100%;height: 100%;">
                <i class="glyphicon glyphicon-home"></i>
                <span>首页</span>
              </a>
            </li>
            `
      data.forEach(item => {
        html += `	<li class="home_nav_homecontent open">`
        html += `
          <div class="navseconds">
            <span>${item.name}</span>
            <i class="glyphicon glyphicon-menu-down home_nav_homecontent_down"></i>
          </div>

          <ul class="navsecond">
          `
        item.children.forEach(items => {
          html += `
              <li>
                <a href="${items.url}">
                  ${items.name}
                </a>
              </li>
              `
        })
        html += `
                </ul>
              </li>
              `
      })

      html += `<li class="home_nav_homecontent">
        <i class="glyphicon glyphicon-phone-alt"></i>
        <span>售后服务热线:<span class="tel"></span></span>
      </li>`

      $(".home_nav_main").html(html)
      // 移动端

      data.forEach(item => {
        switch (item.name) {
          case "品牌":
            item.children.forEach(item => {
              pchtml1 += `<li>
                <a href="${item.url}">
                  ${item.name}
                </a>
              </li>`
            })
            pchtml1 += `<li class="pchome_input fr">
              <input type="text" placeholder="请输入搜索内容">
              <i class="glyphicon glyphicon-search pchome_search"></i>
            </li>`
            $("#pchome_nav").append(pchtml1)
            break;

          case "服务":
            item.children.forEach(item => {
              pchtml2 += `<li>
                <a href="${item.url}">
                  ${item.name}
                </a>
              </li>`
              $(".pchome_floorserve_left").html(pchtml2)
            })
            break;
        }
      })
      // pc端

      $(".tel").html(res.data.service.tel)
      $(".address").html(res.data.service.address)
    }

  })
}

// 截取url参数
function GetRequest() {
  let strs
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
  let height
  let height1
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
      let that = $(this)
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
    let index = $(this).data("index")
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
  let val = $(this).siblings().val()
  if (val != '') {
    $(this).siblings().val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})
$('#pchome_nav').on('blur', '.pchome_input input', function () {
  let val = $(this).val()
  if (val != '') {
    $(this).val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})

$(window).on('keydown', function(e) {
  let val = $('.pchome_input input').val() || $('.form-control').val()
  if (e.keyCode == 13 && val != '') {
    $('.pchome_input input').val('')
    $('.form-control').val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})

$('.form-control').on('click', function () {
  let val = $(this).siblings().val()
  if (val != '') {
    $(this).siblings().val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})
$('.form-control').on('blur', function () {
  let val = $(this).val()
  if (val != '') {
    $(this).val('')
    window.location.href = 'http://www.begeel.com/mobile/goods.html?type=' + val
  }
})

$(function () {
  'use strict';
  var url = GetRequest()
  getData("/api/goods/get_info", {
    id: url.id
  }, function (res) {
    var html = "<h2>详情展示</h2>"
    var html1 = '<h2>' + res.data.goods_name + '</h2>'
    var html_img = ''
    // res.data.content_imgs.forEach(item => {
    //   html += `<div>
    //   <img src="${item}" alt=""/>
    //   </div>`
    // })
    res.data.content_imgs.forEach(function (item) {
      html += "<div>\n      <img src=\"" + item + "\" alt=\"\"/>\n      </div>";
    })
    html1 += res.data.intro
    // res.data.imgs.forEach(item => {
    //   html_img += `<div class="swiper-slide">
    //   <img src="${item}" alt="">
    // </div>`
    // })
    res.data.imgs.forEach(function (item) {
      html_img += "<div class=\"swiper-slide\">\n      <img src=\"" + item + "\" alt=\"\">\n    </div>";
    })
    $(".goods_info_main_content").html(html)
    $(".goods_info_main_top_right").html(html1)
    $(".swiper-wrapper").html(html_img)

  })

  // 初始化pc端轮播图
  function initSwiper() {
    if (window.screen.width > 992) {
      var pcmySwiper = new Swiper('#pc_swiper', {
        direction: 'horizontal',
        loop: true,
        observer: true,
        observeParents: true,
        effect: 'cube',
        speed: 800,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          type: 'bulvars',
          clickable: true,
          clickableClass: 'my-pagination-clickable',
        },
        onSlideChangeEnd: function (pcmySwiper) {
          pcmySwiper.update(); //swiper更新
        }
      })
    } else {
      // 初始化移动端轮播图
      var mySwiper = new Swiper('#swiper', {
        direction: 'horizontal',
        loop: true,
        effect: 'cube',
        speed: 800,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          type: 'bulvars',
        },
        onSlideChangeEnd: function (mySwiper) {
          mySwiper.update(); //swiper更新
        }
      })
    }
  }

  window.onload = function () {
    // 左侧导航二级目录
    navsecond()

    initSwiper()
  }

})
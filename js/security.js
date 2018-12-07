$(function() {
  'use strict'
  var type

  get_captcha()

  // 获取验证码图片
  function get_captcha() {
    getData('/api/antifake/get_captcha',{},function(res) {
      $('.yzm').html(res.data.img)
    })
  }

  $(".succeed_close").on("click",function() {
    $(this).parent().parent().hide()
    $(".mask_layer1").hide()
    if (type == 0) {
      window.location.reload()
    }
  })

  $(".mask_layer1").on("click",function() {
    $(".succeed").hide()
    $(".mask_layer1").hide()
    if (type == 0) {
      window.location.reload()
    }
  })

  // 查询结果
  function getresult(res,val) {
    $(".succeed").children("#num").html(val)
    $(".succeed").show()
    $(".mask_layer1").show()
    type = res.code
    if (res.code == 0) {
      $('.result').html('防伪编码真实有效，所属商品为宾爵手表品牌生产的正牌产品，请放心使用！感谢查询!')
    } else {
      $('.result').html(res.msg)
      get_captcha()
    }
  }

  $(".submit").on("click",function() {
    var val = $(".pcinput").val()
    var val1 = $('.yzminput').val()
    $('.loading').show()
    $('.mask_layer2').show()
    getData('/api/antifake/verify',{
      antifake_code:val,
      captcha:val1
    },function(res) {
      var timer = setTimeout(function() {
        $('.loading').hide()
        $('.mask_layer2').hide()
        getresult(res,val)
        clearTimeout(timer)
      }, 2000)
    })
  })

  $('.mbsubmit').on('click',function() {
    var val = $(".mbinput").val()
    var val1 = $('.mbyzminput').val()
    $('.loading').show()
    $('.mask_layer2').show()
    getData('/api/antifake/verify',{
      antifake_code:val,
      captcha:val1
    },function(res) {
      var timer1 = setTimeout(function() {
        $('.loading').hide()
        $('.mask_layer2').hide()
        getresult(res,val)
        clearTimeout(timer1)
      }, 2000)
    })
  })

  $('.yzm').on('click',function() {
    get_captcha()
  })

  $('.reset').on('click',function() {
    $('.form input[type=text]').val('')
  })

  window.onload = function() {
    // 左侧导航二级目录
    navsecond()
  }
})
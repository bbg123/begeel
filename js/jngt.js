$(function () {
  'use strict';
  var cityArr = [

    { "city": "广东省",
      "cityList":["中山市古镇曹二大信新都汇优越城百货一楼尊时表行永兴名表维修","深圳市宝安区西乡大益广场沃尔玛一楼安美时名表维修中心","深圳市沙井镇沙三村帝堂路22号"]},

    { "city": "湖北省",
      "cityList":["武汉市洪山区珞瑜路726号鲁巷广场购物中心一楼名表维修部","黄石市黄石大道文化宫金凤凰名表专柜（黄石港区）门牌号189-1号","武汉市青山区友谊大道896号武商量贩友谊店一楼钟表柜"]},

    { "city": "云南省",
      "cityList":["昆明市官渡区世纪城家乐福一楼名表维修中心","楚雄市鹿城南路2号新龙江广场一楼钟表柜"]},

    { "city": "河北省",
      "cityList":["藁城市信誉楼二楼钟表维修处","晋州市信誉楼商厦钟表维修处","沧州市运河区人民商场南门名表维修","邢台市桥西区家乐园购物广场一楼名表维修","保定市唐县双隆商厦","保定市蠡县诚信商厦"]},

    { "city": "山东省",
      "cityList":["淄博市周村区银座购物商场二楼钟表维修","菏泽市曹县县府前衔24号华时钟表商店","青岛市崂山区秦岭路18号丽达购物中心一楼名表维修中心","烟台市开发区长江路新世纪商贸大厦卖表修表处"]},

    { "city": "安徽省",
      "cityList":["淮南市凤台县小市场金鑫名表维修"]},

    { "city": "四川省",
      "cityList":["成都市龙泉驿区大面镇惠王陵东路283号"]},

    { "city": "内蒙古",
      "cityList":["赤峰市宁城县天义镇契丹街东门对过亨得利名表"]},

    { "city": "辽宁省",
      "cityList":["沈阳市和平区砂山街97号三利和平湾一号楼门市"]},

    { "city": "福建省",
      "cityList":["三明市将乐县移动大厦隔壁","厦门市思明区莲前东路加州商业广场一楼服务台旁名表维修中心"]},

    { "city": "天津市",
      "cityList":["天津市和平区南京路128号乐宾百货1楼名表维修站（MIDO专卖店旁）"]},

    { "city": "贵州省",
      "cityList":["贵阳市南明区大南门万东桥下集贸市场25号门面（亨特国际旁）"]},

    { "city": "黑龙江省",
      "cityList":["哈尔滨市道外区宏图街169号"]},

    { "city": "北京市",
      "cityList":["北京市石景山区苹果园南路东口物美大卖场6号","北京市海淀区复兴路42超市发玉泉路店","北京市昌平区昌平镇宁馨苑14号楼物美大卖场名表维修中心"]},

    { "city": "江苏省",
      "cityList":["无锡市人民中路123号（摩天360）2707"]},

    { "city": "上海市",
      "cityList":["上海市金山区朱泾镇东风路56号五福商业广场1号楼一楼嘉世名表行","上海市松江区新松江路935号乐购一楼嘉世名表行。"]},

    { "city": "浙江省",
      "cityList":["海宁市陕西二里中区328号（滨滨维修钟表店）"]}

  ]
  
  $(".select").on("click",function() {
    $(".selectList").stop().slideToggle()
    return false;
  })

  $(".selectbox").on("click",function() {
    $(".selectList").stop().slideUp()
  })

  $(".selectList li").on("click",function() {
    var val = $(this).html()
    $(".select").html(val)
    $(".select_content").show()
    var p = ""
    cityArr.forEach(item => {
      if (item.city == val) {
        item.cityList.forEach(item => {
          p += `
          <p>${item}</p>
          `
          $(".select_content").html(p)
        })
      }
    })
  })
        //  地图id      省份选择           城市选择
  baiduMap('allmap')

  baiduMap('almap')

  function baiduMap(mapId) {
    // 百度地图API功能
    var map = new BMap.Map(mapId);    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
      mapTypes:[
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
          ]}));	  
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  
    var city = "";
    $(".selectList li").on("click",function() {
      city = $(this).data("city")
      map.centerAndZoom(city,11)
    })
  
    $(".select_content").on("click","p",function() {
      var text = $(this).text() 
      var myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上，并调整地图视野    
      myGeo.getPoint(text, function(point){//回调函数      
          if (point) {      
            map.centerAndZoom(point, 20)     
            map.addOverlay(new BMap.Marker(point))    
          }      
      },city)
      
      $(this).addClass("active").siblings().removeClass("active")
    })
  }


  window.onload = function() {
    // 左侧导航二级目录
    navsecond()
  }
  
})
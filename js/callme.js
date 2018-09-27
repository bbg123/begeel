$(function () {
  'use strict';
  // 百度地图API功能
  var map = new BMap.Map("allmap");    // 创建Map实例
  map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
  //添加地图类型控件
  map.addControl(new BMap.MapTypeControl({
    mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));         // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

  var myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint("广东省广州市黄埔区敬业路97号淘汇商业园二楼", function(point){//回调函数      
        if (point) {      
          map.centerAndZoom(point, 17)     
          map.addOverlay(new BMap.Marker(point))    
        }      
    },"广东")

    // 百度地图API功能
  var map1 = new BMap.Map("almap");    // 创建Map实例
  map1.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
  //添加地图类型控件
  map1.addControl(new BMap.MapTypeControl({
    mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));         // 设置地图显示的城市 此项是必须设置的
  map1.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

  var myGeo1 = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo1.getPoint("广东省广州市黄埔区敬业路97号淘汇商业园二楼", function(point){//回调函数      
        if (point) {      
          map1.centerAndZoom(point, 17)     
          map1.addOverlay(new BMap.Marker(point))    
        }      
    },"广东")

  window.onload = function() {
    // 左侧导航二级目录
    navsecond()
  }

})
'use strict';

indexData()

leftnavData()

$('.loading').show()
$('.mask_layer2').show()

// 轮播图导航二级页显示
function nav2() {
	var index
	$(".pchome_lb_navbox").on("mouseover", ".pchome_lb_nav li", function () {
		index = $(this).data("index")
		$(this).addClass("lihover").siblings().removeClass("lihover")
		$(".pchome_lb_nav2").eq(index).show().siblings(".pchome_lb_nav2").hide()
	})

	$(".pchome_lb_navbox").on("mouseout", ".pchome_lb_nav li", function () {
		$(".pchome_lb_nav2").hide()
		$(".pchome_lb_nav li").removeClass("lihover")
	})

	$(".pchome_lb_navbox").on("mouseover", ".pchome_lb_nav2", function () {
		$(this).show()
		$(".pchome_lb_nav li").eq(index).addClass("lihover").siblings().removeClass("lihover")
	})

	$(".pchome_lb_navbox").on("mouseout", ".pchome_lb_nav2", function () {
		$(".pchome_lb_nav2").hide()
		$(".pchome_lb_nav li").removeClass("lihover")
	})
}

// 获取首页数据
function indexData() {

	getData("/api/index/get_index", {}, function (res) {

		var html0 = "";
		var html1 = "";
		var html2 = "";
		var html3 = "";

		// 轮播图数据
		for (var i = 0; i < res.data[0].list.length; i++) {
			html0 += '<a class="swiper-slide" href="' + res.data[0].list[i].link + '">' +
				'<img src="' + res.data[0].list[i].img + '" alt="' + res.data[0].list[i].name + '">' +
				'</a>'
		}
		$(".swiper-wrapper").html(html0)
		// 四宫格数据
		for (var j = 0; j < res.data[1].list.length; j++) {
			html1 += '<a href="'+res.data[1].list[j].link+'" class="pchome_top_ad_img">' +
				'<img src="' + res.data[1].list[j].img + '" alt="' + res.data[1].name + '">' +
				'</a>'
		}
		$('.pchome_top_ad').html(html1)

		// 内容数据

		res.data.forEach(function (item, index) {
			if (index > 1 && index != res.data.length - 1) {
				html2 += '<div class="pchome_main_">\n\t\t\t\t\t<div class="pchome_main_title clearfix">\n\t\t\t\t\t\t<h3 class="fl">' + item.name + '</h3>\n\t\t\t\t\t\t<a href="' + item.list_url + '" class="pchome_main_title_more fr">\n\t\t\t\t\t\t\t\u63A2\u7D22\u66F4\u591A\n\t\t\t\t\t\t\t<i class="glyphicon glyphicon-chevron-right"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<!-- \u5185\u5BB9 -->\n\t\t\t\t\t<ul class="pchome_main_content clearfix">';
				item.list.forEach(function (items, index) {
					if (index < 4) {
						html2 += '\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href="' + items.link + '">\n\t\t\t\t\t\t\t\t\t<img src="' + items.img + '" alt="' + item.name + '">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</li>'
					} else if (index == 4) {
						html2 += '<!-- \u5E7F\u544A -->\n\t\t\t\t\t\t\t</ul><a href="' + items.link + '" class="pchome_main_ad">\n\t\t\t\t\t\t\t<img src="' + items.img + '" alt="' + item.name + '">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>'
					} else {
						html2 += '</ul></div>'
					}
				})
			}
		})
		$(".pchome_main").html(html2)

		// 首页底部数据
		for (var x = 0; x < res.data[res.data.length - 1].list.length; x++) {
			html3 += '<a href="' + res.data[res.data.length - 1].list[x].link + '">' +
				'<img src="' + res.data[res.data.length - 1].list[x].img + '" alt="">' +
				'</a>'
		}
		
		$('.pchome_floorad').html(html3)

		// 初始化轮播图
		initswiper()

	})
}

// 图片hover效果
function imghover() {
	$(".pchome_main").on("mouseover", ".pchome_main_content li", function () {
		$(this).addClass("hover")
	})

	$(".pchome_main").on("mouseout", ".pchome_main_content li", function () {
		$(this).removeClass("hover")
	})
}

// 轮播图鼠标悬浮停止轮播
function swiperAuto(myswiper) {
	$("#pc_swiper").on("mouseover", function () {
		myswiper.autoplay.stop()
	})
	$("#pc_swiper").on("mouseout", function () {
		myswiper.autoplay.start()
	})
}

// 获取pc端左侧导航条数据
function leftnavData() {
	getData("/api/index/get_menu_list", {}, function (res) {
		var pchtml = '<ul class="pchome_lb_nav">'
		var arritem = []
		for (var c = 0; c < res.data.length; c++) {
				arritem.push(res.data[c].goods_list)
				pchtml += "<li data-index=\"" + c + "\">\n\t\t\t\t\t<a class=\"clearfix\" href=\"" + res.data[c].list_url + "\">\n\t\t\t\t\t\t<span class=\"fl\">" + res.data[c].name + "</span>\n\t\t\t\t\t\t<i class=\"glyphicon glyphicon-menu-right fr\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</li>"
		}
		pchtml += "<li class=\"pchome_lb_nav_arrow\">\n\t\t\t<img src=\"./images/s_jiantou_right.png\" alt=\"\"/>\n\t\t</li></ul>"
		for (var z = 0; z < arritem.length; z++) {
				pchtml += "<ul class=\"pchome_lb_nav2\">"
				for (var x = 0; x < arritem[z].length; x++) {
						pchtml += "<li>\n\t\t\t\t\t\t<a href=\"http://www.begeel.com/mobile/goodsinfo.html?id=" + arritem[z][x].id + "\">\n\t\t\t\t\t\t\t<img src=\"" + arritem[z][x].img + "\" alt=\"" + arritem[z][x].goods_name + "\">\n\t\t\t\t\t\t\t<div class='pchome_lb_nav2_text'>\n\t\t\t\t\t\t\t\t" + arritem[z][x].goods_name + "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>"
				}
				pchtml += "</ul>"
		}
		$(".pchome_lb_navbox").html(pchtml)
	})
}

// 初始化轮播图
function initswiper() {
	if (window.screen.width > 992) {
		// 初始化pc端轮播图
		var pcmySwiper = new Swiper('#pc_swiper', {
			direction: 'horizontal',
			loop: true,
			observer: true,
			observeParents: true,
			effect: 'fade',
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
				type: 'progressbar',
			},
			onSlideChangeEnd: function (pcmySwiper) {
				pcmySwiper.update(); //swiper更新
			}
		})
		swiperAuto(pcmySwiper)
	} else {

		// 初始化移动端轮播图
		var mySwiper = new Swiper('#swiper', {
			direction: 'horizontal',
			loop: true,
			effect: 'fade',
			observer: true,
			observeParents: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			},
			onSlideChangeEnd: function (mySwiper) {
				mySwiper.update(); //swiper更新
			}
		})
		swiperAuto(mySwiper)
	}
}

window.onload = function () { 

	imghover()

	nav2()

	// 左侧导航二级目录
	navsecond()

	getmenu()

	$('.loading').hide() 
	$('.mask_layer2').hide()

	// 点击弹出菜单
	function getmenu() {
		$('.pchome_lb_navbox').on('mouseover', function () {
			$(this).children('.pchome_lb_nav').stop().animate({
				left: '0'
			})
		})

		$('.pchome_lb_navbox').on('mouseout', function () {
			$(this).children('.pchome_lb_nav').stop().animate({
				left: '-24%'
			})
		})
	}

}
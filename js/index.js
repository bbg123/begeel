'use strict';

indexData()

leftnavData()

// 轮播图导航二级页显示
function nav2() {
	let index;
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

	getData("/v2/public/api/index/get_index", {}, function (res) {

		let html0 = "";
		let html1 = "";
		let html2 = "";
		let html3 = "";

		// 轮播图数据
		res.data[0].list.forEach(item => {
			html0 += `<a class="swiper-slide" href="${item.link}">
					<img src="${item.img}" alt="${res.data[0].name}">
				</a>`
		})
		$(".swiper-wrapper").html(html0)
		// 四宫格数据
		res.data[1].list.forEach(item => {
			html1 += `<a href="${item.link}" class="pchome_top_ad_img">
					<img src="${item.img}" alt="${res.data[1].name}">
				</a>`
		})
		$('.pchome_top_ad').html(html1)

		// 内容数据
		res.data.forEach((item, index) => {
			if (index > 1 && index != res.data.length - 1) {
				html2 += `<div class="pchome_main_">
					<div class="pchome_main_title clearfix">
						<h3 class="fl">${item.name}</h3>
						<a href="${item.list_url}" class="pchome_main_title_more fr">
							探索更多
							<i class="glyphicon glyphicon-chevron-right"></i>
						</a>
					</div>

					<!-- 内容 -->
					<ul class="pchome_main_content clearfix">`
				item.list.forEach((items, index) => {
					if (index < 4) {
						html2 += `
							<li>
								<a href="${items.link}">
									<img src="${items.img}" alt="${item.name}">
								</a>
							</li>`
					} else if (index == 4) {
						html2 += `<!-- 广告 -->
							</ul><a href="${items.link}" class="pchome_main_ad">
							<img src="${items.img}" alt="${item.name}">
							</a>
						</div>`
					} else {
						html2 += '</ul></div>'
					}
				})
			}
		})
		$(".pchome_main").html(html2)

		// 首页底部数据
		res.data[res.data.length - 1].list.forEach(item => {
			html3 += `<a href="${item.link}">
					<img src="${item.img}" alt="">
				</a>`
		})
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
	getData("/v2/public/api/index/get_menu_list", {}, function (res) {
		let pchtml = `<ul class="pchome_lb_nav">`
		let arritem = []
		res.data.forEach((item, index) => {
			arritem.push(item.goods_list)
			pchtml += `<li data-index="${index}">
					<a class="clearfix" href="${item.list_url}">
						<span class="fl">${item.name}</span>
						<i class="glyphicon glyphicon-menu-right fr"></i>
					</a>
				</li>`
		})
		pchtml += `</ul>`
		arritem.forEach(items => {
			pchtml += `<ul class="pchome_lb_nav2">`
			items.forEach(item => {
				pchtml += `<li>
						<a href="http://www.begeel.com/mobile/goodsinfo.html?id=${item.id}">
							<img src="${item.img}" alt="${item.goods_name}">
							<div class='pchome_lb_nav2_text'>
								${item.goods_name}
							</div>
						</a>
						</li>`
			})
			pchtml += `</ul>`
		})
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

window.onload = function() {

	imghover()

	nav2()

	// 左侧导航二级目录
	navsecond()

}
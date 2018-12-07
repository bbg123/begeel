$(function () {
	'use strict';
	var url = getCharFromUtf8(window.location.search.split("=")[1])

	getGoodsList(url, 1)
	var isbool = true;
	var arr = []

	function getGoodsList(url, page) {
		getData("/api/goods/get_list", {
			keyword: url,
			pageSize: 12,
			page: parseInt(page)
		}, function (res) {
			$('.loading').hide()
			if (res.data.data.length == 0 && arr.length == 0) {
				// html = `<li class="no_data" style="text-align: center;">
				// <h2>没有结果</h2>
				// <div>抱歉，没有找到与“<span style="color:red;">${url}</span>” 相关的产品。</div>
				// </li>`
				html = "<li class=\"no_data\" style=\"text-align: center;\">\n\t\t\t\t<h2>\u6CA1\u6709\u7ED3\u679C</h2>\n\t\t\t\t<div>\u62B1\u6B49\uFF0C\u6CA1\u6709\u627E\u5230\u4E0E\u201C<span style=\"color:red;\">" + url + "</span>\u201D \u76F8\u5173\u7684\u4EA7\u54C1\u3002</div>\n\t\t\t\t</li>"
				$(".goods_content").html(html)
			}
			if (arr.length == res.data.total) {
				isbool = false
				return false
			}
			isbool = true
			var html = ''
			arr = arr.concat(res.data.data)
			// res.data.data.forEach(item => {
			// 	html += `<li>
			// 	<a href="http://www.begeel.com/mobile/goodsinfo.html?id=${item.id}" class="goods_content_img">
			// 		<img src="${item.img}" alt="">
			// 	</a>
			// 	<div class="goods_content_text">
			// 		<div class="goods_content_text_title">${item.goods_name}</div>
			// 		<span class="goods_content_text_bor">
			// 			<span>${item.goods_sn}</span><span>${item.goods_features}</span>
			// 		</span>
			// 	</div>
			// </li>`
			// })
			res.data.data.forEach(function (item) {
				html += "<li>\n\t\t\t\t<a href=\"/mobile/goodsinfo.html?id=" + item.id + "\" class=\"goods_content_img\">\n\t\t\t\t\t<img src=\"" + item.img + "\" alt=\"\">\n\t\t\t\t</a>\n\t\t\t\t<div class=\"goods_content_text\">\n\t\t\t\t\t<div class=\"goods_content_text_title\">" + item.goods_name + "</div>\n\t\t\t\t\t<span class=\"goods_content_text_bor\">\n\t\t\t\t\t\t<span>" + item.goods_sn + "</span><span>" + item.goods_features + "</span>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</li>"
			})
			var html1 = ''
			// res.ad_list.forEach(item => {
			// 	html1 += `<a href="${item.link}" class="swiper-slide">
			// 	<img src="${item.img}" alt="">
			// </a>`
			// })
			res.ad_list.forEach(function (item) {
				html1 += "<a href=\"" + item.link + "\" class=\"swiper-slide\">\n\t\t\t\t<img src=\"" + item.img + "\" alt=\"\">\n\t\t\t</a>";
			})
			$(".goods_content").append(html)
			$(".swiper-wrapper").html(html1)
			initSwiper()
		})
	}

	// url中文转码
	function getCharFromUtf8(str) {
		var cstr = "";
		var nOffset = 0;
		if (str == "")
			return "";
		str = str.toLowerCase();
		nOffset = str.indexOf("%e");
		if (nOffset == -1)
			return str;
		while (nOffset != -1) {
			cstr += str.substr(0, nOffset);
			str = str.substr(nOffset, str.length - nOffset);
			if (str == "" || str.length < 9)
				return cstr;
			cstr += utf8ToChar(str.substr(0, 9));
			str = str.substr(9, str.length - 9);
			nOffset = str.indexOf("%e");
		}
		return cstr + str;
	}
	// url中文转码
	function utf8ToChar(str) {
		var iCode, iCode1, iCode2;
		iCode = parseInt("0x" + str.substr(1, 2));
		iCode1 = parseInt("0x" + str.substr(4, 2));
		iCode2 = parseInt("0x" + str.substr(7, 2));
		return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
	}

	// 初始化轮播图
	function initSwiper() {
		var mySwiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
			autoplay: {
				delay: 3000,
				disableOnInteraction: true
			},
			loop: true,
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination'
			},
			onSlideChangeEnd: function (pcmySwiper) {
				pcmySwiper.update(); //swiper更新
			}
		})
	}

	// 上拉加载数据
	function scrollGetData() {
		var page = 1
		var setheight = $('.goods_content').offset().top
		$(window).on('scroll', function (e) {
			var height = $('.goods_content').height() + setheight
			if ((e.currentTarget.outerHeight + e.currentTarget.pageYOffset) > height && isbool == true) {
				$('.loading').show()
				isbool = false
				page += 1
				getGoodsList(url, page)
			}
		})
	}

	window.onload = function () {

		scrollGetData()

		$(".goods_content").on("mouseover", ".goods_content_img", function () {
			$(this).children("img").addClass("hover")
		})

		$(".goods_content").on("mouseout", ".goods_content_img", function () {
			$(this).children("img").removeClass("hover")
		})

		// 左侧导航二级目录
		navsecond()

	}
})
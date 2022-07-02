<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环项item -->
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
					<image :src="item.image_src"></image>
				</navigator> -->
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层图片区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
					<!-- 标题图片 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<!-- 左边图片 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width:item.product_list[0].image_width + 'rpx' }"></image>
					</navigator>
					<!-- 右边4张图片 -->
					<view class="right-img-box">
						<!-- 循环右边4张图片，判断索引为0的不渲染 -->
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2 !== 0 " :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], //轮播图数据
				navList: [], //分类导航数据
				floorList: [] //楼层图片数据
			};
		},
		onLoad() {
			this.getSwiperList() // 调用方法获取轮播图数据
			this.getNavList() // 调用方法获取分类导航数据
			this.getFloorList() // 调用方法获取楼层图片数据
		},
		methods: {
			// 定义获取轮播图数据的方法
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg() // 如果状态不等于200，请求失败,调用在main.js封装好的提示方法
				this.swiperList = res.message // 请求成功后赋值给轮播图数据
			},

			// 定义获取分类导航数据方法
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message // 请求成功后赋值给分类导航数据
			},

			// 获取楼层图片数据方法
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 处理路径数据
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},

			// 分类导航切换方法
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	// 轮播图样式
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	// 导航分类样式
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	// 楼层图片样式
	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	
		
		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}
</style>

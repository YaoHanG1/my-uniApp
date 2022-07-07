<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		
		<view class="goods-info-box">
			<view class="price">￥{{goods_info.goods_price}}</view>
			
			<view class="goods-info-body">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递，免运费{{cart.length}}</view>
		</view>
		
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<view class="goods_nav">
			<!-- <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav> -->
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['total'])
		},
		watch: {
			total: {
				handler(newVal) {
					// 如果store里total的值发生了变化，就改变options里的info
					const findResult = this.options.find(x => x.text === '购物车')
					if(findResult) {
						findResult.info = newVal
					}
				},
				immediate: true,	// 初始化时调用一下
			}
		},
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺'
				},{
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg('')
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;" ').replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},
			// 轮播图预览效果
			preview(index) {
				uni.previewImage({
					current: index, // 预览时默认显示图片的索引
					urls: this.goods_info.pics.map(x => x.pics_big) // 所有图片url地址数组
				})
			},
			onClick(e) {
				if(e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if(e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_count: 1,
						goods_price: this.goods_info.goods_price,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
				}
			},
			...mapMutations('m_cart', ['addToCart'])
		},

	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 50px
	}
	swiper {
		height: 750rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}
	
	.goods-info-box {
		padding: 10px;
		padding-right: 0;
		.price {
			font-size: 20px;
			color: #c00000;
			padding: 10px 0;
		}
		.goods-info-body {
			display: flex;
			justify-content: space-between;
			.goods-name {
				font-size: 12px;
				margin-right: 10px;
			}
			.favi {
				width: 120px;
				color: gray;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				font-size: 12px;
			}
		}
		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}
	
	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>

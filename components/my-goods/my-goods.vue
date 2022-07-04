<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
																<!-- 调用过滤器保留两位小数 -->
				<view class="goods-price">￥{{goods.goods_price | toFixed}}</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				defaultPic: '../../static/my.jpg', //默认图片地址
			};
		},
		// 过滤器：保留两位小数
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
	
		.goods-item-left {
			margin-right: 5px;
	
			.goods-pic {
				width: 100px;
				height: 100px;
	
				display: block;
			}
		}
	
		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
	
			.goods-name {
				font-size: 13px;
			}
	
			.goods-info-box {
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
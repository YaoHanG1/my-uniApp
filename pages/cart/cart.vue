<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(goods, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
					<my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
						@num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
		<image src="../../static/my.jpg" class="empty-img"></image>
		<text class="tip-text">空空如也</text>
	</view>
</template>
	
<script>
	// 导入mixins
	import badgeMix from '@/mixins/tabbar-badge.js'
	// 导入store里的购物车数据
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix], // 注入mixins
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				// 滑动删除的配置项
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(goods) {
				this.removeGoodsById(goods.goods_id)
			}
		}

	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}
	.cart-title {
		display: flex;
		height: 40px;
		align-items: center;
		font-size: 14px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
	.empty-cart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 100px;
		.empty-img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		};
		.tip-text {
			font-size: 12px;
			margin-top: 15px;
			color: gray;
		}
	}
</style>

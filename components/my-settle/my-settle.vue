<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计：<text class="amout">￥{{checkedGoodsAmount}}</text>
		</view>

		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				second:3,	// 倒计时的秒数
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapGetters('m_user', ['addStr']),
			...mapState('m_user', ['token']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState() {
				this.updateAllState(!this.isFullCheck)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				if (!this.addStr) return uni.$showMsg('请选择收货地址')
				// if (!this.token) return uni.$showMsg('请先登陆')
				if (!this.token) return this.delayNavigate()
				uni.$showMsg('玩玩就好了')
			},
			delayNavigate() {
				this.second = 3
				this.showTips(this.second)
				this.timer = setInterval(() => {
					this.second--
					
					if(this.second<=0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from : '/pages/cart/cart'
								})
							}
						})
						return 
					}
					this.showTips(this.second)
				}, 1000)
			},
			showTips(n) {
				uni.showToast({
					icon:'none',
					title: '请先登录后再结算' + n + '秒后跳转到登录页面',
					mask: true,
					duration: 1500
				});
			}
		},
		
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		background-color: #fff;

		.radio {}

		;

		.amount-box {
			.amout {
				color: #c00000
			}
		}

		;

		.btn-settle {
			background-color: #c00000;
			color: white;
			heigth: 50px;
			min-width: 100px;
			padding: 0 10px;
			line-height: 50px;
			text-align: center;
		}
	}
</style>

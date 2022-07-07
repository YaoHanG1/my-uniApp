<template>
	<view class="my-settle-container">
			<label class="radio" @click="changeAllState">
				<radio color="#c00000" :checked="isFullCheck"/><text>全选</text>
			</label>
			<view class="amount-box">
				合计：<text class="amout">￥{{checkedGoodsAmount}}</text>
			</view>
			
			<view class="btn-settle">
				结算({{checkedCount}})
			</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllState']),
			changeAllState() {
				this.updateAllState(!this.isFullCheck)
			}
		}
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
		.radio {
			
		};
		.amount-box {
			.amout {
				color: #c00000
			}
		};
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

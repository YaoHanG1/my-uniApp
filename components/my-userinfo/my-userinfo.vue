<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<image :src="userinfo1.avatarUrl" class="avatar"></image>
			<view class="nackname">{{userinfo1.nickName}}</view>
		</view>

		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="../../static/tab_icons/pay-code-one.png" class="icon" mode=""></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="../../static/tab_icons/truck.png" class="icon" mode=""></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/tab_icons/currency.png" class="icon" mode=""></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/tab_icons/transaction-order.png" class="icon" mode=""></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>

			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="right"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="right"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['userinfo', 'userinfo1'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			async logout() {
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				if(succ && succ.confirm) {
					this.updateUserInfo({})
					this.updateToken('')
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: #ecb54c;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.avatar {
				width: 90px;
				height: 90px;
				border: 2px solid #fff;
				border-radius: 45px;
				box-shadow: 0 1px 5px black
			}

			;

			.nackname {
				font-size: 16px;
				color: #fff;
				font-weight: bold;
				margin-top: 10px
			}
		}

		;
	}

	.panel-list {
		width: 90%;
		margin: 0 auto;
		position: relative;
		top: -10px;

		.panel {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;

			.panel-list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 10px;
				font-size: 15px;
				line-height: 45px;
			}
			.panel-title {
				font-size: 15px;
				line-height: 45px;
				padding-left: 10px;
				border-bottom: 1px solid #f4f4f4;
			}

			.panel-body {
				display: flex;
				justify-content: space-around;

				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;

					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}
		}
	}
</style>

<template>
	<view class="login-container">
		<uni-icons type="contact" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile">一键登陆</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed:{
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			getUserProfile() {
				uni.getUserProfile({
					desc: '你的授权信息',
					success: (res) => {
						// 将信息存到 vuex 中
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
						console.log(res)
						this.getToken(res.userInfo)
					},
					fail: (res) => {
						return uni.$showMsg('您取消了登录授权')
					}
				})
				
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				this.updateToken(res.errMsg)
				
				this.navigateBack()
			},
			navigateBack() {
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 750rpx;
		background-color: #f8f8f8;
		overflow: hidden;
		position: relative;

		&::after {
			content: ' ';
			width: 100%;
			height: 40px;
			display: block;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			background-color: #c00000;
			margin: 15px 0;
			width: 90%;
			border-radius: 100px
		}

		;

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>

<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<icon type="search" size="17"></icon>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#ecb54c'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchBoxHandler() {
				this.$emit('myclick')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		padding: 0 10px;
		// background-color: #ecb54c;		// 已经通过props动态指定

		.my-search-box {
			display: flex;
			justify-content: center;
			height: 36px;
			width: 100%;
			background-color: #fff;
			// border-radius: 18px;		// 已经通过props动态指定
			align-items: center;

			.placeholder {
				margin-left: 5px;
				font-size: 15px;
			}
		}
	}
</style>

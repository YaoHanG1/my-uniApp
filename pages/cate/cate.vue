<template>
	<view>
		<my-search @myclick="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滚动条 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height:wh + 'px'}">
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="['left-scroll-view-item', index === active? 'active' : '']"
						@click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>

			<!-- 右侧滚动条 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height:wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">{{item2.cat_name}}</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="index3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix], // 注入mixins
		data() {
			return {
				wh: '', // 当前设备可用屏幕高度
				cateList: [], // 列表导航栏数字
				cateLevel2: [], // 二级分类数据
				active: 0,
				scrollTop: 0 // 设置每次切换导航滚动条置顶
			};
		},
		onLoad() {
			//页面加载获取可用屏幕高度
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList() // 调用获取列表导航方法
		},
		methods: {
			// 获取列表导航数字
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children // 赋值二级分类数据
			},
			activeChanged(index) {
				this.active = index // 点击激活高亮
				this.cateLevel2 = this.cateList[index].children // 点击修改二级分类
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #fff;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.right-scroll-view {
		background-color: #fff;

		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-item {
				display: flex;
				width: 33.33%;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;

				image {
					width: 60px;
					height: 60px;
				}

				text {
					font-size: 12px;
				}
			}
		}
	}
</style>

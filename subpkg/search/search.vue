<template>
	<view>
		<view class="search-box">
			<uni-search-bar placeholder="搜索" @confirm="search" @input="input" radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索列表区 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				 <uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史区 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" @click="cleanHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, index) in historys" :key="index" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null, // 输入框防抖定时器
				searchResults: [],  // 搜索数据
				historyList: [], // 搜索的历史记录
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e.trim()
					this.getSearchList()	// 输入一次调用一次搜索请求
				}, 500)
				
			},
			// 搜索请求函数
			async getSearchList() {
				if(this.kw === '') {
					this.searchResults = []
					return
				}
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				this.searchResults = res.message
				this.saveSearchList(this.kw)
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 保存搜索历史记录函数
			saveSearchList(history) {
				// 用indexOf去重
				// if(this.historyList.indexOf(history) !== -1) return
				// this.historyList.push(history)
				
				// 用set数据结构去重
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)	// 将set转化为数组
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			// 清空所有历史记录
			cleanHistory() {
				// 清空data保存的历史搜索数据
				this.historyList = []
				// 清空本地存储的搜索历史
				uni.setStorageSync('kw', '[]')
			},
			// 点击搜索记录跳转到goodslist页面
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		computed: {
			historys() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	
	.sugg-list {
		padding: 0 5px;
		
		.sugg-item {
			display: flex;
			justify-content: space-between;
			padding: 13px 0;
			font-size: 12px;
			align-items: center;
			border-bottom: 1px solid #efefef;
			.goods-name {
				white-space: nowrap;	// 不允许换行，
				overflow: hidden;	// 溢出隐藏，不影响图标显示
				text-overflow: ellipsis;	// 多余部分...代替
				margin-right: 3px;
				
			}
		}
	}
	
	.history-box {
		padding: 0 5px;
		
		.history-title {
			display: flex;
			justify-content: space-between;
			padding: 5px 5px;
			height: 40px;
			font-size: 13px;
			align-items: center;
			border-bottom: 1px solid #efefef;
		}
		
		.history-list {
			display: flex;
			flex-wrap: wrap;
			.uni-tag {
				background-color: #f8f8f8;
				margin: 5px 5px 0 0;
				color: #000;
				border-color: #f8f8f8;
			}
		}
	}
</style>

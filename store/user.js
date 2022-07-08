export default {
	namespaced: true,
	state: () => ({
		// 读取本地的收货地址数据， 初始化address对象
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		userinfo1: {
			avatarUrl: '../../static/my.jpg',
			nickName: '风知道往哪走'
		},
		redirectInfo: null,	// 重定向的Object
	}),
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage') // 通过commit方法调用m_user模块下的saveAddressToStorage方法将address对象持久化
		},
		// 持久化存储 address
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		
		// 更新token
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStrorage')
		},
		saveTokenToStrorage(state) {
			uni.setStorageSync('token', state.token)
		},
		
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		}
	},
	getters: {
		addStr(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}

export default {
	namespaced: true,
	state: () => ({
		// 读取本地的收货地址数据， 初始化address对象
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')	// 通过commit方法调用m_user模块下的saveAddressToStorage方法将address对象持久化
		},
		// 持久化存储 address
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	getters: {
		addStr(state) {
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}

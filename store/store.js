import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	// 挂载store模块
	modules: {
		// 挂载购物车的vuex模块，模块内成员的访问路径调整为m_cart
		// 购物车模块中cart数组的访问路径是m_cart/cart
		
		'm_cart': moduleCart,
		'm_user': moduleUser
	}
})
export default store	
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import login from './components/login.vue'
import star from './components/common/star.vue'

import router from './router/routes'


Vue.use(Vuex)


new Vue({
	//注入router的配置文件
	router,
	store,
	data:{
		msg:'mdzz'
	},
	components:{ login,star }
}).$mount("#index")

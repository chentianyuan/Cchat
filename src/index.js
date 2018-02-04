import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import router from './router/routes'


Vue.use(Vuex)
Vue.prototype.$axios = axios //Vue实例添加axios方法

new Vue({
	//注入router的配置文件
	router,
	store,
	// 所需的loading，toasting都在PageTransiton中加载
	components:{},
	mounted(){
		document.querySelector('#mainWarp').style.height = window.screen.availHeight + 'px'
	}
}).$mount("#index")

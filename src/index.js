import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import router from './router/routes'


Vue.use(Vuex)
Vue.prototype.$axios = axios //Vue实例添加axios方法

// axios request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token，以验证登陆者的身份
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});

// 其实可以在这边做Loading的加载与关闭，不用写到每个接口中去

// axios response 拦截器
axios.interceptors.response.use(
	config => config
)

router.beforeEach((to, from, next) => {
	store.dispatch('toggleLoging')
	next()
})

router.afterEach((to, from) => {
	setTimeout(() => {
		store.dispatch('toggleLoging')			
	}, 500);
})

// 混入
var mixin = {
	mounted(){
		//store.dispatch('toggleLoging')	
	}
}

new Vue({
	mixins: [mixin],
	//注入router的配置文件
	router,
	store,
	// 所需的loading，toasting都在PageTransiton中加载
	components:{},
	mounted(){
		document.querySelector('#mainWarp').style.height = window.screen.availHeight + 'px'
	}
}).$mount("#index")

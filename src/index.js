import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import router from './router/routes'


Vue.use(Vuex)
// 请求默认配置
// axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios //Vue实例添加axios方法

// axios request 拦截器
axios.interceptors.request.use(
    config => {
		// console.log(config)
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
	config => {
		if(config.data.err && config.data.msg === 'unlogin'){
			router.replace({path: '/'})
				return {state:1,msg:'请先登录'}		
		}else{
			return config
		}
	}
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
		// 由于路由懒加载，每个组件都有自己的生命周期，在最外层的组件加载完成后，内层组件才开始加载，所以这里·不能操作mainWarp
		// this.$nextTick(()=>{
		// 	if(document.querySelector('#mainWarp')){
		// 		document.querySelector('#mainWarp').style.height = window.screen.availHeight + 'px'
		// 	}
		// })s
		//store.dispatch('toggleLoging')	
	}
}

new Vue({
	mixins: [mixin],
	//注入router的配置文件
	router,
	store,
	// 所需的loading，toasting都在PageTransiton中加载
}).$mount("#index")

if (module.hot) {
	console.log('热更新')
    module.hot.accept();
}
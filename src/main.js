import Vue from 'vue'
import login from './components/login.vue'
import router from './router/routes'


new Vue({
	//注入router的配置文件
	router,
	data:{
		msg:'mdzz'
	},
	components:{ login }
}).$mount("#index")

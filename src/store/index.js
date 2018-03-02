import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isAlert:false,
		isloading:false,
		islogin:false,
		active:1,
		whertherChat:false,
		// 存储连接的用户
		socket:'',
		userInfo:{
			username:sessionStorage.getItem('USER')?sessionStorage.getItem('USER'):"",
			pic:'../../../static/img/img.jpg'
		},
		alertInfo:''
	},
	getters:{
		getActive: function(state){
			return state.active
		},
		getwhertherChat: function(state){
			return state.whertherChat
		},
		getSocket: state => state.socket,
		getUserInfo: state => state.userInfo,
		getLogin: state => state.islogin,
		getAlertInfo: state => state.alertInfo
	},
	mutations,
	actions
});

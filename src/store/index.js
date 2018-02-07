import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isloading:false,
		active:1,
		whertherChat:false,
		// 存储连接的用户
		socket:''
	},
	getters:{
		getActive: function(state){
			return state.active
		},
		getwhertherChat: function(state){
			return state.whertherChat
		},
		getSocket: state => state.socket
	},
	mutations,
	actions
});

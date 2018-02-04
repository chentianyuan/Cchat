import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isloading:false,
		active:1
	},
	getters:{
		getActive: function(state){
			return state.active
		}
	},
	mutations,
	actions
});

export default {
    LOADING_TOGGLE:(state)=>{
        state.isloading = !state.isloading
    },
    ACTIVE_TOGGLE:(state)=>{
        if(state.active == 1){
            state.active = 2
        }else{
            state.active = 1
        }
    },
    CHATING:(state,bool)=>{
        state.whertherChat = bool
    },
    SETSOCKET:(state,user)=>{
        state.socket = user
    }
}
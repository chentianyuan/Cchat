export default {
    SETLOGIN:(state,bool)=>{
        state.islogin = bool
    },
    SETUSER:(state,name)=>{
        state.userInfo.username = name
    },
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
    },
    SETALERT:(state,bool)=>{
        state.isAlert = bool
    },
    SETALERTINFO:(state,info)=>{
        state.alertInfo = info
    },
    CHANGEAVATAR:(state,filepath)=>{
        state.userInfo.pic = filepath
    }
}
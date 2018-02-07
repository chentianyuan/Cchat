<template>
    <div class="chathome">
        <div class="content">
            chat!!!!!        
        </div>
        <div class="bottom">
            <input type="text"/>
            <button>发送</button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { mapGetters } from 'vuex'

export default {
    created(){
        this.$store.commit('CHATING',true)
        //document.querySelector('.chathom').height = document.querySelector('#mainWarp').height + 'px'
        if(!this.getSocket){
            this.$store.commit('SETSOCKET',io.connect('localhost:3001/'))
            console.log(this.getSocket)
        }
    },
    computed:{
        ...mapGetters([
            'getSocket'
        ])
    }
}
</script>

<style lang="scss" scoped>
    @mixin clearOB{
        outline:0;
        border:0;
    }
    .chathome{
        height:100%;
        background:#f8f8f8;
        .bottom{
            position:fixed;
            width:100%;
            bottom:0;
            left:0;
            height:50px;
            display:flex;
            input{
                width:80%;
                @include clearOB;
                background:#f8f8f8;
            }
            button{
                width:20%;
                @include clearOB;
            }
        }
    }
</style>

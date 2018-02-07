<template>
    <div class="bottom" v-show="!getwhertherChat">
        <ul>
            <li @click="changeActive(1)" :class="getActive==1?'big':''">
                <i :class="getActive==1?'fa fa-comment':''"></i>
                <span>主页</span>
            </li>
            <li @click="changeActive(2)" :class="getActive==2?'big':''">
                <i :class="getActive==2?'fa fa-male':''"></i>
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters([
            'getActive',
            'getwhertherChat'
        ])
    },
    methods:{
        changeActive(val){
            if(val == this.getActive){
                return
            }else{                
                this.$store.commit('ACTIVE_TOGGLE')
                this.$router.push({path:this.getActive==1?'/Cchat':'/Cchat/mine'})
            }

        }
    }
}
</script>

<style lang="scss" scoped>
    .bottom{
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        ul{
            display:flex;
            li{
                flex-basis: 50%;
                text-align:center;
                span,i{
                    transition:.3s all;
                    color:#685959;
                    display:block;
                    padding:2px 0px;
                    font-size: 14px;
                }
            }
            .big{
                 span,i{
                    font-size:16px;
                    color:royalblue;
                 }       
            }        
        }
    }
</style>

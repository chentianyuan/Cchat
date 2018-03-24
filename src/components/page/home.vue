<template>
    <div>
        <Header :headname=val></Header>
            <transition :name="transitionName">
                    <router-view class="child-view"></router-view>
            </transition>
        <bottomNav></bottomNav>
    </div>    
</template>

<script>
import Header from '../common/header'
import bottomNav from '../common/bottomNav'
import { mapGetters,mapMutations } from 'vuex'


export default {
    data(){
        return{
            transitionName: 'slide-left'
        }
    },
    created(){
        if(!this.getLogin){
            this.SETALERTINFO('请先登录')
			this.SETALERT(true)
            this.$router.push({path:'/'})
        }
    },
    // beforeRouterUpdate接受三个参数
    // 需要的地方设置次路由钩子即可
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    },
    components:{
      Header,bottomNav
    },
    computed:{
      ...mapGetters([
          'getLogin',
          'getActive',
          'getwhertherChat'
      ]),
      val(){
          if(this.getwhertherChat){
              return '聊天室' 
          }else{
              return this.getActive == 1 ? "Cchat" : "Mine"
          }
      }
    },
    methods:{
        ...mapMutations([
            'SETALERT',
			'SETALERTINFO'
        ])
    }
}
</script>

<style lang="scss" scoped>

</style>

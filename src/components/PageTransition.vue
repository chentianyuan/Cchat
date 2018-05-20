<template>
  <div id="mainWarp" ref="mainWarp">
    <loading></loading>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <alerting></alerting>
  </div>
</template>

<script>
import loading from './common/loading.vue'
import alerting from './common/alerting.vue'

  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    mounted(){
      this.$nextTick(()=>{
				this.$refs.mainWarp.style.height = window.screen.availHeight + 'px'      
      })
    },
    // beforeRouterUpdate接受三个参数
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
      loading,alerting
    }
  }
</script>

<style lang="scss">
  .child-view {
    position: absolute;
    width:100%;
    transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  //设置好vuetransition中预定的类的动效后，可复用至任何router-view
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
  .header {
    position:absolute;
    height:44px;
    background:#0058f1;
    width:100%
  }
</style>
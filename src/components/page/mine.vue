<template>
  <div class="mine">
      <section class="mineInfo"></section>
      <ul>
        <li v-for="(item,key) in muen" @click="logout" :key="key">{{item.til}}</li>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
      return{
        muen:[{til:'个人信息'},{'til':'聊天记录'},{'til':'退出'}]
      }
    },
    computed:{
      ...mapGetters([
        'getActive'
      ])
    },
    created(){
      if(this.getActive != 2)
      this.$store.commit('ACTIVE_TOGGLE')
    },
    methods:{
      logout(index){
        switch(index){
          case 3:
              this.$router.push({path:'/'})
              break
        }
      }
    }
}
</script>

<style lang="scss" scoped>
    .mineInfo{
      position: relative;
      width:100%;
      background:url(../../../static/img/img.jpg) center center no-repeat;
      height:14rem;
      box-shadow: 0 0 40px 5px #999999 inset;
      z-index: -1;      
    }
    ul li{
        padding:8px 2px;
        font-size:1rem;
        border-bottom:1px solid #f8f8f8;
        &:last-child{
          background: #eb4545;
          text-align: center;
          margin:20px;
          border-radius:4px;
          color:#fff;
        }
    } 
</style>

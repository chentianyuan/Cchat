<template>
    <div>
        <Header :headname=val></Header>
            <router-view></router-view>
        <bottomNav></bottomNav>
    </div>
</template>

<script>
import Header from '../common/header'
import bottomNav from '../common/bottomNav'
import { mapGetters } from 'vuex'


export default {
    data(){
        return{

        }
    },
    components:{
      Header,bottomNav
    },
    computed:{
      ...mapGetters([
          'getActive'
      ]),
      val(){
          return this.getActive == 1 ? "Cchat" : "Mine"
      }
    },
    mounted(){
        console.log(this.getActive)
    }
}
</script>

<style lang="scss" scoped>

</style>

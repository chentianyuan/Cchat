<template>
    <div>
        <Header headname="Cchat"></Header>
        <transition name="transitionName">
            <router-view></router-view>
        </transition>
        <bottomNav></bottomNav>
    </div>
</template>

<script>
import Header from '../common/header'
import bottomNav from '../common/bottomNav'
export default {
  components:{
      Header,bottomNav
  }
}
</script>

<style lang="scss" scoped>

</style>

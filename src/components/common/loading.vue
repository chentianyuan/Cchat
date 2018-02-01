<template>
    <div class="loading" v-show="isloading">
        <img src="../../../static/img/load.gif" alt="">
    </div>
</template>

<script>
export default {
    name:'loading',
    data(){
        return{}
    },
    computed:{
        isloading(){
            return this.$store.state.isloading
        }
    }
}
</script>

<style lang="scss" scoped>
    .loading{
        transition:1s all;
        position: absolute;
        top:50%;
        left:50%;
        transform:translateX(-100px) translateY(-50px);
        z-index:9;
        img{
            width:200px;
            height:100px;
        }
    }
</style>

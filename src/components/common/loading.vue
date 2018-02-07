<template>
    <div class="loading" v-show="isloading">
        <img src="../../../static/img/load3.gif" alt="">
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
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
       
        z-index:9;
        img{
            position: absolute;
            width:200px;
            height:100px;
            //opacity:.8;
            top:50%;
            left:50%;
            transform:translateX(-100px) translateY(-50px);
        }
    }
</style>

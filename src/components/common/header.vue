<template>
    <div class="header">
        <i class="fa fa-angle-left" @click="backTo"></i>
        {{headname}}
    </div>
</template>

<script>
export default {
   props:['headname'],
   methods:{
       backTo(){
           this.$router.go(-1)
       }
   }
}
</script>

<style lang="scss" scoped>
    .header{
        position: relative;
        width:100%;
        height:50px;
        text-align:center;
        line-height:50px;
        background: #eeeeee;
        color:#000;
        font-size:1rem;
        z-index:99;
        i{
            position: absolute;
            left:0;
            top:0;
            height: 50px;
            width: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 24px;
        }
    }
</style>

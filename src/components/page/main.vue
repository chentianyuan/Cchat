<template>
    <section class="main">
        <h5>常用聊天室</h5>
            <aside v-for="(item,key) in list" @click="chatHome(key)" :key="key">
                <img :src="item.imgSrc" alt="">
                <span>聊天室{{key + 1}}</span>
                <i class="fa fa-comment"></i>                
            </aside>
        <h5>Robot</h5>
        <aside @click="chatHome('robot')">
                <img src="../../../static/img/chat3.jpg" alt="">
                <span>Cchat大冰</span>
                <i class="fa fa-comment"></i>                
        </aside>
    </section>
</template>

<script>

export default {
    data(){
        return{
            list:[
                {imgSrc:require("../../../static/img/chat1.jpg")},
                {imgSrc:require("../../../static/img/chat2.jpg")}
            ]
        }
    },
    created(){
        this.$store.commit('CHATING',false)        
    },
    methods:{
        chatHome(index){
            this.$router.push({path:`Cchat/chat/${index}`})
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    h5{
        padding:10px 5px;
    }
    aside{
        box-sizing: border-box;
        width:100%;
        padding:10px 5px;
        transition:all .3s;
        img{
            border-radius:50%;
            height:40px;
            width:40px;
            vertical-align: middle;
            padding:5px 15px 5px 10px;
        }
        i{
            float:right;
            vertical-align:middle;
            font-size:18px;
            color:burlywood;
            height:50px;
            margin-right:10px;
            line-height:50px;
        }
        &:hover{
            background:rgb(237,237,237)
        }
    }
}
</style>

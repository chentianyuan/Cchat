<template>
    <div class="chathome">
        <div class="content">
            <section :key="key" v-for="(item,key) in contents"  :class="item.user == getUserInfo.username?'rightContent':'leftContent'" v-if="item.roomId==roomId">
                <header>
                    <i>{{item.user}}</i>
                    <span>{{item.date | timetrans}}</span>
                </header>
                <aside v-if="item.content.indexOf('gif') == -1">{{item.content}}</aside>    
                <img v-if="item.content.indexOf('gif') != -1" :src="item.content"/>    
            </section>  
        </div>
        <div class="bottom">
            <div class="icon" @click="emoji">
                <span>emoji</span>
                <section class="gif" v-show="gifshow">
                    <img  :key="key" v-for="(gifsrc,key) in gifList" :src="gifsrc"  @click="enter(key)"/>
                </section>
            </div>
            <input type="text" v-model="inputText"/>
            <button @click="enter('')">发送</button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'
import { mapGetters,mapMutations } from 'vuex'

export default {
    data(){
        return{
            contents:'',
            inputText:'',
            roomId:'',
            gifList:[
                require('../../../static/gif/1.gif'),
                require('../../../static/gif/2.gif'),
                require('../../../static/gif/3.gif'),
                require('../../../static/gif/4.gif'),
                require('../../../static/gif/5.gif')               
            ],
            gifshow:false
        }
    },
    created(){
        this.roomId = this.$route.params.id
        this.$store.commit('CHATING',true)
        if(!this.getSocket && this.roomId != 'robot'){
            this.$store.commit('SETSOCKET',io.connect('localhost:3000'))
        }
        this.getMessage()
    },
    mounted(){
        this.$nextTick(()=>{
            document.querySelector('.content').style.height = `${window.screen.availHeight - 120}px`
            document.querySelector('.header').style.position = 'fixed'
            // document.querySelector('.content').scrollTop = document.querySelector('.content').scrollHeight
            window.scrollTo(0,10000)
            window.onkeydown = (e) => {
                if(event.keyCode == 13){
                    this.enter()
                }
			}
        })
        if(this.getSocket){
            this.getSocket.on('chat message',()=>{
                this.getMessage()
            })
        }
    },
    computed:{
        ...mapGetters([
            'getSocket',
            'getUserInfo'
        ])
    },
    methods:{
        ...mapMutations([
            'SETALERT',
            'SETALERTINFO'
        ]),
        emoji(){
            this.gifshow = !this.gifshow
        },
        enter(gifIndex){
            if(!this.inputText && !gifIndex){
                this.SETALERTINFO('您要发什么?')
			    this.SETALERT(true)
                return
            }
            var options = { 
                user:this.getUserInfo.username,
                content:this.inputText || require(`../../../static/gif/${gifIndex}.gif`),
                date:new Date().getTime(),
                roomId:this.roomId
            }
            if(this.roomId != 'robot'){
                this.sendMessage(options)
            }else{
                // 机器人接口
                var moren = {
                    key: 'free',
                    appid: 0,
                    msg: this.inputText
                }
                this.$axios.post('/api/robot',moren).then(res=>{
                    var robotoptions = {
                        user:'Cchat大冰',
                        content:res.data.content,
                        date:new Date().getTime(),
                        roomId:this.roomId
                    }
                    this.contents = [...this.contents,options,robotoptions]
                    this.inputText = ''
                    this.$nextTick(()=>{
                        document.querySelector('.content').scrollTop = document.querySelector('.content').scrollHeight
                        this.gifshow = false      
                    })
                })
            }
        },
        sendMessage(options){
            this.$axios.post('/api/chatEnter',options).then(res=>{
                if(res.data.state){
                    this.contents.push(options)
                    this.inputText = ''
                    this.getSocket.emit('send message')
                }else{
                    this.SETALERTINFO('服务器错误')
			        this.SETALERT(true)
                }
            }).catch(err=>{
                this.SETALERTINFO('发送失败')
			    this.SETALERT(true)
            })
        },
        getMessage(){
            this.$axios.get('/api/chatContent').then(res=>{
                if(!res.data.state){
                }else{
                    this.contents = res.data.msg
                    setTimeout(() => {
                        // 延时执行防止阻塞GUI线程，Javascript线程和GUI线程是互斥的
                        document.querySelector('.content').scrollTop = document.querySelector('.content').scrollHeight
                    }, 0);
                }
            }).catch(err =>
                alert('请求出错了')
            )
        }
    },
    beforeDestroy(){
        this.$store.commit('SETSOCKET','')        
        document.querySelector('.header').style.position = 'relative' 
               
    },
    filters:{
       timetrans(date){
            var date = new Date(date);//如果date为13位不需要乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y+M+D+h+m+s;
        }
    }
}
</script>

<style lang="scss" scoped>
    @mixin clearOB{
        outline:0;
        border:0;
    }
    .chathome{
        height:100%;
        background:#f8f8f8;
        .content{
            margin:50px 0 70px 0;
            z-index: -1;
            overflow:auto;
        }
        .bottom{
            position:fixed;
            width:100%;
            bottom:0;
            left:0;
            height:50px;
            display:flex;
            flex-wrap: wrap;
            input{
                width:80%;
                @include clearOB;
                background:#f8f8f8;
            }
            button{
                width:20%;
                @include clearOB;
            }
            .icon{
                position: absolute;
                text-align: center;
                top: -20px;
                left: 0;
                width: 100%;
                height: 20px;
                background: rgb(224,222,219);
                line-height: 20px;
                .gif{
                    display: flex;
                    position: absolute;
                    padding: 0;
                    background: #aaa;
                    box-shadow: 0 0 10px #555;
                    width: 100%;
                    top: -50px;
                    left: 0;
                    justify-content: space-around;
                    img{
                        width: 30px;
                        height: 30px;
                        padding: 10px;
                    }
                }
            }
        }
        section{
            padding:8px;
            transition: all .5s;
            i{
                font-size: 1.4rem;
                color: burlywood;
            }            
            span{
                font-size: .8rem;
            }
            aside{
                margin-top:2px;
            }
        }
        .rightContent{
            text-align: right;
        }
    }
</style>

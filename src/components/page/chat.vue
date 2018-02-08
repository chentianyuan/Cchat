<template>
    <div class="chathome">
        <div class="content">
            <section :key="key" v-for="(item,key) in contents"  :class="item.user == getUserInfo.username?'rightContent':'leftContent'" v-if="item.roomId==roomId">
                <header>
                    <i>{{item.user}}</i>
                    <span>{{item.date | timetrans}}</span>
                </header>
                <aside>{{item.content}}</aside>    
            </section>  
        </div>
        <div class="bottom">
            <input type="text" v-model="inputText"/>
            <button @click="enter">发送</button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            contents:'',
            inputText:'',
            roomId:''
        }
    },
    created(){
        this.roomId = this.$route.params.id
        this.$store.commit('CHATING',true)
        if(!this.getSocket){
            this.$store.commit('SETSOCKET',io.connect('localhost:3000'))
        }
        this.getMessage()
    },
    mounted(){
        this.$nextTick(()=>{
            document.querySelector('.content').style.height = `${window.screen.availHeight - 100}px`
            document.querySelector('.header').style.position = 'fixed'
            // document.querySelector('.content').scrollTop = document.querySelector('.content').scrollHeight
            window.scrollTo(0,10000)
            window.onkeydown = (e) => {
                if(event.keyCode == 13){
                    this.enter()
                }
			}
        })
        this.getSocket.on('chat message',()=>{
            this.getMessage()
        })
    },
    computed:{
        ...mapGetters([
            'getSocket',
            'getUserInfo'
        ])
    },
    methods:{
        enter(){
            if(!this.inputText){
                return
            }
            var options = { 
                user:this.getUserInfo.username,
                content:this.inputText,
                date:new Date().getTime(),
                roomId:this.roomId
            }
            this.$axios.post('/api/chatEnter',options).then(res=>{
                if(res.data.state){
                    this.contents.push(options)
                    this.inputText = ''
                    this.getSocket.emit('send message')
                }else{
                    alert('服务器错误')
                }
            }).catch(err=>{
                alert('发送失败')
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
            margin:50px 0;
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
            input{
                width:80%;
                @include clearOB;
                background:#f8f8f8;
            }
            button{
                width:20%;
                @include clearOB;
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

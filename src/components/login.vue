<template>
	<div id="enter">
		<star></star>
		<section class="login">
			<div class="title">
				<h2>Cchat</h2>
				<h5><span :class="state ? 'in' : ''" @click="changeState('login')">Login</span> / <span :class="!state ? 'in' : ''" @click="changeState('registered')">registered</span></h5>
			</div>
			<div class="box">
				<div class="input">
					<p class="in">账号 :<i></i><input :class="username1?'appaer':''" type="text" v-model="username1"></p>
					<p class="in">密码 :<i></i><input :class="password1?'appaer':''" type="password" v-model="password1"></p>
					<p><button @click="login" :disabled="disable">Login</button></p>
				</div>	
				<div class="registered">
					<p class="in"><i></i><input type="text" :class="username2?'appaer':''" placeholder="输入注册账号" v-model="username2"></p>
					<p class="in"><i></i><input type="password" :class="password2?'appaer':''" placeholder="新的密码" v-model="password2"></p>
					<p class="in"><i></i><input type="password" :class="repeatPassword2?'appaer':''" placeholder="请重新输入" v-model="repeatPassword2"></p>
					<p><button @click="register" :disabled="disable">registered</button></p>
				</div>
			</div>
		</section>	
	</div>
</template>

<script>
	import star from './common/star'
	import axios from 'axios'
	import io from 'socket.io-client';
	import { mapGetters, mapState , mapMutations } from 'vuex'


	export default{
		data(){
			return {
				state:true,
				username1:'',
				password1:'',
				username2:'',
				password2:'',
				repeatPassword2:'',
				disable:false
			}
		},
		components:{
			star
		},
		computed:{
			...mapGetters([
				'getLogin',
				'getSocket',
				'alertInfo'
			]),
			...mapState([
				"isAlert",
            	"alertInfo"
			])
		},
		created(){
			if(this.getSocket){
				sessionStorage.clear()
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let dom = document.querySelector("#enter")
				// window.screen.availHeight获取屏幕可见高度
				dom.style.height = window.screen.availHeight + 'px'
				window.onkeydown = (e) => {
					if(event.keyCode == 13 && this.state){
						this.login()
					}else if(event.keyCode == 13 && !this.state){
						this.register()
					}
				}
			})
		},
		methods:{
			...mapMutations([
				'SETALERT',
				'SETALERTINFO'
			]),
			changeState:function(val){
				if((val == 'login' && this.state)||(val == 'registered') && !this.state){
					return 
				}else{
					val == 'login' ? (
						this.state = true,
						document.querySelector(".input").style.left = 0 + 'px',
						document.querySelector(".registered").style.left = 100 + '%'
					) : (
						this.state = false,
						document.querySelector(".input").style.left = -100 + '%',					
						document.querySelector(".registered").style.left = 0 + 'px'
					)
				}	
			},
			login:function(){
				// 已代理到本地服务器端口
				if(!this.username1 || !this.password1){
					this.SETALERTINFO('请将信息填写完整')
					this.SETALERT(true)
					return
				}
				this.$store.dispatch('toggleLoging')
				this.disable = true
				this.$axios.post('/api/login',{user:this.username1,pwd:this.password1}).then(res=>{
					if(res.data.state == 1){
						setTimeout(() => {		
							sessionStorage.setItem('USER',this.username1)
							this.$store.commit('SETLOGIN',true)
							this.$store.commit('SETUSER',this.username1)				
							this.$store.dispatch('toggleLoging')
							this.$router.push({path:'./Cchat'})	
						}, 1000);
					}else{
						this.SETALERTINFO(res.data.msg)
						this.SETALERT(true)
						this.username1 = ''
						this.password1 = ''
						this.$store.dispatch('toggleLoging')				
					}
					this.disable = false
				}).catch(err=>{
					console.log(err)
				})
			},
			register:function(){
				this.disable = true								
				if(!this.username2 || !this.password2 || !this.repeatPassword2){
					this.SETALERTINFO('请将信息填写完整')
					this.SETALERT(true)
					this.disable = false										
					return
				}else if(this.password2 !== this.repeatPassword2){
					this.SETALERTINFO('两次输入密码不一致')
					this.SETALERT(true)
					this.password2 = ''
					this.repeatPassword2 = ''
					this.disable = false										
					return
				} else{
					this.$store.dispatch('toggleLoging')
					this.$axios.post('/api/register',{user:this.username2,pwd:this.password2}).then(res=>{
						if(res.data.state == 1){
							setTimeout(() => {
								this.$store.dispatch('toggleLoging')
								this.SETALERTINFO('注册成功,请登录')
								this.SETALERT(true)
								this.username2 = ''
								this.password2 = ''
								this.repeatPassword2 = ''
								this.changeState('login')
							}, 1000);	
						}else{
							this.SETALERTINFO(res.data.msg)
							this.SETALERT(true)
							this.$store.dispatch('toggleLoging')
						}
						this.disable = false												
					})
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#enter{
		color:#fff;	
		text-align:center;
		.login {
			width: 100%;
			height: 250px;
			margin: 0 auto;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translate(0%, -50%);
		}
		.title{
			h2{
				margin:10px 0;
			}
			h5{
				margin:30px 0;	
			}
			span{
				transition: 1s all;
				padding:2px 5px;
				cursor: pointer;
			}
			.in{
				border-radius:5px;
				background-color:rgb(194, 18, 18);
			}
		}
		.box{
			position: relative;
			height:200px;
			overflow: hidden;
			.appaer{
				border-bottom:1px solid rgba($color: #fff, $alpha: 1) !important;				
			}
			.input,.registered{
				width:100%;
				position: absolute;
				transition:0.5s all;
				top:0;
				p:last-child{
					margin-top:20px;
					button{
						border:0;
						outline:0;						
						transition:.2s all;
						color:#fff;
						padding:4px 20px;
						border-radius:12px;
						background:rgba(194, 18, 18, .6);
						//font-weight:bold;
						font-size:16px;
						letter-spacing:1px;
						&:hover{
							background:rgba(194, 18, 18, 1);
						}
					}
				}
			}
			.input{
				left:0;
			}
			.registered{
				left:100%;
			}
			.in input{
				outline:none;
				background:transparent;
				margin:10px;
				opacity: 1;
				border:none;
				border-bottom:1px solid rgba($color: #fff, $alpha: .3);
				color:#fff;
				text-align:center;
				transition: 1s all;
			}
		}
	}
</style>
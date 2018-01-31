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
					<p class=""><i></i><input type="text"></p>
					<p class=""><i></i><input type="password"></p>
					<p><a href="javascript:">Login</a></p>
				</div>	
				<div class="registered">
					<p class=""><i></i><input type="text"></p>
					<p class=""><i></i><input type="password"></p>
					<p class=""><i></i><input type="password"></p>
					<p><a href="javascript:">registered</a></p>
				</div>
			</div>
		</section>	
	</div>
</template>

<script>
	import star from './common/star'
	export default{
		data(){
			return {
				state:true
			}
		},
		components:{
			star
		},
		methods:{
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
			height: 400px;
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
			.input,.registered{
				width:100%;
				position: absolute;
				transition:0.5s all;
				top:0;
			}
			.input{
				left:0;
			}
			.registered{
				left:100%;
			}
		}
	}
</style>
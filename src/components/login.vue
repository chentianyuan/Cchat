<template>
	<div class="message">
		{{msg}}
		<div class="test">测试</div>	
	</div>
</template>

<script>
	export default{
		data(){
			return {
				msg:'这里是登陆组件'
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.message{
		color:blue;
		.test{
			color:red;
		}
	}
</style>
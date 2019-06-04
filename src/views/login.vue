<template>
	<div class="login">
		<el-button @click='login'>登录</el-button>
	</div>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {
				message: "12334456"
			}
		},
		components: {
		},
		methods:{
			login(){
				this.$router.push({
					path:'/index'
				})
			}
		}
	}
</script>

<style scoped>
	.login {
		height: 100%;
	}
</style>

<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<span class='left'>税率配置</span>
				<el-button class='right'>新增税率</el-button>
			</div>
		</div>
		<div class="right_contain">

		</div>
	</div>
</template>

<script>
	import searchModule from "../components/customer/searchModule.vue"
	import listModule from "../components/customer/listModule.vue"
	export default {
		name: "customer",
		data() {
			return {
				message: "12334456"
			}
		},
		components: {
			searchModule,
			listModule
		}
	}
</script>

<style scoped>
	.main_contain {
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
	}

	.left_contain {
		width: calc(50% - 10px);
		/* background: pink; */
		float: left;
		height: 100%;
	}
	.right_contain{
		width: calc(50% - 10px);
		height: 100%;
		float: right;
		}
	.contain_header{
		height: 2rem;
		line-height: 2rem;
		padding: 0px 30px;
		background: url(../assets/img/list-bg1.png) no-repeat;
		background-size: cover;
		border-top-left-radius: 0.06rem;
		border-top-right-radius:0.06rem;
	}
</style>

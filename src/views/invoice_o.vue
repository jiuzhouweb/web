<template>
	<div class="main_contain">
		<div class="left_contain">
			<searchModule></searchModule>
			<listModule></listModule>
		</div>
		<div class="right_contain">

		</div>
	</div>
</template>

<script>
	import searchModule from "../components/invoice_o/searchModule.vue"
	import listModule from "../components/invoice_o/listModule.vue"
	export default {
		name: "router1",
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
	}

	.left_contain {
		width: 1180px;
		/* background: pink; */
		float: left;
		height: 100%;
	}
	.right_contain{
		width: 420px;
		height: 100%;
		float: right;
		background: purple;
		}
</style>

<template>
	<div id="app">
    <router-view/>
	</div>
</template>

<style lang="less" scoped>
	.el-container {
		height: 100%;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
	}

	.el-menu {
		border: none
	}

	.tac.el-row,
	.el-col,
	.el-menu {
		height: 100%;
	}

	.el-main {
		padding: 40px;
	}
.el-header {
		line-height: 44px;
		background-color: aquamarine
	}
	.el-footer {
		line-height: 44px;
		background-color: aquamarine
	}

	//
</style>
<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

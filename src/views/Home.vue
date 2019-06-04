<template>
	<div class='home'>
		<el-container>
			<el-header class='header' height='88px'>Header</el-header>
			<el-container>
				<el-aside width="200px">
					<el-row class="tac">
						<el-col>
							<el-menu router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
								<el-submenu index="1">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>导航一</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/router1">选项1</el-menu-item>
										<el-menu-item index="/router2">选项2</el-menu-item>
										<el-menu-item index="/router3">选项3</el-menu-item>
										<el-menu-item index="/router4">选项4</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-menu-item index="2">
									<i class="el-icon-menu"></i>
									<span slot="title">导航二</span>
								</el-menu-item>
								<el-menu-item index="3">
									<i class="el-icon-document"></i>
									<span slot="title">导航三</span>
								</el-menu-item>
								<el-menu-item index="4">
									<i class="el-icon-setting"></i>
									<span slot="title">导航四</span>
								</el-menu-item>
							</el-menu>
						</el-col>
					</el-row>
				</el-aside>
				<el-container>
					<el-main>
						<router-view></router-view>
					</el-main>
					<el-footer height='44px'>Footer</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<!-- <img alt="Vue logo" src="../assets/logo.png">
			<HelloWorld msg="Welcome to Your Vue.js App" /> -->
	</div>
</template>

<style lang="less" scoped>
	.home,
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
	import axios from 'axios';
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		created() {
			axios.post('/api/tttt').then(res => {
				console.log(res)
			})
		}
	}
</script>

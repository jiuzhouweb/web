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
										<span>收账处理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/router1">客户查询</el-menu-item>
										<el-menu-item index="/router2">发票录入</el-menu-item>
										<el-menu-item index="/router3">情况统计</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="2">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>税务处理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/router1">发票录入</el-menu-item>
										<el-menu-item index="/router2">审核</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-menu-item index="/router1">
									<i class="el-icon-menu"></i>
									<span slot="title">税款通知</span>
								</el-menu-item>
								<el-menu-item index="/router2">
									<i class="el-icon-menu"></i>
									<span slot="title">申报处理</span>
								</el-menu-item>
								<el-submenu index="5">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>历史查询</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/router1">做账进度查询</el-menu-item>
										<el-menu-item index="/router2">统计查询</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
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

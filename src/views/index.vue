<template>
	<div class='home'>
		<el-container>
			<el-header class='header' height='88px'>
				<h1 class='left'>财务系统</h1>
				<div class='pr20 mt34 right'>
					<i class="el-icon-bell"></i>
					<i class="el-icon-message"></i>
					<el-dropdown>
						<i class="el-icon-user"></i>
						<!-- <span class="el-dropdown-link">
							下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
						</span> -->
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>{{userName}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					
					<i class="el-icon-setting"></i>
				</div>
			</el-header>
			<el-container>
				<el-aside width="220px">
					<el-row class="tac">
						<el-col>
							<el-menu router :unique-opened="true" :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
							 @close="handleClose">
								<el-submenu index="1">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>收账处理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/index/customer">客户查询</el-menu-item>
										<el-menu-item index="/index/invoice_o">发票录入</el-menu-item>
										<el-menu-item index="/index/analysis">情况统计</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="2">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>税务处理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/index/invoice_t">发票录入</el-menu-item>
										<el-menu-item index="/index/audit">审核</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-menu-item index="/index/notice">
									<i class="el-icon-menu"></i>
									<span slot="title">税款通知</span>
								</el-menu-item>
								<el-menu-item index="/index/declare">
									<i class="el-icon-menu"></i>
									<span slot="title">申报处理</span>
								</el-menu-item>
								<el-submenu index="5">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>历史查询</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/index/progress">做账进度查询</el-menu-item>
										<el-menu-item index="/index/statistics">统计查询</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="6">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>系统配置</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/index/formula">税务公式配置</el-menu-item>
										<el-menu-item index="/index/template">发票模版配置</el-menu-item>
										<el-menu-item index="/index/rate">税率配置</el-menu-item>
										<el-menu-item index="/index/dictionary">字典表配置</el-menu-item>
										<el-menu-item index="/index/taxnotice">税款通知配置</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-menu-item index="/index/incomeTaxCalculate">
									<i class="el-icon-menu"></i>
									<span slot="title">个税计算</span>
								</el-menu-item>
								<el-menu-item index="/index/initialSheet">
									<i class="el-icon-menu"></i>
									<span slot="title">初始导入</span>
								</el-menu-item>
								<el-menu-item index="/index/paySheet">
									<i class="el-icon-menu"></i>
									<span slot="title">工资表导入</span>
								</el-menu-item>

								<el-menu-item index="/index/reportForms">
									<i class="el-icon-menu"></i>
									<span slot="title">报表查看</span>
								</el-menu-item>
								<el-menu-item index="/index/payEdit">
									<i class="el-icon-menu"></i>
									<span slot="title">工资表变更</span>
								</el-menu-item>
							</el-menu>
						</el-col>
					</el-row>
				</el-aside>
				<el-container>
					<el-main>
						<router-view></router-view>
					</el-main>
					<el-footer height='44px'>
						技术支持：南京九洲会计咨询有限公司
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<!-- <img alt="Vue logo" src="../assets/logo.png">
			<HelloWorld msg="Welcome to Your Vue.js App" /> -->
	</div>
</template>

<style lang="less" scoped>
	@bgcolor: #e9ebf5;
	@hcolor: #707070;

	.home,
	.el-container {
		height: 100%;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		// text-align: center;
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
		padding: 0px;
	}

	.el-header {
		background-color: #fff;
		padding: 0px;

		i {
			font-size: 20px;
			margin-left: 10px
		}

	}

	.el-footer {
		line-height: 44px;
		background-color: #fff;
		text-align: center
	}

	h1 {
		height: 100%;
		line-height: 88px;
		width: 134px;
		background: url("../assets/img/logo.png") @bgcolor no-repeat 24px center;
		font-size: 26px;
		color: @hcolor;
		padding-left: 86px;
	}

	//
</style>
<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				userName:'15651965271'
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			queryUser(){
				this.axios.get('/perTaxToolTwo/api/user/getLoginUserInfo.do')
					.then(res => {
						if (res.data.code == 200) {
							this.userName =  res.data.user.phone;
							this.$store.commit('updateUser',res.data.user);
							console.log(res.data);
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
				
					}).catch(function(err) {
						this.$message({
							message: '删除失败',
							type: 'error'
						});
					})
			}
		},
		created() {
			// this.queryUser()
		}
	}
</script>

<template>
	<div class='home'>
		<el-container>
			<el-header class='header' height='0.88rem'>
				<h1 class='left'>财务系统</h1>
				<div class='pr20 mt34 right'>
					<i class="el-icon-bell"></i>
					<i class="el-icon-message"></i>
					<el-dropdown @command="handleCommand">
						<i class="el-icon-user"></i>
						<!-- <span class="el-dropdown-link">
							下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
						</span> -->
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>{{userName}}</el-dropdown-item>
							<el-dropdown-item command='logout'>退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

					<i class="el-icon-setting"></i>
				</div>
			</el-header>
			<el-container>
				<el-aside width="2.2rem">
					<el-row class="tac">
						<el-col>
							<el-menu v-if='menu.indexOf("易点个税") >= 0' router :unique-opened="true" :default-active="$route.path" class="el-menu-vertical-demo"
							 @open="handleOpen" @close="handleClose">
								<!-- <el-menu router :unique-opened="true" :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
							  @close="handleClose"> -->
								<el-submenu index="1">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>工资表</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/index/incomeTaxCalculate">个税计算</el-menu-item>
										<el-menu-item index="/index/initialSheet">初始导入</el-menu-item>
										<el-menu-item index="/index/paySheet">工资表导入</el-menu-item>
										<!-- <el-menu-item index="/index/reportForms">报表查看</el-menu-item> -->
										<el-menu-item index="/index/payEdit">工资表变更</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<!-- <el-menu-item index="/index/incomeTaxCalculate">
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
								</el-menu-item> -->
							</el-menu>
							<el-menu v-if='menu.indexOf("税务平台") >= 0' router :unique-opened="true" :default-active="$route.path" class="el-menu-vertical-demo"
							 @open="handleOpen" @close="handleClose">
							<!-- <el-menu router :unique-opened="true" :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
							 @close="handleClose"> -->
								<el-submenu index="1">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>收账</span>
									</template>
									<el-menu-item-group>
										<!-- <el-menu-item index="/index/customer">客户查询</el-menu-item> -->
										<el-menu-item index="/index/invoice_o">发票录入</el-menu-item>
										<!-- <el-menu-item index="/index/analysis">情况统计</el-menu-item> -->
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="2">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>税务处理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/index/invoice_t">会计做账</el-menu-item>
										<el-menu-item index="/index/audit">税款审核</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<!-- <el-menu-item index="/index/notice">
									<i class="el-icon-menu"></i>
									<span slot="title">税款通知</span>
								</el-menu-item> -->
								<!-- <el-menu-item index="/index/declare">
									<i class="el-icon-menu"></i>
									<span slot="title">申报处理</span>
								</el-menu-item> -->
								<el-submenu index="4">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>申报处理</span>
									</template>
									<el-submenu index="4-1">
										<template slot="title">查看报表</template>
										<el-menu-item index="/index/reportForms">工资表报表</el-menu-item>
										<el-menu-item index="/index/showReport">税务报表</el-menu-item>
									</el-submenu>
								</el-submenu>
								<!-- <el-menu-item-group>
									<el-menu-item index="/index/showReport">查看报表</el-menu-item>
								</el-menu-item-group> -->
								</el-submenu>
								<el-submenu index="5">
									<template slot="title">
										<i class="el-icon-location"></i>
										<span>历史查询</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="/index/progress">历史操作记录</el-menu-item>
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
										<el-menu-item index="/index/taxnotice">人员角色分配</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
							</el-menu>
							
						</el-col>
					</el-row>
				</el-aside>
				<el-container>
					<el-main>
						<keep-alive>
							<router-view></router-view>
						</keep-alive>

					</el-main>
					<el-footer height='0.44rem'>
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

	.el-aside {
		background: #fff
	}

	.tac.el-row,
	.el-col,
	.el-menu {
		// height: 100%;
	}

	.el-main {
		padding: 0rem;
	}

	.el-header {
		background-color: #fff;
		padding: 0rem;

		i {
			font-size: 0.20rem;
			margin-left: 0.10rem
		}

	}

	.el-footer {
		line-height: 0.44rem;
		background-color: #fff;
		text-align: center
	}

	h1 {
		height: 100%;
		line-height: 0.88rem;
		width: 1.34rem;
		background: url("../assets/img/logo.png") @bgcolor no-repeat 0.24rem center;
		font-size: 0.26rem;
		color: @hcolor;
		padding-left: 0.86rem;
	}

	/*滚动条样式*/
	::-webkit-scrollbar {
		width: 0.04rem;
		height: 0.04rem;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 0.10rem;
		-webkit-box-shadow: inset 0 0 0.05rem rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 0.05rem rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);

	}

	//
</style>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				userName: '15651965271',
				userId: "",
				menu: []
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			queryUser() {
				this.axios.get('/perTaxToolTwo/api/user/getLoginUserInfo.do')
					.then(res => {
						if (res.data.code == 200) {
							this.userName = res.data.user.phone;
							this.userId = res.data.user.operatorId;
							this.menuList = res.data.user.menuList;
							this.menuList.forEach((item, index) => {
								this.menu.push(item.productName);
								if(index==0){
									localStorage.setItem('index',item.productName);
								}
								
							})
							this.$store.commit('updateUser', res.data.user);
							this.axios.get('/perTaxToolTwo/api/user/getCustList.do?userId=' + this.userId)
								.then(res => {
									if (res.data.code == 200) {
										this.$store.commit('updateCust', res.data.data);
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error'
										});
									}

								}).catch(function(err) {
									this.$message({
										message: '获取客户信息失败',
										type: 'error'
									});
								})
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '获取用户信息失败',
							type: 'error'
						});
					})
			},
			handleCommand(command) {
				if (command == 'logout') {
					this.axios.post('/perTaxToolTwo/api/user/logout.do')
						.then(res => {
							// if (res.data == 1) {
							// 	
							this.clearCookie();
							window.location = res.data;
							// console.log(document.cookie);
							// document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
							// console.log(document.cookie);
							// window.location.reload()
							// }

						}).catch(function(err) {
							// this.$message({
							// 	message: '获取客户信息失败',
							// 	type: 'error'
							// });
						})
				}
			},
			clearCookie() {
				var date = new Date();
				date.setTime(date.getTime() - 10000);
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if (keys) {
					for (var i = keys.length; i--;)
						document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
				}
			},

			//删除cookie
			delCookie(name) {
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = common.getCookie(name);
				if (cval != null)
					document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
			},
		},
		created() {
			this.queryUser()
		}
	}
</script>

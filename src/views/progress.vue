<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<div class='title'>历史操作记录</div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
					<el-form-item label="客户名称:">
						<el-select v-model='formInline.customId'>
							<el-option v-for='item in $store.state.cust' :label="item.customerName" :value="item.customerId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="账期:">
						<el-date-picker v-model="formInline.period" type="month" placeholder="选择月" clearable value-format='yyyy-MM'>
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button @click='search'>查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="contain_body clearfix">
				<div class="contain_body_div left clearfix" v-for='(item,index) in historyList'>
					<i></i>
					<p v-show='index != historyList.length - 1'><span class='circle' v-for='item in 10'></span></p>
					<div style='position: absolute;top: 0.5rem;'>
						<h5>{{item.stepName}}</h5>
						<p>{{item.startTime}}开始</p>
						<p>{{item.endTime}}结束</p>
						<p>执行人:{{item.executeUserName}}</p>
						<p>备注:{{item.remark}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "router1",
		data() {
			return {
				message: "12334456",
				formInline: {
					customId: '',
					period: ''
				},
				historyList: []
			}
		},
		components: {},
		methods: {
			search() {
				let params = this.formInline;
				this.axios.post('/perTaxToolTwo/e9z/historyQuery/selectHistory', this.qs.stringify(params), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.historyList = res.data.data
					} else {
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}

				}).catch(function(err) {
					this.$message({
						message: '获取历史失败',
						type: 'error'
					});
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.main_contain {
		width: 100%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;

		.left_contain {
			height: 100%
		}
	}

	.contain_header {
		height: 2rem;
		padding: 0px 30px;
		background: url(../assets/img/list-bg1.png) no-repeat;
		background-size: cover;
		border-top-left-radius: 0.06rem;
		border-top-right-radius: 0.06rem;

		.title {
			font-size: 0.24rem;
			height: 1rem;
			line-height: 1.24rem;
			color: #fff;
		}

		/deep/ .el-form-item--mini .el-form-item__label {
			color: #fff;
		}

		/deep/ .el-form {
			margin-top: 0.1rem
		}
	}

	.contain_body {
		height: calc(100% - 2rem);
		box-sizing: border-box;
		padding: 0.2rem 0.2rem;
		background: #fff;

		.contain_body_div {
			align-items: center;
			display: flex;
			position: relative;

			i {
				background: pink;
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				border-radius: 0.2rem;
			}

			.circle {
				display: inline-block;
				width: 0.1rem;
				height: 0.1rem;
				border-radius: 0.05rem;
				background-color: #c9c9c9;
				margin-right: 0.06rem
			}
		}
	}
</style>

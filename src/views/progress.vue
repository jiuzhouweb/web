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
				// historyList: [],
				historyList: [{
					"stepId": 3,
					"deloyId": null,
					"deloyTaskId": null,
					"taxInfoId": "1",
					"taxationId": "2",
					"stepName": "做账",
					"assignTime": "2019-06-25 11:48:37",
					"startTime": "2019-06-25 11:48:37",
					"endTime": "2019-06-25 12:09:01",
					"executeUserId": "1000000046",
					"executeUserName": "system",
					"executeStatus": "2",
					"remark": null,
					"taxStatus": null,
					"completed": 0,
					"incomplete": 0,
					"total": 0,
					"period": null
				}, {
					"stepId": 2,
					"deloyId": null,
					"deloyTaskId": null,
					"taxInfoId": "1",
					"taxationId": "1",
					"stepName": "发票录入",
					"assignTime": "2019-06-25 11:48:37",
					"startTime": "2019-06-25 11:48:37",
					"endTime": "2019-06-25 11:48:37",
					"executeUserId": "1000000046",
					"executeUserName": "system",
					"executeStatus": "2",
					"remark": null,
					"taxStatus": null,
					"completed": 0,
					"incomplete": 0,
					"total": 0,
					"period": null
				}, {
					"stepId": 4,
					"deloyId": null,
					"deloyTaskId": null,
					"taxInfoId": "1",
					"taxationId": "2",
					"stepName": "大额审核",
					"assignTime": "2019-06-25 12:09:08",
					"startTime": "2019-06-25 12:09:08",
					"endTime": "2019-06-25 12:10:41",
					"executeUserId": "1000000046",
					"executeUserName": "system",
					"executeStatus": "1",
					"remark": null,
					"taxStatus": null,
					"completed": 0,
					"incomplete": 0,
					"total": 0,
					"period": null
				}, {
					"stepId": 6,
					"deloyId": null,
					"deloyTaskId": null,
					"taxInfoId": "1",
					"taxationId": "3",
					"stepName": "税款审核",
					"assignTime": "2019-06-26 03:45:43",
					"startTime": "2019-06-26 03:45:46",
					"endTime": "2019-06-26 04:45:49",
					"executeUserId": "1000000046",
					"executeUserName": "system",
					"executeStatus": "1",
					"remark": null,
					"taxStatus": null,
					"completed": 0,
					"incomplete": 0,
					"total": 0,
					"period": null
				}, {
					"stepId": 7,
					"deloyId": null,
					"deloyTaskId": null,
					"taxInfoId": "1",
					"taxationId": "4",
					"stepName": "申报",
					"assignTime": "2019-06-26 03:46:13",
					"startTime": "2019-06-26 03:46:15",
					"endTime": "2019-06-26 04:46:17",
					"executeUserId": "1000000046",
					"executeUserName": "system",
					"executeStatus": "2",
					"remark": null,
					"taxStatus": null,
					"completed": 0,
					"incomplete": 0,
					"total": 0,
					"period": null
				}]
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

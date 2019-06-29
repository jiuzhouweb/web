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
					<div v-show='index ==0' class="date1">{{item.startTime?item.startTime.split(" ")[0]:''}}</div>
					<img v-show='index ==1' src="../assets/img/notice.png" alt="">
					<img v-show='index ==2' src="../assets/img/users.png" alt="">
					<img v-show='index ==3' src="../assets/img/pay.png" alt="">
					<img v-show='index ==4' src="../assets/img/money.png" alt="">
					<p v-show='index != historyList.length - 1' style="margin-left:0.05rem">
						<span class='circle' v-for='item in 10'></span>
					</p>
					<!-- :class="{ 'class-a': isA, 'class-b': isB}" -->
					<div class="contentBox" :class="{ 'contentBoxBorder1': index==0, 'contentBoxBorder2': index==1, 'contentBoxBorder3': index==2, 'contentBoxBorder4': index==3, 'contentBoxBorder5': index==4}">
						<div id="triangle-top" :class="{ 'trianglecolor1': index==0, 'trianglecolor2': index==1, 'trianglecolor3': index==2, 'trianglecolor4': index==3, 'trianglecolor5': index==4}"></div>
						<h5 style="font-size:0.14rem" :class="{ 'step1color': index==0, 'step2color': index==1, 'step3color': index==2, 'step4color': index==3, 'step5color': index==4}">{{item.stepName}}</h5>
						<p>{{item.startTime?item.startTime.split(" ")[0]:''}}开始</p>
						<p>{{item.endTime?item.endTime.split(" ")[0]:''}}结束</p>
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
				historyList: [],
				// historyList: [{
				// 	"stepId": 3,
				// 	"deloyId": null,
				// 	"deloyTaskId": null,
				// 	"taxInfoId": "1",
				// 	"taxationId": "2",
				// 	"stepName": "做账",
				// 	"assignTime": "2019-06-25 11:48:37",
				// 	"startTime": "2019-06-25 11:48:37",
				// 	"endTime": "2019-06-25 12:09:01",
				// 	"executeUserId": "1000000046",
				// 	"executeUserName": "system",
				// 	"executeStatus": "2",
				// 	"remark": null,
				// 	"taxStatus": null,
				// 	"completed": 0,
				// 	"incomplete": 0,
				// 	"total": 0,
				// 	"period": null
				// }, {
				// 	"stepId": 2,
				// 	"deloyId": null,
				// 	"deloyTaskId": null,
				// 	"taxInfoId": "1",
				// 	"taxationId": "1",
				// 	"stepName": "发票录入",
				// 	"assignTime": "2019-06-25 11:48:37",
				// 	"startTime": "2019-06-25 11:48:37",
				// 	"endTime": "2019-06-25 11:48:37",
				// 	"executeUserId": "1000000046",
				// 	"executeUserName": "system",
				// 	"executeStatus": "2",
				// 	"remark": null,
				// 	"taxStatus": null,
				// 	"completed": 0,
				// 	"incomplete": 0,
				// 	"total": 0,
				// 	"period": null
				// }, {
				// 	"stepId": 4,
				// 	"deloyId": null,
				// 	"deloyTaskId": null,
				// 	"taxInfoId": "1",
				// 	"taxationId": "2",
				// 	"stepName": "大额审核",
				// 	"assignTime": "2019-06-25 12:09:08",
				// 	"startTime": "2019-06-25 12:09:08",
				// 	"endTime": "2019-06-25 12:10:41",
				// 	"executeUserId": "1000000046",
				// 	"executeUserName": "system",
				// 	"executeStatus": "1",
				// 	"remark": null,
				// 	"taxStatus": null,
				// 	"completed": 0,
				// 	"incomplete": 0,
				// 	"total": 0,
				// 	"period": null
				// }, {
				// 	"stepId": 6,
				// 	"deloyId": null,
				// 	"deloyTaskId": null,
				// 	"taxInfoId": "1",
				// 	"taxationId": "3",
				// 	"stepName": "税款审核",
				// 	"assignTime": "2019-06-26 03:45:43",
				// 	"startTime": "2019-06-26 03:45:46",
				// 	"endTime": "2019-06-26 04:45:49",
				// 	"executeUserId": "1000000046",
				// 	"executeUserName": "system",
				// 	"executeStatus": "1",
				// 	"remark": null,
				// 	"taxStatus": null,
				// 	"completed": 0,
				// 	"incomplete": 0,
				// 	"total": 0,
				// 	"period": null
				// }, {
				// 	"stepId": 7,
				// 	"deloyId": null,
				// 	"deloyTaskId": null,
				// 	"taxInfoId": "1",
				// 	"taxationId": "4",
				// 	"stepName": "申报",
				// 	"assignTime": "2019-06-26 03:46:13",
				// 	"startTime": "2019-06-26 03:46:15",
				// 	"endTime": "2019-06-26 04:46:17",
				// 	"executeUserId": "1000000046",
				// 	"executeUserName": "system",
				// 	"executeStatus": "2",
				// 	"remark": null,
				// 	"taxStatus": null,
				// 	"completed": 0,
				// 	"incomplete": 0,
				// 	"total": 0,
				// 	"period": null
				// }]
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

			img {
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
			}

			.circle {
				display: inline-block;
				width: 0.08rem;
				height: 0.08rem;
				border-radius: 50%;
				background-color: #c9c9c9;
				margin-right: 0.08rem
			}
			.date1{
				height: 0.4rem;
				line-height: 0.4rem;
				background: #ed878e;
				color: #fff;
				border-radius: 0.05rem;
				padding: 0 0.1rem;
				font-size: 0.16rem;
			}
			
		}
		.contentBox{
			position: absolute;
			top: 0.7rem;
			padding: 0.05rem 0.1rem;
			border-width:  0.02rem;
			border-style: solid;
			border-radius: 0.1rem;
			width: 1.4rem;

			#triangle-top{
				width: 0;
				height: 0;
				border-right: 0.1rem solid transparent;
				border-left: 0.1rem solid transparent;
				position: absolute;
				top: -0.2rem;
			}
			p{
				color: #666;
			}
		}
		.step1color{
			color: #ed878e
		}
		.contentBoxBorder1{
			border-color: #ed878e;
		}
		.trianglecolor1{
			border-bottom: 0.2rem solid #ed878e;
		}
		.step2color{
			color: #7dc36d
		}
		.contentBoxBorder2{
			border-color: #7dc36d;
		}
		.trianglecolor2{
			border-bottom: 0.2rem solid #7dc36d;
		}
		.step3color{
			color: #43b3db
		}
		.contentBoxBorder3{
			border-color: #43b3db;
		}
		.trianglecolor3{
			border-bottom: 0.2rem solid #43b3db;
		}
		.step4color{
			color: #ffac69
		}
		.contentBoxBorder4{
			border-color: #ffac69;
		}
		.trianglecolor4{
			border-bottom: 0.2rem solid #ffac69;
		}
		.step5color{
			color: #e6a08a
		}
		.contentBoxBorder5{
			border-color: #e6a08a;
		}
		.trianglecolor5{
			border-bottom: 0.2rem solid #e6a08a;
		}
	}
</style>

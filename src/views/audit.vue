<template>
	<div class="main_contain">
		<div class='search_contain'>
			<div class="row1">
				<span class="labelTitle">
					客户名称：
				</span>
				<el-select v-model="searchList.customerId" placeholder="请选择">
					<el-option v-for="item in $store.state.cust" :key="item.customerId" :label="item.customerName" :value="item.customerId">
					</el-option>
				</el-select>
			</div>
			<div class="row2" style="margin-left:0.2rem">
				<span class="labelTitle">
					账期：
				</span>
				<el-date-picker v-model="searchList.period" type="month" placeholder="选择月" value-format="yyyy-MM">
				</el-date-picker>
			</div>
			<div class="searchButton" @click="search()">查询</div>
		</div>
		<div class='body_contain'>
			<div class='card' v-for="item in taxTreatment">
				<div class='card_head'>
					<p>{{item.taxInfoRemark2}}</p>
					<p>{{item.accountPeriod}}</p>
					<p>{{item.stepName}}</p>
					<p>税金：{{item.taxation}}元</p>
				</div>
				<div class='card_body'>
					<p>责任会计：{{item.processUserName}}</p>
					<p>工号：{{item.processUserId}}</p>
					<p>税务类型：ccc</p>
				</div>
				<div class='card_btn'>
					<el-button v-if='!item.taxationIdList || item.taxationIdList.length == 0'>审核通过</el-button>

					<el-button @click='showDialog(item.taxationIdList[0])' v-if='item.taxationIdList && item.taxationIdList.length > 0'>比较（工资差异{{item.taxationIdList.length}}条）</el-button>
				</div>
			</div>
			<div class='card' v-for="item in bigTaxTreatment">
				<div class='card_head'>
					<p>{{item.taxInfoRemark2}}</p>
					<p>{{item.accountPeriod}}</p>
					<p>{{item.stepName}}</p>
					<p>税金：{{item.taxation}}元</p>
				</div>
				<div class='card_body'>
					<p>责任会计：{{item.processUserName}}</p>
					<p>工号：{{item.processUserId}}</p>
					<p>税务类型：ccc</p>
				</div>
				<div class='card_btn'>
					<el-button @click="submitCard(item,0,'做账')">发回重做</el-button>
					<el-button @click="submitCard(item,1,'申报')">审核通过</el-button>
				</div>
			</div>
		</div>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="4rem">
			<div>客户名称</div>
			<div>发票类型</div>
			<div>发票名称</div>
			<div>账期</div>
			<div>申报纳税种类</div>
			<div>增值税率</div>
			<div>印花税率</div>
			<div>城市维护建设税税率</div>
			<div>教育费附加税率</div>
			<div>地方教育费附加税率</div>
			<div class='left' style='width: 50%;'>

			</div>
			<div class='right' style='width: 50%;'>

			</div>
			<div class='btn_contain clearfix'>
				<span class='commit' @click='commitDialog'>完成</span>
				<span class='close' @click="hideDialog">关闭</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "router1",
		data() {
			return {
				message: "12334456",
				searchList: {
					customerId: "",
					period: ""
				},
				bigTaxTreatment: [],
				taxTreatment: [],
				dialogVisible: false,
				fplrList:{},
				zzList:{}
			}
		},
		methods: {
			search() {
				this.queryTaxTreatment();
				this.queryBigTaxTreatment();
			},
			queryTaxTreatment() {
				let params = this.searchList;
				this.axios.post('/perTaxToolTwo/e9z/taxTreatment/selectTaxTreatment', this.qs.stringify(params), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.taxTreatment = res.data.data;

					} else {
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}

				}).catch(function(err) {
					this.$message({
						message: '获取税款审核数据失败',
						type: 'error'
					});
				})
			},
			queryBigTaxTreatment() {
				let params = this.searchList;
				this.axios.post('/perTaxToolTwo/e9z/taxTreatment/selectBigTaxTreatment', this.qs.stringify(params), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.bigTaxTreatment = res.data.data;

					} else {
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}

				}).catch(function(err) {
					this.$message({
						message: '获取税款审核数据失败',
						type: 'error'
					});
				})
			},
			submitCard(row, status, nextStepName) {
				let params = {
					"taxationId": "3", //税款Id
					"taxInfoId": row.taxInfoId, //收账信息id
					"stepName": row.stepName, //步骤名称
					"nextStepName": nextStepName, //下一个步骤名称
					"state": status
				}
				this.axios.post('/perTaxToolTwo/e9z/taxStep/submit', params).then(res => {
					if (res.data.code == 200) {
						this.queryTaxTreatment();
						this.queryBigTaxTreatment();

					} else {
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}

				}).catch(function(err) {
					this.$message({
						message: '获取税款审核数据失败',
						type: 'error'
					});
				})
			},
			showDialog(item) {
				this.dialogVisible = true;
				let params = {
					"fplrTaxationId": item.fplr,

					"zzTaxationId": item.zz,

				}
				this.axios.post('/perTaxToolTwo/e9z/taxTreatment/selectInvoiceCompare', params).then(res => {
					if (res.data.code == 200) {
						this.fplrList = res.data.data[0].fplr;
						this.zzList = res.data.data[0].zz;

					} else {
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}

				}).catch(function(err) {
					this.$message({
						message: '获取比对数据失败',
						type: 'error'
					});
				})
			},
			commitDialog() {

			},
			hideDialog() {
				this.dialogVisible = false;
			}
		},
		components: {},
		created() {

		}
	}
</script>

<style scoped lang="less">
	.main_contain {
		height: 100%;
		margin: 20px;
	}

	div.search_contain {
		/* width: 1180rem; */
		/* height: 78rem; */
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		/* justify-content: space-between; */
		border-top-left-radius: 0.05rem;
		border-top-right-radius: 0.05rem;
		background: #fff;
		padding: 0.20rem 0.20rem;
	}

	div.body_contain {
		margin-top: .2rem;

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: start;

		.card {
			width: calc((100% - 0.8rem) / 5);
			margin-right: .2rem;
			background: #fff;
			height: 4.85rem;

			.card_head {
				height: 2rem;
				box-sizing: border-box;
				padding-left: 0.2rem;
				color: #fff;
				padding-top: 0.3rem;
				background: url(../assets/img/list-bg1.png) no-repeat;

				p:nth-of-type(1) {
					font-size: 0.18rem;
					height: 0.36rem;
					line-height: 0.36rem;
				}

				p:nth-of-type(2) {
					font-size: 0.12rem;
					height: 0.3rem;
					line-height: 0.3rem;
				}

				p:nth-of-type(3) {
					font-size: 0.16rem;
					height: 0.34rem;
					line-height: 0.34rem;
				}

				p:nth-of-type(4) {
					font-size: 0.16rem;
					height: 0.38rem;
					line-height: 0.38rem;
				}
			}

			.card_body {
				margin: 0.2rem 0;

				p {
					height: 0.3rem;
					line-height: 0.3rem;
					font-size: 0.14rem;
					padding-left: 0.2rem;
					color: #666
				}

				p:nth-of-type(1) {}

				p:nth-of-type(2) {}

				p:nth-of-type(3) {}
			}
		}

		.card:nth-of-type(5n) {
			margin-right: 0rem;
		}
	}

	.searchButton {
		background: #ffb980;
		color: #fff;
		border-radius: 0.05rem;
		cursor: pointer;
		padding: 0.07rem 0.35rem;
		margin-left: 0.2rem
	}
</style>

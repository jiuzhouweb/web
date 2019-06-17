<template>
	<div class='main clearfix'>
		<div>
			<el-page-header @back="goBack" content="企业员工信息详情">
			</el-page-header>
		</div>
		<div class='search_contain'>

			<div>
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="姓名">
						<el-input placeholder="请输入姓名" v-model="input" clearable></el-input>
					</el-form-item>
					<el-button type="primary" icon="el-icon-search" @click='setName'>搜索</el-button>
				</el-form>
			</div>
		</div>
		<div class='main_contain'>
			<el-button class='muldel' type="danger" size='mini' icon="el-icon-delete" :disabled="canDel" @click='showDelDialog'>批量删除</el-button>
			<el-table :data="employeeList" stripe style="width: 100%" @selection-change="handleSelectionChange">>
				
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="本期基本养老保险费">
								<span>{{ props.row.pensionInsurance }}</span>
							</el-form-item>
							<el-form-item label="本期基本医疗保险费">
								<span>{{ props.row.medicalInsurance }}</span>
							</el-form-item>
							<el-form-item label="本期失业保险费">
								<span>{{ props.row.unemploymentInsurance }}</span>
							</el-form-item>
							<el-form-item label="本期住房公积金">
								<span>{{ props.row.housingFund }}</span>
							</el-form-item>
							<el-form-item label="本期企业(职业)年金">
								<span>{{ props.row.companyAnnuity }}</span>
							</el-form-item>
							<el-form-item label="本期商业健康保险费">
								<span>{{ props.row.healthInsurance }}</span>
							</el-form-item>
							<el-form-item label="本期税延养老保险费">
								<span>{{ props.row.pension }}</span>
							</el-form-item>
							<el-form-item label="本期其他扣除(其他)">
								<span>{{ props.row.preTaxDeduction }}</span>
							</el-form-item>
							<el-form-item label="累计收入额">
								<span>{{ props.row.incomeAmountTotal }}</span>
							</el-form-item>
							<el-form-item label="累计减除费用">
								<span>{{ props.row.deductFeeTotal }}</span>
							</el-form-item>
							<el-form-item label="累计专项扣除">
								<span>{{ props.row.refDeductSumTotal }}</span>
							</el-form-item>
							<el-form-item label="累计子女教育支出扣除">
								<span>{{ props.row.childEducationTotal }}</span>
							</el-form-item>
							<el-form-item label="累计赡养老人支出扣除">
								<span>{{ props.row.elderlyTotal }}</span>
							</el-form-item>
							<el-form-item label="累计继续教育支出扣除">
								<span>{{ props.row.continuingEducationTotal }}</span>
							</el-form-item>
							<el-form-item label="累计住房贷款利息支出扣除">
								<span>{{ props.row.homeLoanTotal }}</span>
							</el-form-item>
							<el-form-item label="累计住房租金支出扣除">
								<span>{{ props.row.housingRentTotal }}</span>
							</el-form-item>
							<el-form-item label="累计其他扣除">
								<span>{{ props.row.preTaxDeductionTotal }}</span>
							</el-form-item>
							<el-form-item label="累计准予扣除的捐赠">
								<span>{{ props.row.deductedDonationTotal }}</span>
							</el-form-item>
							<el-form-item label="累计应纳税所得额">
								<span>{{ props.row.taxableIncomeTotal }}</span>
							</el-form-item>
							<el-form-item label="税率%">
								<span>{{ props.row.rateTotal }}</span>
							</el-form-item>
							<el-form-item label="累计应纳税额">
								<span>{{ props.row.payableTaxTotal }}</span>
							</el-form-item>
							<el-form-item label="累计减免税额">
								<span>{{ props.row.deductTaxTotal }}</span>
							</el-form-item>
							<el-form-item label="累计应扣缴税额">
								<span>{{ props.row.preWithholdTaxTotal }}</span>
							</el-form-item>
							<el-form-item label="累计已预缴税额">
								<span>{{ props.row.sumWithholdTaxTotal }}</span>
							</el-form-item>
							<el-form-item label="累计应补(退)税额">
								<span>{{ props.row.taxationTotal }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="employeeName" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="cardType" label="证件类型">
				</el-table-column>
				<el-table-column prop="cardNum" label="证件号码">
				</el-table-column>
				<el-table-column prop="taxPeriodBegin" label="税款所属期起">
				</el-table-column>
				<el-table-column prop="taxPeriodEnd" label="税款所属期止">
				</el-table-column>
				<el-table-column prop="projectCode" label="所得项目">
				</el-table-column>
				<el-table-column prop="incomeAmount" label="本期收入">
				</el-table-column>
				<el-table-column prop="taxFreeIncome" label="本期免税收入">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
						<el-button type="text" size="small">编辑</el-button>
						<el-button type="text" size="small" @click='del(scope.row)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="total,prev, pager, next, jumper" :total="total" :page-size=10 @current-change='handleCurrentChange'
			 :current-page="currentPage">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	// import {
	// 	setCookie
	// } from './../utils/cookie.js'
	// import {
	// 	getCookie
	// // } from './../utils/cookie.js'
	// import axios from './../utils/http.js'
	export default {
		name: "incomeTaxCalculate",
		data() {
			return {
				employeeList: [],
				currentPage: 1,
				total: 0,
				formInline: {

				},
				input: '',
				name: '',
				canDel:true,
				multipleSelection:[]
			}
		},
		components: {},
		methods: {
			queryEmployeePage() {
				let params = {
					"page": 1,
					"row": 10,
					"data": {
						"name": this.name,
						"operateId": this.$route.query.operateId
					}
				};
				this.axios.post('/miaoxing/queryEmployeePage', params)
					.then(res => {
						if (res.data.code == 200) {
							this.employeeList = res.data.data;
							this.length = this.employeeList.length;
							this.total = res.data.count;
							// for (let i = 0; i < this.pageSize - this.length; i++) {
							// 	this.tableData.push({});
							// }
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '获取税种公式列表失败',
							type: 'error'
						});
					})
			},
			del(row) {
				this.$confirm('确定删除此条记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = [row];
					this.axios.post('/miaoxing/deleteCompanyEmployee', params)
						.then(res => {
							if (res.data.code == 200) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
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
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			showDelDialog(){
				this.$confirm('确定删除选中的记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = this.multipleSelection;
					this.axios.post('/miaoxing/deleteCompanyEmployee', params)
						.then(res => {
							if (res.data.code == 200) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
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
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleCurrentChange() {

			},
			setName() {
				this.name = this.input;
			},
			goBack() {
				this.$router.push({
					name: "initialSheet"
				})
			},
			handleSelectionChange(val){
				 this.multipleSelection = val;
			}
		},
		computed: {},
		watch:{
			multipleSelection(val){
				if(val.length == 0){
					this.canDel = true
				}else{
					this.canDel = false
				}
			}
		},
		created() {
			this.queryEmployeePage();
		}
	}
</script>

<style lang='less' scoped>
	.main {
		/* background: #fff; */
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		/deep/ .el-table__header tr,
		.el-table__header th {
			padding: 0;
			height: 40px;
		}

		/deep/ .el-table__body tr,
		.el-table__body td {
			padding: 0;
			height: 40px;
		}

		/deep/ .el-table td {
			padding: 6px 0;
		}

		.el-page-header {
			height: 40px;
			line-height: 40px;
			background-color: #fff;
			margin-bottom: 20px;
			padding-left: 20px;
			border-top: 1px solid #F2F6FC;
			box-sizing: border-box;
		}

		.search_contain {
			background: #fff;
			height: 100px;
			box-sizing: border-box;
			padding-left: 20px;
			margin-left: 20px;
			margin-right: 20px;
			padding-top: 30px;

			.info {
				height: 40px;
				line-height: 40px;
			}

			a {
				margin-left: 10px;
			}
		}

		.main_contain {
			background: #fff;
			margin-top: 20px;
			padding: 20px;
			margin-left: 20px;
			margin-right: 20px;
			height: calc(100% - 240px);
			overflow-y: scroll;

			h5 {
				height: 40px;
				line-height: 40px;
			}
			.el-button.muldel{
				/* float: right */
				margin-bottom: 10px;
			}
			/deep/ .demo-table-expand {
				font-size: 0;
			}
			
			/deep/ .demo-table-expand label {
				color: #99a9bf;
				padding-left: 120px;
			}
			
			/deep/ .demo-table-expand .el-form-item {
				margin-right: 0;
				margin-bottom: 0;
				width: 50%;
			}
		}

		/deep/ .el-pagination {
			text-align: right;
			margin-top: 10px;
		}

		
	}

	/*滚动条样式*/
	::-webkit-scrollbar {
		width: 4px;
		/*height: 4px;*/
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);

	}
</style>

<template>
	<div class="reportForms">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>报表查看</el-breadcrumb-item>
		</el-breadcrumb>
		<div class='search'>
			<div class="title">报表查看</div>
			<div class='search_contain'>
				<div class="row1">
					<span class="labelTitle">公司：</span>
					<el-select v-model="searchList.value" placeholder="请选择" size="small">
						<el-option v-for="item in $store.state.cust" :key="item.customerId" :label="item.customerName" :value="item.customerId">
						</el-option>
					</el-select>
				</div>
				<div class="row2">
					<span class="labelTitle">账期：</span>
					<el-date-picker v-model="searchList.nowDate" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择月"
					 size="small">
					</el-date-picker>
				</div>
				<div class="row3">
					<span class="labelTitle">状态：</span>
					<el-select v-model="searchList.statusVaule" placeholder="请选择" size="small">
						<el-option v-for="item in searchList.status" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<el-button type="primary" @click="search()" style="margin-left:20px" size="small">查看</el-button>
				<el-button @click="clear()" size="small">重置</el-button>
			</div>
		</div>
		<div class="content">
			<el-button type="primary" icon="el-icon-success" size="small" @click='exportExcel' :disabled="!customerId || !accountPeriod || !statusVaule">一键导出</el-button>
			<div class="tableBox">
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane :label="item.title" :name="item.name" v-for="(item,index) in tableTabs" :key="index">
						<el-table v-loading="loading" :data="item.tableData" style="width: 100%" stripe>
							<el-table-column align="center" type="expand" v-show='item.name==5 || item.name==6'>
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand">
										<!-- <el-form-item label="本期基本养老保险费">
											<span>{{ props.row.pensionInsurance }}</span>
										</el-form-item> -->

										<el-form-item v-if="item.name==1" label="是否残疾">
											<span>{{ props.row.isDiasbility }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="是否烈属">
											<span>{{ props.row.isMartyr }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="是否孤老">
											<span>{{ props.row.isLonely }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="残疾证号">
											<span>{{ props.row.diasbilityNum }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="烈属证号">
											<span>{{ props.row.martyrNum }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="个人投资额">
											<span>{{ props.row.individualInvestment }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="个人投资比例(%)">
											<span>{{ props.row.individualInvestmentRatio }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="备注">
											<span>{{ props.row.remark }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="是否境外人员">
											<span>{{ props.row.isOverseasPerson }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="中文名">
											<span>{{ props.row.chineseName }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="涉税事由">
											<span>{{ props.row.taxRelatedCauses }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="出生国家(地区)">
											<span>{{ props.row.birthCountry }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="首次入境时间">
											<span>{{ props.row.firstEntryCountryDate }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="预计离境时间">
											<span>{{ props.row.estimateDepartureCountryDate }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="其他证照类型">
											<span>{{ props.row.otherCardType }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="其他证照号码">
											<span>{{ props.row.otherCardNum }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="户籍所在地（省）">
											<span>{{ props.row.censusRegisterProvince }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="户籍所在地（市）">
											<span>{{ props.row.censusRegisterCity }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="户籍所在地（区县）">
											<span>{{ props.row.censusRegisterCounty }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="户籍所在地（详细地址）">
											<span>{{ props.row.censusRegisterDetail }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="居住地址（省）">
											<span>{{ props.row.liveAddressProvince }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="居住地址（市）">
											<span>{{ props.row.liveAddressCity }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="居住地址（区县）">
											<span>{{ props.row.liveAddressCounty }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="居住地址（详细地址）">
											<span>{{ props.row.liveAddressDetail }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="联系地址（省）">
											<span>{{ props.row.contactAddressProvince }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="联系地址（市）">
											<span>{{ props.row.contactAddressCity }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="联系地址（区县）">
											<span>{{ props.row.contactAddressCounty }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="联系地址（详细地址）">
											<span>{{ props.row.contactAddressDetail }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="电子邮箱">
											<span>{{ props.row.email }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="学历">
											<span>{{ props.row.education }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="开户银行">
											<span>{{ props.row.bankDeposit }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="银行账号">
											<span>{{ props.row.bankAccount }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==1" label="职务">
											<span>{{ props.row.post }}</span>
										</el-form-item>

										<el-form-item v-if="item.name==2" label="累计子女教育">
											<span>{{ props.row.sumChildEducation }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="累计继续教育">
											<span>{{ props.row.sumContinuingEducation }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="累计住房贷款利息">
											<span>{{ props.row.sumHomeLoan }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="累计住房租金">
											<span>{{ props.row.sumHousingRent }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="累计赡养老人">
											<span>{{ props.row.sumElderly }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="企业(职业)年金">
											<span>{{ props.row.companyAnnuity }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="商业健康保险">
											<span>{{ props.row.healthInsurance }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="税延养老保险">
											<span>{{ props.row.pension }}</span>
										</el-form-item>
										<el-form-item v-if="item.name==2" label="其他">
											<span>{{ props.row.otherFee }}</span>
										</el-form-item>

										<!-- <el-table-column v-if="item.name==2||item.name==5" prop="healthInsurance" label="商业健康保险" width="110">
										</el-table-column>
										<el-table-column v-if="item.name==2||item.name==5" prop="pension" label="税延养老保险" width="110">
										</el-table-column> -->


									</el-form>
								</template>
							</el-table-column>
							<el-table-column align="center" label="序号" type="index" width="50">
							</el-table-column>
							<el-table-column align="center" prop="employeeCode" label="工号">
							</el-table-column>
							<el-table-column align="center" prop="employeeName" label="姓名">
							</el-table-column>
							<el-table-column align="center" prop="cardType" label="证照类型" width="100">
							</el-table-column>
							<el-table-column align="center" prop="cardNum" label="证照号码" width="180">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="areaName" label="国籍(地区)" width="90">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="sex" label="性别">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="birthDate" label="出生日期" width="100">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="employeeStatus" label="人员状态">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="employeeType" label="任职受雇从业类型" width="140">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="phoneNum" label="手机号码">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="employeeDate" label="任职受雇从业日期" width="140">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==1" prop="quitDate" label="离职日期" width="100">
							</el-table-column>

							<el-table-column align="center" v-if="item.name==5||item.name==6" prop="projectCode" label="所得项目">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==2||item.name==4||item.name==5" :prop="item.name==2?'monIncomeAmount':'incomeAmount'"
							 label="本期收入">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==2||item.name==4||item.name==5" :prop="item.name==2?'monTaxFreeIncome':'taxFreeIncome'"
							 label="本期免税收入" width="110">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==2" prop="monPensionInsurance" label="基本养老保险费" width="120">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==2" prop="monMedicalInsurance" label="基本医疗保险费" width="120">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==2" prop="monUnemploymentInsurance" label="失业保险费" width="100">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==2" prop="monHousingFund" label="住房公积金" width="100">
							</el-table-column>

							<el-table-column align="center" v-if="item.name==5" prop="healthInsurance" label="商业健康保险" width="110">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==5" prop="pension" label="税延养老保险" width="110">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==3" prop="incomeAmount" label="全年一次性奖金额">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==6||item.name==7" prop="incomeAmount" label="收入">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==3||item.name==6||item.name==7" prop="taxFreeIncome" label="免税收入">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==4||item.name==7" prop="otherFee" label="其他">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==3" prop="otherIncome" label="其他">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==6||item.name==7" prop="actualDonation" label="实际捐赠额">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==6||item.name==7" prop="donationType" label="捐赠方式">
							</el-table-column>
							<el-table-column align="center" v-if="item.name!=1 && item.name!=2" prop="deductedDonation" label="准予扣除的捐赠额"
							 width="140">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==5" prop="otherFee" label="其他">
							</el-table-column>
							<el-table-column align="center" v-if="item.name!=1 && item.name!=2" prop="deductTax" label="减免税额">
							</el-table-column>
							<el-table-column align="center" v-if="item.name==4||item.name==5" prop="taxation" label="税款">
							</el-table-column>
							<el-table-column align="center" v-if="item.name!=1" prop="remark" label="备注">
							</el-table-column>
						</el-table>
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
						 :page-size=10 layout="total, prev, pager, next, jumper" :total="total">
						</el-pagination>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "searchModule",
		data() {
			return {
				searchList: {
					options: [{
							value: "选项1",
							label: "黄金糕"
						},
						{
							value: "选项2",
							label: "双皮奶"
						}
					],
					value: "",
					nowDate: "",
					status: [{
							value: "1",
							label: "已提交"
						},
						{
							value: "0",
							label: "未提交"
						}
					],
					statusVaule: "1"
				},
				accountPeriod: '',
				customerId: '',
				statusVaule: '1',
				activeName: "1",
				tableTabs: [{
						title: "人员信息",
						name: "1",
						tableData: []
					},
					{
						title: "正常工资薪资所得",
						name: "2",
						tableData: []
					},
					{
						title: "全年一次性奖金",
						name: "3",
						tableData: []
					},
					{
						title: "稿酬所得",
						name: "4",
						tableData: []
					},
					{
						title: "劳务报酬所得",
						name: "5",
						tableData: []
					},
					{
						title: "偶然所得",
						name: "6",
						tableData: []
					},
					{
						title: "非居民正常工资薪资所得",
						name: "7",
						tableData: []
					}
				],
				currentPage: 1,
				pageNum: 1,
				pageSize: 10,
				total: 10,
				loading: false,
			};
		},
		created() {
			// this.searchList.options = this.$store.state.cust;
			// this.searchList.value=this.searchList.options[0].value;
			// console.log('this.searchList.options', this.searchList.options)
			this.getNowMonth();
			this.getTableData("1");
		},
		methods: {
			getNowMonth() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				month = month < 10 ? "0" + month : month;
				this.searchList.nowDate = year.toString() + "-" + month.toString();
				this.accountPeriod = year.toString() + "-" + month.toString();
			},
			// 获取表格数据
			getTableData(name) {
				console.log("tab.name", name);
				let type;
				if (name == "1") {
					type = 6;
				} else if (name == "2") {
					type = 5;
				} else if (name == "3") {
					type = 4;
				} else if (name == "4") {
					type = 1;
				} else if (name == "5") {
					type = 2;
				} else if (name == "6") {
					type = 3;
				} else if (name == "7") {
					type = 0;
				}
				this.loading = true;
				let params = {
					data: {
						customerId: this.customerId,
						accountPeriod: this.accountPeriod,
						submitStatus: this.statusVaule,
						type: type
					},
					page: this.pageNum,
					row: this.pageSize
				};
				let url;
				url = "/perTaxToolTwo/api/excel/queryPage.do";
				axios
					.post(url, params)
					.then(res => {
						console.log("获取表格数据", res);
						this.loading = false;
						if (res.data.code == 200) {
							this.tableTabs.forEach(item => {
								if (name == item.name) {
									item.tableData = res.data.data;
									this.total = res.data.count;
								}
							});
						}
					})
					.catch(err => {
						this.$message({
							message: "获取表格数据失败",
							type: "error"
						});
					});
			},
			handleClick(tab, event) {
				console.log("tab.name", this.accountPeriod);
				this.getTableData(tab.name);
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getTableData(this.activeName)
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getTableData(this.activeName)
			},
			search() {
				this.accountPeriod = this.searchList.nowDate;
				this.customerId = this.searchList.value;
				this.statusVaule = this.searchList.statusVaule;
				this.getTableData(this.activeName)
			},
			clear() {
				this.searchList.statusVaule = '1';
				this.searchList.nowDate = ''
			},
			exportExcel() {
				window.location.href = "/perTaxToolTwo/api/excel/exportExcel.do?customerId=" + this.customerId + "&accountPeriod=" +
					this.accountPeriod + "&submitStatus=" + this.statusVaule;
			}
		}
	};
</script>

<style scoped lang="less">
	.reportForms {
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.el-breadcrumb {
			height: 30px;
			line-height: 29px;
			padding-left: 20px;
			background-color: #fff;
			border-top: 1px solid #f2f6fc;
			box-sizing: border-box;
		}

		/deep/ .el-pagination {
			text-align: right;
			margin-top: 10px;
		}

		/deep/ .el-table th {
			background-color: #ebf6fb;
			height: 40px;
		}

		/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
			background: #ebf6fb;
		}

		/deep/ .demo-table-expand {
			font-size: 0;
		}

		/deep/ .demo-table-expand label {
			color: #99a9bf;
			// padding-left: 120px;
		}

		/deep/ .demo-table-expand .el-form-item {
			margin-right: 0;
			margin-bottom: 0;
			width: 50%;
		}
	}

	/deep/ .el-table__body tr,
	.el-table__body td {
		padding: 0;
		height: 40px;

		background-color: #fff7f1;
	}

	/deep/ .el-table__body tr.el-table__row--striped {
		background-color: #ebf6fb;
	}

	/deep/ .el-table thead {
		color: #343434;
		// font-size: 16px;
	}

	/deep/ .el-tabs__header {
		margin: 0px;
	}

	// /deep/ .el-table__body tr:hover{
	// 	background-color: #efe9e5;
	// }
	/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: #efe9e5;
	}

	/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		border-bottom-color: #fff;
		background: #ebf6fb;
	}

	.search {
		background: #fff;
		padding: 20px 20px;
		margin: 20px;
	}

	.title {
		font-size: 16px;
		margin-bottom: 15px;
	}

	div.search_contain {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.labelTitle {
		color: #999;
		font-size: 14px;
	}

	.importButton {
		background: #43b3db;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
		padding: 7px 35px;
	}

	.searchButton {
		background: #ffb980;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
		padding: 7px 35px;
	}

	.row2,
	.row3,
	.searchButton,
	.importButton {
		margin-left: 20px;
	}

	.content {
		background: #fff;
		padding: 20px 20px;
		margin: 20px;
	}

	.tableBox {
		margin-top: 15px;
	}
</style>

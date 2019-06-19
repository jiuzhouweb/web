<template>
	<div class="reportForms">
		<div class='search'>
			<div class="title">报表查看</div>
			<div class='search_contain'>
				<div class="row1">
					<span class="labelTitle">公司：</span>
					<el-select v-model="searchList.value" placeholder="请选择">
						<el-option v-for="item in searchList.options" :key="item.customerId" :label="item.customerName" :value="item.customerId">
						</el-option>
					</el-select>
				</div>
				<div class="row2">
					<span class="labelTitle">账期：</span>
					<el-date-picker v-model="searchList.nowDate" type="month" placeholder="选择月" value-format="yyyy-MM">
					</el-date-picker>
				</div>
				<div class="row3">
					<span class="labelTitle">状态：</span>
					<el-select v-model="searchList.statusVaule" placeholder="请选择">
						<el-option v-for="item in searchList.status" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<el-button type="primary" @click="search()" style="margin-left:20px">查看</el-button>
				<el-button @click="clear()">重置</el-button>
			</div>
		</div>
		<div class="content">
			<el-button type="primary" icon="el-icon-success">一键导出</el-button>
			<div class="tableBox">
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane :label="item.title" :name="item.name" v-for="(item,index) in tableTabs" :key="index">
						<el-table v-loading="loading" :data="item.tableData" border style="width: 100%">
							<el-table-column label="序号" type="index" width="50">
							</el-table-column>
							<el-table-column prop="employeeCode" label="工号">
							</el-table-column>
							<el-table-column prop="employeeName" label="姓名">
							</el-table-column>
							<el-table-column prop="cardType" label="证照类型" width="100">
							</el-table-column>
							<el-table-column prop="cardNum" label="证照号码">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="areaName" label="国籍(地区)" width="90">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="sex" label="性别">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="birthDate" label="出生日期" width="100">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="employeeStatus" label="人员状态">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="employeeType" label="任职受雇从业类型" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="phoneNum" label="手机号码">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="employeeDate" label="任职受雇从业日期" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="quitDate" label="离职日期" width="100">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="isDiasbility" label="是否残疾">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="isMartyr" label="是否烈属">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="isLonely" label="是否孤老">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="diasbilityNum" label="残疾证号">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="martyrNum" label="烈属证号">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="individualInvestment" label="个人投资额" width="100">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="individualInvestmentRatio" label="个人投资比例(%)" width="130">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="remark" label="备注">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="isOverseasPerson" label="是否境外人员" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="chineseName" label="中文名">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="taxRelatedCauses" label="涉税事由">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="birthCountry" label="出生国家(地区)" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="firstEntryCountryDate" label="首次入境时间" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="estimateDepartureCountryDate" label="预计离境时间" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="otherCardType" label="其他证照类型" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="otherCardNum" label="其他证照号码" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="censusRegisterProvince" label="户籍所在地（省）" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="censusRegisterCity" label="户籍所在地（市）" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="censusRegisterCounty" label="户籍所在地（区县）" width="150">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="censusRegisterDetail" label="户籍所在地（详细地址）" width="180">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="liveAddressProvince" label="居住地址（省）" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="liveAddressCity" label="居住地址（市）" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="liveAddressCounty" label="居住地址（区县）" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="liveAddressDetail" label="居住地址（详细地址）" width="170">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="contactAddressProvince" label="联系地址（省）" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="contactAddressCity" label="联系地址（市）" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="contactAddressCounty" label="联系地址（区县）" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="contactAddressDetail" label="联系地址（详细地址）" width="170">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="email" label="电子邮箱">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="education" label="学历">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="bankDeposit" label="开户银行">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="bankAccount" label="银行账号">
							</el-table-column>
							<el-table-column v-if="item.name==1" prop="post" label="职务">
							</el-table-column>
							<el-table-column v-if="item.name==5||item.name==6" prop="projectCode" label="所得项目">
							</el-table-column>
							<el-table-column v-if="item.name==2||item.name==4||item.name==5" :prop="item.name==2?'monIncomeAmount':'incomeAmount'"
							 label="本期收入">
							</el-table-column>
							<el-table-column v-if="item.name==2||item.name==4||item.name==5" :prop="item.name==2?'monTaxFreeIncome':'taxFreeIncome'"
							 label="本期免税收入" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="monPensionInsurance" label="基本养老保险费" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="monMedicalInsurance" label="基本医疗保险费" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="monUnemploymentInsurance" label="失业保险费" width="100">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="monHousingFund" label="住房公积金" width="100">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="sumChildEducation" label="累计子女教育" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="sumContinuingEducation" label="累计继续教育" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="sumHomeLoan" label="累计住房贷款利息" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="sumHousingRent" label="累计住房租金" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="sumElderly" label="累计赡养老人" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==2" prop="companyAnnuity" label="企业(职业)年金" width="120">
							</el-table-column>
							<el-table-column v-if="item.name==2||item.name==5" prop="healthInsurance" label="商业健康保险" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==2||item.name==5" prop="pension" label="税延养老保险" width="110">
							</el-table-column>
							<el-table-column v-if="item.name==3" prop="incomeAmount" label="全年一次性奖金额">
							</el-table-column>
							<el-table-column v-if="item.name==6||item.name==7" prop="incomeAmount" label="收入">
							</el-table-column>
							<el-table-column v-if="item.name==3||item.name==6||item.name==7" prop="taxFreeIncome" label="免税收入">
							</el-table-column>
							<el-table-column v-if="item.name==2||item.name==4||item.name==7" prop="otherFee" label="其他">
							</el-table-column>
							<el-table-column v-if="item.name==3" prop="otherIncome" label="其他">
							</el-table-column>
							<el-table-column v-if="item.name==6||item.name==7" prop="actualDonation" label="实际捐赠额">
							</el-table-column>
							<el-table-column v-if="item.name==6||item.name==7" prop="donationType" label="捐赠方式">
							</el-table-column>
							<el-table-column v-if="item.name!=1" prop="deductedDonation" label="准予扣除的捐赠额" width="140">
							</el-table-column>
							<el-table-column v-if="item.name==5" prop="otherFee" label="其他">
							</el-table-column>
							<el-table-column v-if="item.name!=1" prop="deductTax" label="减免税额">
							</el-table-column>
							<el-table-column v-if="item.name==4||item.name==5" prop="taxation" label="税款">
							</el-table-column>
							<el-table-column v-if="item.name!=1" prop="remark" label="备注">
							</el-table-column>
						</el-table>
						<el-pagination style="margin-top:10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page="currentPage" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
						 :total="total">
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
			this.searchList.options = this.$store.state.user.customerinfoList;
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
						customerId: this.searchList.value,
						accountPeriod: this.searchList.nowDate,
						submitStatus: this.searchList.statusVaule,
						type: type
					},
					page: this.pageNum,
					row: this.pageSize
				};
				let url;
				url = "/perTaxToolTwo/api/excel/queryPage.do";
				axios
					.post(url,params)
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
				console.log("tab.name", tab.name);
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
				console.log("statusVaule", this.searchList.statusVaule);
				this.getTableData(this.activeName)
			},
			clear() {
				this.searchList.statusVaule = '1';
				this.searchList.nowDate = ''
			}
		}
	};
</script>

<style scoped>
	.reportForms {
		padding: 20px;
	}

	.search {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background: #fff;
		padding: 20px 20px;
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
		margin-top: 20px;
	}

	.tableBox {
		margin-top: 15px;
	}
</style>

<template>
	<div class='main clearfix'>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>初始导入</el-breadcrumb-item>
		</el-breadcrumb>
		<div class='search_contain'>
			<div class='info'>
				<!-- <el-tag effect="dark">
							初始公司表上传
						</el-tag> -->
				<h5 class='left' style="margin-right: 10px;">初始录入企业表</h5>
				<span>*若初始导入多家Excel，请勿选择公司名</span>
				<a href="初始累计表模板.xls" download="模板">点击下载模板</a>
			</div>
			<div>
				<el-form :inline="true" :model="uploadData" class="demo-form-inline" size="small" :rules="rules" ref='formName'>
					<el-form-item label="账期" prop="accountPeriod">
						<el-date-picker v-model="uploadData.accountPeriod" type="month" placeholder="选择月" clearable value-format='yyyy-MM'>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="公司">
						<el-select v-model="uploadData.customerId" placeholder="请选择账期" clearable>
							<el-option v-for="item in $store.state.user.customerinfoList" :label="item.customerName" :value='item.customerId'></el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" @click='selectExcel("formName")' size="small">选择Excel</el-button>
					<!-- <el-button type="primary" @click='selectExcel'>上传</el-button> -->
					<!-- <el-form-item>
							<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
							 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
								<el-button size="small" type="primary">选择Excel</el-button>
							</el-upload>
						</el-form-item> -->
				</el-form>

			</div>
		</div>


		<div class='main_contain'>
			<h5>录入企业表详情</h5>
			<div>
				<el-form :inline="true" :model='search' class="demo-form-inline" size="small" :rules="rules1" ref='formName1'>
					<el-form-item label="账期" prop="accountPeriod">
						<el-date-picker v-model="search.accountPeriod" type="month" placeholder="选择月" clearable value-format='yyyy-MM'>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="公司">
						<el-select v-model="search.customerId" placeholder="请选择公司名称" clearable>
							<el-option v-for="item in $store.state.user.customerinfoList" :label="item.customerName" :value='item.customerId'></el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" size="small" @click='searchSheet("formName1")'>搜索</el-button>
					<!-- <el-button type="primary" @click='selectExcel'>重置</el-button> -->
				</el-form>

			</div>
			<el-table :data="tableData" style="width: 100%" stripe border>
				<el-table-column label="序号" type='index' width="80"></el-table-column>
				<el-table-column label="账期" prop="accountPeriod"></el-table-column>
				<el-table-column label="企业名称" prop="customerName"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type='primary' @click="handleEdit(scope.row)">查看企业员工详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="total,prev, pager, next, jumper" :total="total" :page-size=10 @current-change='handleCurrentChange'
			 :current-page="currentPage">
			</el-pagination>
		</div>
		<el-dialog title="选择Excel" :visible.sync="dialogVisible" width="30%" @close="cancelUpload">
			<el-upload class="upload-demo" action="/perTaxToolTwo/api/excel/initUpload.do" :on-preview="handlePreview" ref='upload'
			 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="10" :on-exceed="handleExceed" :file-list="fileList"
			 :on-success="handleSuccess" :on-error="handleError" :auto-upload="false" :data='uploadData' accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
				<el-button size="small" type="primary" slot="trigger">选择Excel</el-button>

			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="cancelUpload">取 消</el-button>
				<el-button size="small" type="primary" @click="submitUpload">上传</el-button>
			</span>
		</el-dialog>
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
				value2: '',
				formInline: {
					user: '',
					region: ''
				},
				dialogVisible: false,
				uploadData: {
					"accountPeriod": "",
					"customerId": ""
				},
				search:{
					"accountPeriod": '',
					"customerId": '',
				},
				
				fileList: [],
				total: 0,
				currentPage: 1,

				tableData: [],
				pageSize: 10,
				employeeList: [],
				customerList: [],
				rules: {
					accountPeriod: [{
						required: true,
						message: '请选择账期',
						trigger: 'blur'
					}],
				},
				rules1: {
					accountPeriod: [{
						required: true,
						message: '请选择账期',
						trigger: 'blur'
					}],
				},
			}
		},
		components: {},
		methods: {
			selectExcel(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.dialogVisible = true;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			cancelUpload() {
				this.fileList = [];
				this.dialogVisible = false;
			},
			// handleClose(done) {
			// 	this.$confirm('确认关闭？')
			// 		.then(_ => {
			// 			done();
			// 		})
			// 		.catch(_ => {});
			// },
			onSubmit(formName) {
				console.log('submit!');
			},
			searchSheet(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.accountPeriod = this.search.accountPeriod;
						this.customerId = this.search.customerId;
						this.queryPage(this.search.accountPeriod, this.search.customerId);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				// this.uploadData.accountPeriod = this.accountPeriod;
				// this.uploadData.customerId = this.customerId;
				
			},
			handleSuccess(response) {
				if (response.code == 200) {
					this.fileList = [];
					this.$message({
						message: response.msg,
						type: 'success'
					});
					this.dialogVisible = false;
					this.search.accountPeriod = this.uploadData.accountPeriod;
					this.search.customerId = this.uploadData.customerId;
					this.accountPeriod = this.uploadData.accountPeriod;
					this.customerId = this.uploadData.customerId;
					this.queryPage(this.uploadData.accountPeriod,this.uploadData.customerId);
				} else {
					this.fileList = [];
					this.$message({
						message: response.msg || "上传文件失败！",
						type: 'error'
					});
				}
			},
			handleError(err) {
				this.fileList = [];
				this.$message({
					message: "上传文件失败！",
					type: 'error'
				});
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryPage(this.accountPeriod,this.customerId);
			},


			queryPage(accountPeriod, customerId) {
				let params = {
					row: this.pageSize,
					page: this.currentPage,
					data: {
						accountPeriod: accountPeriod,
						customerId: customerId,
						submitStatus: 1
					}

				};
				this.axios.post('/perTaxToolTwo/initialMonCom/queryPage', params)
					// this.axios.post('/miaoxing/queryPage', params)
					.then(res => {
						if (res.data.code == 200) {
							this.tableData = res.data.data;
							this.length = this.tableData.length;
							this.total = res.data.count;
							// for (let i = 0; i < this.pageSize - this.length; i++) {
							// 	this.tableData.push({});
							// }
							console.log(this.tableData)
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
			handleEdit(row) {
				this.$router.push({
					path: '/index/employeeDetail',
					query: {
						operateId: row.operateId
					}
				});
			}
		},
		computed: {},
		created() {

			this.customerList = this.$store.state.user.customerinfoList;
			// console.log(this.customerList);
		},
		updated() {
			console.log(this.$store.state.user.customerinfoList);
		}
	}
</script>

<style lang='less' scoped>
	.main {
		/* background: #fff; */
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.el-breadcrumb {
			height: 30px;
			line-height: 29px;
			padding-left: 20px;
			background-color: #fff;
			border-top: 1px solid #F2F6FC;
			box-sizing: border-box
		}

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

		.search_contain {
			background: #fff;
			height: 100px;
			padding-left: 20px;
			margin: 20px;

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
			margin: 0 20px;
			padding: 0px 20px;
			height: calc(100% - 190px);

			h5 {
				height: 40px;
				line-height: 40px;
			}

			/deep/ .el-pagination {
				text-align: right;
				margin-top: 10px;
			}
		}
	}
</style>

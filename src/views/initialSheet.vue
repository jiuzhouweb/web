<template>
	<div class='main clearfix'>
		<el-col :span="24">
			<div>
				<div>
					<el-tag effect="dark">
						初始公司表上传
					</el-tag>
					<span>*若初始导入多家Excel，请勿选择公司名</span>
					<a href="初始累计表模板.xls" download="模板">点击下载模板</a>
				</div>
			</div>
			<div>
				<el-form :inline="true" :model="uploadData" class="demo-form-inline">
					<el-form-item label="账期">
						<el-date-picker v-model="uploadData.accountPeriod" type="month" placeholder="选择月">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="公司">
						<el-select v-model="uploadData.customerId" placeholder="活动区域">
							<el-option label="区域一" value="jz3779"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" @click='selectExcel'>选择Excel</el-button>
					<!-- <el-button type="primary" @click='selectExcel'>上传</el-button> -->
					<!-- <el-form-item>
						<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
						 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
							<el-button size="small" type="primary">选择Excel</el-button>
						</el-upload>
					</el-form-item> -->
				</el-form>

			</div>
		</el-col>
		<el-col :span="24">
			<h3>初始录入企业表</h3>
			<div>
				<el-form :inline="true" :model="uploadData" class="demo-form-inline">
					<el-form-item label="账期">
						<el-date-picker v-model="uploadData.accountPeriod" type="month" placeholder="选择月">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="公司">
						<el-select v-model="uploadData.customerId" placeholder="活动区域">
							<el-option label="区域一" value="jz3779"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" @click='selectExcel'>搜索</el-button>
					<el-button type="primary" @click='selectExcel'>重置</el-button>
				</el-form>

			</div>
			<div>
				<el-table :data="tableData" style="width: 100%" stripe>
					<el-table-column label="序号" type='index'></el-table-column>
					<el-table-column label="账期" prop="date"></el-table-column>
					<el-table-column label="企业名称" prop="date"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type='primary' @click="handleEdit(scope.$index, scope.row)">查看企业员工详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination background layout="prev, pager, next" :total="total" :page-size=10 @current-change='handleCurrentChange'
			 :current-page="currentPage">
			</el-pagination>
		</el-col>
		<el-dialog title="选择Excel" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-upload class="upload-demo" action="/aaa/perTaxToolTwo/api/excel/initUpload.do" :on-preview="handlePreview" ref='upload'
			 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="10" :on-exceed="handleExceed" :file-list="fileList"
			 :auto-upload="false" :data='uploadData'>
				<el-button size="small" type="primary" slot="trigger">选择Excel</el-button>

			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
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
					"accountPeriod": "2011-01",
					"customerId": "jz3779"
				},
				fileList: [],
				total:100,
				currentPage:1,

				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		components: {},
		methods: {
			selectExcel() {
				this.dialogVisible = true
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			onSubmit() {
				console.log('submit!');
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
			handleCurrentChange(){
				}
		},
		computed: {},
		created() {}
	}
</script>

<style lang='less' scoped>
	.main {
		background: #fff;
		width: 100%;
		height:100%;
		padding: 20px;
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
		/deep/ .el-table td{
			padding: 6px 0;
		}
	}
</style>

<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<div class='title'>字典表配置</div>
				<div>
					<el-button @click='showDialog(1)'>添加一级条目</el-button>
					<el-button @click='deleteDic'>删除</el-button>
					<el-button @click='refresh'>刷新</el-button>
				</div>

			</div>
			<div class="contain_body">
				<el-table :data="tableList" style="width: 100%" stripe border @selection-change="handleSelectionChange">
					<el-table-column align="center" type="selection" width="50"></el-table-column>
					<el-table-column align="center" label="名称" prop="dicName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="数值" prop="dicValue" :resizable="false"></el-table-column>
					<el-table-column align="center" label="层级" prop="dicLevel" :resizable="false"></el-table-column>
					<el-table-column align="center" label="排序" prop="dicSort" :resizable="false"></el-table-column>
					<el-table-column align="center" label="状态" prop="state" :resizable="false">
						<template slot-scope="scope">
							<span>{{scope.row.state==1?'有效':'无效'}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" width="260" :resizable="false">
						<template slot="header" slot-scope="scope">
							<span>操作</span>
						</template>
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
							<!-- <el-button size="mini" type="primary" @click="addChildMenu(scope.$index, scope.row)">添加子条目</el-button> -->
							<el-button size="mini" type="primary" @click="showDialog(2,scope.row)">添加子条目</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- <el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '4')})"
				 :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination> -->
			</div>
		</div>
		<el-dialog title="新增" :visible.sync="dialogTableVisible" width="8rem">
			<el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
				<el-form-item label="名称:">
					<el-input v-model="form.dicName"></el-input>
				</el-form-item>
				<el-form-item label="数值:">
					<el-input v-model="form.dicValue"></el-input>
				</el-form-item>
			</el-form>
			<div class='btn_contain clearfix'>
				<span class='commit' @click='commitDialog'>完成</span>
				<span class='close' @click="hideDialog">关闭</span>
			</div>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="8rem">
			<el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
				<el-form-item label="名称:">
					<el-input v-model="form.editdicName"></el-input>
				</el-form-item>
				<el-form-item label="数值:">
					<el-input v-model="form.editdicValue"></el-input>
				</el-form-item>
				<el-form-item label="排序:">
					<el-input v-model="form.editsort"></el-input>
				</el-form-item>
			</el-form>
			<div class='btn_contain clearfix'>
				<span class='commit' @click='commitEditDialog'>完成</span>
				<span class='close' @click="hideEditDialog">关闭</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "customer",
		data() {
			return {
				message: "12334456",
				tableList: [{
					employeeName: "zhangsan",
					incomeAmount: "zhangsan",
					yearAwards: "zhangsan"
				}, ],
				dialogTableVisible:false,
				dialogVisible:false,
				form:{
					dicName:"",
					dicValue:'',
					editdicName:'',
					editdicValue:'',
					editsort:"",
				},
				tag:0,
				row:{},
				editRow:{},
				multipleSelection:[]
			}
		},
		components: {},
		methods: {
			/*获取字典列表*/
			getList() {
				let params = {
					state:1
				};
				this.axios.post('/perTaxToolTwo/e9z/configDictionary/queryTree', params)
					.then(res => {
						if (res.data.code == 200) {
							this.tableList = res.data.data;
							// this.total = 
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '获取字典列表失败',
							type: 'error'
						});
					})
			},
			/*新增一级条目*/
			addFirstMenu() {
				let params = {
					"dicParentId": 0,
					"dicName": this.form.dicName,
					"dicValue": this.form.dicValue,
					"dicLevel": 1,
					"state": 1,
					"parentLevel": 0
				};
				this.axios.post('/perTaxToolTwo/e9z/configDictionary/saveOne', params)
					.then(res => {
						if (res.data.code == 200) {
							this.dialogTableVisible = false;
							this.$message({
								message: res.data.msg,
								type: 'success'
							});
							this.getList();
							// this.total = 
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '新增失败',
							type: 'error'
						});
					})
			},
			
			/*
			* 新增子条目
			* params
			* {
				"dicParentId": 0,
				"dicName": "test1",
				"dicValue": 1,
				"dicLevel": 2,
				"dicSort": 8,
				"state": 1,
				"parentLevel": 0
			}
			* 
			* */
			addChildMenu() {
				console.log(this.row);
				let params = {
					"dicParentId": this.row.dicId,
					"dicName": this.form.dicName,
					"dicValue": this.form.dicValue,
					"dicLevel": this.row.dicLevel+1,
					"state": 1,
					"parentLevel": this.row.dicLevel
				};
				this.axios.post('/perTaxToolTwo/e9z/configDictionary/saveOne', params)
					.then(res => {
						if (res.data.code == 200) {
							this.getList();
							this.dialogTableVisible = false;
							this.$message({
								message: res.data.msg,
								type: 'success'
							});
							// this.total = 
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
			
					}).catch(function(err) {
						this.$message({
							message: '新增失败',
							type: 'error'
						});
					})
			},
			
			hideDialog(){
				this.dialogTableVisible = false
			},
			hideEditDialog(){
				this.dialogVisible = false
			},
			showDialog(tag,row){
				this.dialogTableVisible = true;
				this.tag = tag;
				if(row){
					this.row = row;
				}
			},
			commitDialog(){
				if(this.tag == 1){
					this.addFirstMenu()
				}else if(this.tag == 2){
					this.addChildMenu()
				}
			},
			commitEditDialog(){
				let params = {
					"dicId": this.editRow.dicId,
					"dicParentId": this.editRow.dicParentId,
					"dicName": this.form.editdicName,
					"dicValue": this.form.editdicValue,
					"dicSort": this.form.editsort,
					"dicLevel": this.editRow.dicLevel,
					"state": 1,
					"parentLevel": this.editRow.parentLevel
				};
				this.axios.post('/perTaxToolTwo/e9z/configDictionary/saveOne', params)
					.then(res => {
						if (res.data.code == 200) {
							this.getList();
							this.dialogVisible = false;
							this.$message({
								message: res.data.msg,
								type: 'success'
							});
							// this.total = 
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
							
					}).catch(function(err) {
						this.$message({
							message: '编辑失败',
							type: 'error'
						});
					})
			},
			handleEdit(row){
				this.dialogVisible = true;
				this.editRow = row;
				this.form.editdicName = row.dicName;
				this.form.editdicValue = row.dicValue;
				this.form.editsort = row.dicSort;
			},
			commitEdit(){
				this.dialogVisible = true
			},
			
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			
			deleteDic(){
				if(this.multipleSelection.length > 0){
					let params = this.multipleSelection;
					this.axios.post('/perTaxToolTwo/e9z/configDictionary/delBatch', params)
						.then(res => {
							if (res.data.code == 200) {
								this.getList();
								this.$message({
									message: res.data.msg,
									type: 'success'
								});
								// this.total = 
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
				}else{
					this.$message({
						message: '请至少选择一条数据',
						type: 'error'
					});
				}
				
			},
			refresh(){
				this.getList()
			}
		},
		created() {
			this.getList()
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
		padding: 0.2rem 0.2rem;
		background: #fff
	}

	/deep/ .el-pagination {
		text-align: right;
		margin-top: 0.10rem;
	}
</style>

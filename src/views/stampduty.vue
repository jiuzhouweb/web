<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<div class='title'>印花税核定征收率配置</div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" label-width="86px">
					<el-form-item label="客户名称:">

						<el-select v-model="formInline.customerId" placeholder="请选择客户名称" clearable filterable>
							<el-option v-for="item in $store.state.cust" :label="item.customerName" :value='item.customerId'></el-option>
						</el-select>
						<!-- <el-input v-model='formInline.tmplName'></el-input> -->
					</el-form-item>

					<el-form-item>
						<el-button @click='search' size="mini">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button @click='search' size="mini">新增</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="contain_body">
				<el-table :data="tableList" style="width: 100%" stripe border @selection-change="handleSelectionChange" v-loading='loading'>
					<el-table-column align="center" type="selection" width="50"></el-table-column>
					<el-table-column align="center" label="客户名称" prop="customerName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="印花税核定征收税率" prop="rate" :resizable="false"></el-table-column>
					<el-table-column align="center" width="260" :resizable="false">
						<template slot="header" slot-scope="scope">
							<span>操作</span>
						</template>
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
							<el-button size="mini" type="text" @click="showDialog(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- <el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '4')})"
				 :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination> -->
			</div>
		</div>
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="4rem">
			<el-form :model="form" size="mini" label-width="80px" :rules="rules" ref="ruleForm1">
				<el-form-item label="客户名称" prop="customerName">
					<el-input v-model="form.customerName" disabled></el-input>
				</el-form-item>
				<el-form-item label="税率" prop="rate">
					<el-input type='text' v-model="form.rate"></el-input>
				</el-form-item>
			</el-form>
			<div class='btn_contain clearfix'>
				<span class='commit' @click='commitEditDialog("ruleForm1")'>完成</span>
				<span class='close' @click='hideEditDialog("ruleForm1")'>关闭</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "customer",
		data() {
			return {
				loading: false,
				message: "12334456",
				customerId:'',
				tableList: [{
					employeeName: "zhangsan",
					incomeAmount: "zhangsan",
					yearAwards: "zhangsan"
				}, ],
				dialogTableVisible: false,
				dialogVisible: false,
				formInline: {
					customerId: ""
				},
				form:{
					customerId:'',
					
					customerName:'',
					rate:''
				},
				tag: 0,
				row: {},
				editRow: {},
				multipleSelection: [],
				rules: {
					customerName: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					rate: [{
						required: true,
						message: '请输入数值',
						trigger: 'blur'
					}],
				}
			}
		},
		components: {},
		methods: {
			/*获取字典列表*/
			getList() {
				let params = {
					"page": 1,
					"row": 10,
					"data": {
						"customerId": this.customerId
					}
				};
				this.axios.post('/perTaxToolTwo/e9z/authorizedLevyRate/selectPage', params)
					.then(res => {
						this.loading = false;
						if (res.data.code == 200) {
							this.tableList = res.data.data;
							// this.total = 
						} else {
							let type;
							if (res.data.code == 0) {
								type = "warning";
							} else if (res.data.code == 500) {
								type = "error";
							}
							this.$message({
								message: res.data.msg,
								type: type
							});
						}
					})
					.catch(err => {
						this.loading = false;
						this.$message({
							message: "系统繁忙，请稍后重试",
							type: "error"
						});
					});
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
			
			hideDialog(formName) {
				this.$refs[formName].resetFields();
				this.dialogTableVisible = false
			},
			hideEditDialog(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false
			},
			showDialog(row) {
				
				this.$confirm('确定删除此条税率?', '删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = [row.ratesId];
					this.axios.post('/perTaxToolTwo/e9z/authorizedLevyRate/delete', params)
						.then(res => {
							if (res.data.code == 200) {
								this.$message({
									message: res.data.msg,
									type: 'success'
								});
								this.getList();
								// this.total = 
							} else {
								let type;
								if (res.data.code == 0) {
									type = "warning";
								} else if (res.data.code == 500) {
									type = "error";
								}
								this.$message({
									message: res.data.msg,
									type: type
								});
							}
						})
						.catch(err => {
							this.$message({
								message: "系统繁忙，请稍后重试",
								type: "error"
							});
						});
				
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				
				
			},
			commitDialog(formName) {
				if (this.tag == 1) {
					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.addFirstMenu()
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				} else if (this.tag == 2) {
					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.addChildMenu()
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				}
			},
			commitEditDialog(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = {
							rate: this.form.rate,
							rateId:this.form.rateId,
							customerId: this.form.customerId,
						};
						this.axios.post('/perTaxToolTwo/e9z/authorizedLevyRate/update', params)
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
									let type;
									if (res.data.code == 0) {
										type = "warning";
									} else if (res.data.code == 500) {
										type = "error";
									}
									this.$message({
										message: res.data.msg,
										type: type
									});
								}
							})
							.catch(err => {
								this.$message({
									message: "系统繁忙，请稍后重试",
									type: "error"
								});
							});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleEdit(row) {
				this.dialogVisible = true;
				this.form = JSON.parse(JSON.stringify(row));
			},
			commitEdit() {
				this.dialogVisible = true
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			deleteDic() {
				if (this.multipleSelection.length > 0) {
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
								let type;
								if (res.data.code == 0) {
									type = "warning";
								} else if (res.data.code == 500) {
									type = "error";
								}
								this.$message({
									message: res.data.msg,
									type: type
								});
							}
						})
						.catch(err => {
							this.$message({
								message: "系统繁忙，请稍后重试",
								type: "error"
							});
						});
				} else {
					this.$message({
						message: '请至少选择一条数据',
						type: 'error'
					});
				}
			},
			refresh() {
				this.loading = true;
				this.getList()
			}
		},
		created() {
			this.loading = true;
			this.getList()
		}
	}
</script>
<style>
	.addDictionary .el-dialog {
		min-width: 250px;
	}
</style>

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

		/deep/ .el-button {
			color: #43b3db;
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

	.btn_contain {
		text-align: center;
		margin-top: 0.36rem;
	}

	.commit {
		width: 1.2rem;
		height: 0.4rem;
		line-height: 0.4rem;
		background: #43b3db;
		color: #fff;
		display: inline-block;
		text-align: center;
		margin-right: 0.4rem;
		border-radius: 4px;
	}

	.close {
		width: 1.2rem;
		height: 0.4rem;
		line-height: 0.4rem;
		background: #ed878e;
		color: #fff;
		display: inline-block;
		text-align: center;
		border-radius: 4px;
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

	/deep/ .el-table th {
		background-color: #ebf6fb;
	}

	/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
		background: #ebf6fb;
	}

	.el-dialog .el-form {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap
	}

	/deep/ .el-form-item__content {
		width: 180px;
	}

	/deep/ .el-date-editor.el-input {
		width: 180px;
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
	}

	/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: #efe9e5;
	}

	/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		border-bottom-color: #fff;
		background: #ebf6fb;
	}
</style>

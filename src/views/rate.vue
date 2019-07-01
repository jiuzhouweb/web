<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<span class='title'>税率配置</span>
				<el-button class='right' @click='addRate'>新增税率</el-button>
			</div>
			<div class="contain_body">
				<el-table :data="rateList" style="width: 100%" stripe border>
					<el-table-column align="center" label="税率标题" prop="taxesTitle" :resizable="false"></el-table-column>
					<el-table-column align="center" label="税率" :resizable="false">
						<template slot-scope="scope">
							<div contenteditable='true' v-text='scope.row.taxesRate' @blur="setLine($event,scope.row,'taxesRate')"></div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="right_contain">
			<div class="contain_header">
				<el-input placeholder="搜索" prefix-icon="el-icon-search" v-model='filter' v-on:keyup.enter.native="submit"></el-input>
				<span class='title'>发票税率关联配置</span>
			</div>
			<div class="contain_body">
				<el-table :data="invoiceList" style="width: 100%" stripe border>
					<el-table-column align="center" label="发票名称" prop="invoiceName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="发票分类" prop="invoiceCategory" :resizable="false"></el-table-column>
					<el-table-column align="center" label="发票类型" prop="invoiceType" :resizable="false"></el-table-column>
					<el-table-column align="center" label="区域代码" prop="area" :resizable="false"></el-table-column>
					<el-table-column align="center" label="计税方式" :resizable="false">
						<template slot-scope="scope">
							<span>{{scope.row.taxCalcType == 1?'一般计税':'简易征收计税'}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作" prop="roleId" :resizable="false">
						<template slot-scope="scope">
							<el-button type='text' size="mini" @click='showDialog(scope.row)'>编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination background layout="prev, pager, next" :total="total" :page-size=pageSize @current-change='handleCurrentChange'
				 :current-page="currentPage">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="新增税率" :visible.sync="dialogVisible" width="4rem">
			<el-form :model="form" size="mini" label-width="100px" :rules='rules' ref="ruleForm">
				<el-form-item label="税费标题" prop="taxesTitle">
					<el-input v-model="form.taxesTitle"></el-input>
				</el-form-item>
				<el-form-item label="税费名称" prop="taxesName">
					<el-input v-model="form.taxesName"></el-input>
				</el-form-item>
				<el-form-item label="税率" prop="taxesRate">
					<el-input v-model="form.taxesRate"></el-input>
				</el-form-item>
			</el-form>
			<div class='btn_contain clearfix'>
				<span class='commit' @click="commitDialog('ruleForm')">完成</span>
				<span class='close' @click="hideDialog('ruleForm')">关闭</span>
			</div>
		</el-dialog>
		<el-dialog title="" :visible.sync="dialogTableVisible" width="8rem">
			<el-table :data="rateList" row-key='ratesId' border stripe @selection-change="handleSelectionChange" ref='multipleTable'>
				<el-table-column align="center" type="selection" width="55"></el-table-column>
				<el-table-column align="center" property="taxesTitle" label="税率名称"></el-table-column>
				<el-table-column align="center" property="taxesRate" label="税率"></el-table-column>
			</el-table>
			<div class='btn_contain clearfix'>
				<span class='commit' @click='modifyRate'>完成</span>
				<span class='close' @click="hideDialog1">关闭</span>
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
				rateList: [


				],
				queryName: '',
				dialogVisible: false,
				dialogTableVisible: false,
				form: {
					taxesName: '',
					taxesTitle: '',
					taxesRate: ''
				},
				filter: '',
				invoiceList: [],

				total: 0,
				currentPage: 1,
				pageSize: 10,
				url: '',
				invoiceId: '',

				rules: {
					taxesTitle: [{
							required: true,
							message: '请输入税费标题',
							trigger: 'blur'
						},
					],
					taxesName: [{
						required: true,
						message: '请输入税费名称',
						trigger: 'blur'
					}],
					taxesRate: [{
						required: true,
						message: '请输入税率',
						trigger: 'blur'
					}],
				}
			}
		},
		components: {},
		methods: {
			queryRate() {
				let params = {};
				this.axios.post('/perTaxToolTwo/e9z/configTaxes/selectTaxesWithRate', params)
					.then(res => {
						if (res.data.code == 200) {
							this.rateList = res.data.data;
							// this.total = 
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '获取税率列表失败',
							type: 'error'
						});
					})
			},
			addRate() {
				this.dialogVisible = true;
			},
			hideDialog(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false;
				this.form = {
					taxesName: '',
					taxesTitle: '',
					taxesRate: ''
				}
			},
			commitDialog(formName) {

				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = this.form;
						this.axios.post('/perTaxToolTwo/e9z/configTaxes/insertOrUpdateTaxesAndRate', params)
							.then(res => {
								this.dialogVisible = false;
								this.form = {
									taxesName: '',
									taxesTitle: '',
									taxesRate: ''
								}
								if (res.data.code == 200) {
									this.queryRate();
									this.$message({
										message: res.data.msg,
										type: 'success'
									});
									// this.total = 
								} else {
									this.$message({
										message: res.data.data,
										type: 'error'
									});
								}

							}).catch(function(err) {
								this.dialogVisible = false;
								this.form = {
									taxesName: '',
									taxesTitle: '',
									taxesRate: ''
								}
								this.$message({
									message: '获取税率列表失败',
									type: 'error'
								});
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			setLine(event, row, name) {
				if (event.target.innerText != row.taxesRate) {
					let params = {
						"ratesId": row.ratesId,
						"taxesId": row.taxesId,
						"taxesRate": event.target.innerText,
					};
					this.axios.post('/perTaxToolTwo/e9z/configTaxesRates/insertOrUpdateTaxesRate', params)
						.then(res => {
							if (res.data.code == 200) {
								this.queryRate();
								this.$message({
									message: res.data.msg,
									type: 'success'
								});
								// this.total = 
							} else {
								this.queryRate();
								this.$message({
									message: res.data.data,
									type: 'error'
								});
							}

						}).catch(function(err) {
							this.queryRate();
							this.$message({
								message: '获取税率列表失败',
								type: 'error'
							});
						})
				}

			},

			submit() {
				this.queryName = this.filter;
				this.queryInvoice()
			},
			queryInvoice() {
				if (this.queryName != '') {
					this.url = '/perTaxToolTwo/e9z/invoiceInfo/findInvoiceInfoList?currentPage=' + this.currentPage + '&pageCount=' +
						this.pageSize + '&queryName=' + this.queryName;
				} else {
					this.url = '/perTaxToolTwo/e9z/invoiceInfo/findInvoiceInfoList?currentPage=' + this.currentPage + '&pageCount=' +
						this.pageSize;
				}
				this.axios.post(this.url)
					.then(res => {
						if (res.data.code == 200) {
							this.total = res.data.data.total;
							this.invoiceList = res.data.data.list;
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
							message: '查询失败',
							type: 'error'
						});
					})
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryInvoice()
			},

			showDialog(row) {
				this.invoiceId = row.invoiceId;
				this.dialogTableVisible = true;
				let params = {
					"invoiceId": row.invoiceId
				};
				this.axios.post('/perTaxToolTwo/e9z/configInvoiceTaxes/selectWithInvoiceTaxesRate', params).then(res => {
					if (res.data.code == 200) {
						this.ownList = res.data.data;
						if (this.ownList) {
							this.ownList.forEach(({
								ratesId
							}) => {
								const id = this.rateList.findIndex(item => item.ratesId === ratesId)
								this.$refs.multipleTable.toggleRowSelection(this.rateList[id], true);
							});
						} else {
							this.$refs.multipleTable.clearSelection();
						}
					} else {
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}

				}).catch(function(err) {
					this.$message({
						message: '获取发票税率失败',
						type: 'error'
					});
				})

			},

			hideDialog1() {
				this.$refs.multipleTable.clearSelection();
				this.dialogTableVisible = false;

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			modifyRate() {

				let params = this.multipleSelection;

				// if(this.multipleSelection.length == 0){
				var url = '/perTaxToolTwo/e9z/configInvoiceTaxes/insertAndDelInvoiceTaxesAndInvoiceRates?invoiceId=' + this.invoiceId;
				// }else{
				var url = '/perTaxToolTwo/e9z/configInvoiceTaxes/insertAndDelInvoiceTaxesAndInvoiceRates?invoiceId=' + this.invoiceId;
				// }

				this.axios.post(url, params).then(res => {
					this.$refs.multipleTable.clearSelection();
					if (res.data.code == 200) {
						this.dialogTableVisible = false;
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
					} else {
						this.dialogTableVisible = false;
						this.$refs.multipleTable.clearSelection();
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}

				}).catch(function(err) {
					this.dialogTableVisible = false;
					this.$refs.multipleTable.clearSelection();
					this.$message({
						message: '修改失败',
						type: 'error'
					});
				})
			}
		},
		created() {
			this.queryRate()

		}
	}
</script>

<style scoped lang="less">
	.main_contain {
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
	}

	.left_contain {
		width: calc(50% - 10px);
		/* background: pink; */
		float: left;
		height: 100%;

		.contain_header {
			height: 2rem;
			// line-height: 2rem;
			padding: 0px 30px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			background: url(../assets/img/list-bg1.png) no-repeat;
			background-size: cover;
			align-items: center;

			span.title {
				font-size: 0.28rem;
				color: #fff
			}

			/deep/ .el-button {
				color: #43b3db
			}
		}

		.contain_body {
			padding: 0.2rem 0.2rem;
			background: #fff
		}


	}

	.right_contain {
		width: calc(50% - 10px);
		height: 100%;
		float: right;

		/deep/ .el-input {
			width: 2rem;
			display: block;
			top: 1rem;
		}

		.contain_header {
			height: 2rem;
			// line-height: 2rem;
			padding: 0px 30px;
			// display: flex;
			flex-direction: row;
			justify-content: space-between;
			background: url(../assets/img/list-bg2.png) no-repeat;
			background-size: cover;
			align-items: center;

			span.title {
				font-size: 0.28rem;
				color: #fff
			}

			/deep/ .el-button {
				color: #43b3db
			}
		}

		.contain_body {
			padding: 0.2rem 0.2rem;
			background: #fff
		}
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

	/deep/ .el-pagination {
		text-align: right;
		margin-top: 10px;
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

<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<div class='title'>发票模板配置</div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
					<el-form-item label="模板名称:">
						<el-select v-model='formInline.customId'>
							<el-option v-for='item in $store.state.cust' :label="item.customerName" :value="item.customerId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="纳税人类型:">
						<el-date-picker v-model="formInline.period" type="month" placeholder="选择月" clearable value-format='yyyy-MM'>
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button @click='search'>查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="contain_body">
				<el-table :data="tableList" style="width: 100%" stripe border>
					<!-- <el-table-column align="center" type="selection" width="50"></el-table-column> -->
					<el-table-column align="center" label="模板名称" prop="dicName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="纳税人类型" prop="dicValue" :resizable="false"></el-table-column>
					<el-table-column align="center" label="显示名称" prop="dicLevel" :resizable="false"></el-table-column>
					
				</el-table>
				<el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '1')})"
				 :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>
		<div class="right_contain">
			<el-table :data="tableList" style="width: 100%" stripe border>
				<!-- <el-table-column align="center" type="selection" width="50"></el-table-column> -->
				<el-table-column align="center" label="字段名" prop="dicName" :resizable="false"></el-table-column>
				<el-table-column align="center" label="列类型" prop="dicValue" :resizable="false"></el-table-column>
				<el-table-column align="center" label="计算优先级" prop="dicLevel" :resizable="false"></el-table-column>
				<el-table-column align="center" label="是否必填" prop="dicName" :resizable="false"></el-table-column>
				<el-table-column align="center" label="是否参与计算" prop="dicValue" :resizable="false"></el-table-column>
				<el-table-column align="center" label="适用税务类型" prop="dicLevel" :resizable="false"></el-table-column>
				<el-table-column align="center" label="是否显示" prop="dicName" :resizable="false"></el-table-column>
				<el-table-column align="center" label="是否可编辑" prop="dicValue" :resizable="false"></el-table-column>
				<el-table-column align="center" label="默认值" prop="dicLevel" :resizable="false"></el-table-column>
			</el-table>
			<el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '2')})"
			 :current-page="currentPage1" :page-size="pageSize1" layout="total, prev, pager, next" :total="total1">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import searchModule from "../components/customer/searchModule.vue"
	import listModule from "../components/customer/listModule.vue"
	export default {
		name: "router1",
		data() {
			return {
				formInline: {
					taxesTaxType: '',
					taxCalcType: '',
					tmplShowType: "0",
					invoiceType: "",
					invoiceName: '',
					e9z: "",
					formula: "",

					tmplName: '',
					columnTitle: '',
				},

				currentPage: 1,
				pageSize: 10,
				total: 0,
				
				currentPage1: 1,
				pageSize1: 10,
				total1: 0,
				

			}
		},
		components: {
			searchModule,
			listModule
		},
		methods: {
			/*
			 * 获取省份
			 * {params}
			 * 无	
			 * */
			queryDivision() {
				this.axios.post('/api/perTaxToolTwo/e9z/configDivision/selectDivision')
					.then(res => {
						if (res.data.code == 200) {
							this.divisionList = res.data.data;
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '获取省份失败',
							type: 'error'
						});
					})
			},
			/*
			 * 获取城市
			 * {params}
			 * 无
			 * */
			getArea() {
				this.temArea = {};
				let params = {
					"parentName": this.division
				};
				this.axios.post('/api/perTaxToolTwo/e9z/configDivision/selectArea', params)
					.then(res => {
						if (res.data.code == 200) {
							this.areaList = res.data.data;
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '获取省份失败',
							type: 'error'
						});
					})
			},
			getAreaDefault(){
				let params = {
					"parentName": this.division
				};
				this.axios.post('/api/perTaxToolTwo/e9z/configDivision/selectArea', params)
					.then(res => {
						if (res.data.code == 200) {
							this.areaList = res.data.data;
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
				
					}).catch(function(err) {
						this.$message({
							message: '获取省份失败',
							type: 'error'
						});
					})
			},
			setArea() {
				console.log(this.temArea);
				this.area = this.temArea.divisionCode;
				this.areaName = this.temArea.divisionName;
				
				this.queryFormulaList();
				this.queryInvoiceType();
				this.queryInvoiceName();
				this.queryTemplateList();
				this.resetSelect();
				this.resetFilter()
			},
			/*
			 * 获取纳税人类型下拉列表
			 * {params}
			 * 无
			 * 一般纳税，小规模纳税
			 * */
			queryDicName() {
				this.axios.post('/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=税务类型').then(res => {
					this.dicNameList = res.data.data;
				}).catch(function(err) {
					this.$message({
						message: '获取纳税人类型失败',
						type: 'error'
					});
				})
			},

			/*
			 * 获取计税方法下拉列表
			 * {params}
			 * 无
			 * 一般计税，简易计税
			 * */
			queryRateMethods() {
				this.axios.post('/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=计税方法').then(res => {
					this.taxCalcTypeList = res.data.data;
				}).catch(function(err) {
					this.$message({
						message: '获取计税方法失败',
						type: 'error'
					});
				})
			},

			/*
			 * 获取公式字符下拉列表
			 * {params}
			 * 无
			 * +-*等
			 * */
			queryCalSymbol() {
				this.axios.post('/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=公式字符').then(res => {
					this.cal = res.data.data;
				}).catch(function(err) {
					this.$message({
						message: '获取公式字符失败',
						type: 'error'
					});
				})
			},

			/*
			 * 根据发票类型获取发票名称
			 * */
			getInvoiceName(value) {
				this.formInline.invoiceName = "";
				this.invoiceNameList = value.invoiceList;
			},
			/*
			 * 根据发票名称获取税种及相关列类型
			 * */
			getE9zConfigInvoice(value) {
				this.e9zConfigInvoiceColumnList = value.e9zConfigInvoiceColumnList;
				this.e9zConfigInvoiceTaxesList = value.e9zConfigInvoiceTaxesList;
				this.e9zConcat = this.e9zConfigInvoiceColumnList.concat(this.e9zConfigInvoiceTaxesList);
				this.e9zConcat.forEach((item, index) => {
					item.tag = index;
				})
			},
			/*
			 * 根据模板名称获取相关列类型
			 * */
			getColumnTitle(value) {
				this.e9zConfigInvoiceColumn = value.e9zConfigInvoiceColumnList;
				this.e9zConfigInvoiceColumn.forEach((item, index) => {
					item.tag = index;
				})
			},

			/*
			 * 根据税种及相关列获取已有的计算公式
			 * */
			setFormula(value) {
				console.log(value)
				this.formInline.formula = value.formula ? value.formula : '';
			},
			/*
			 * 获取右侧税种公式列表
			 * */
			queryFormulaList() {
				var _this = this;
				let params = {
					taxesTaxType: this.searchTaxesTaxType,
					taxCalcType: this.searchTaxCalcType,
					tmplShowType: this.searchTmplShowType,
					invoiceType: this.searchInvoiceType,
					invoiceName: this.searchInvoiceName,
					tmplName: this.searchTmplName,
					columnTitle: this.searchColumnTitle,
					area:this.area
				};
				this.axios.post('/api/perTaxToolTwo/e9z/configInvoiceFormula/selectFormulaList?currentPage=' + this.currentPage +
						'&pageCount=' + this.pageSize, params)
					.then(res => {
						if (res.data.code == 200) {
							this.formulaList = res.data.data.list;
							this.length = this.formulaList.length;
							this.total = res.data.data.total;
							for (let i = 0; i < _this.pageSize - _this.length; i++) {
								_this.formulaList.push({});
							}
							console.log(this.formulaList)
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
			/*
			 * 点击公式字符和中文字符生成公式
			 * 
			 * */
			createFormula(value) {
				this.formInline.formula += value;
			},

			/*
			 * 判断公式合法性并创建公式
			 * 
			 * */
			judgeRegExp(formName) {
				if (this.regExpUtil.formulaRegExp(this.formInline.formula).type == 'success') {
					this.$message({
						message: this.regExpUtil.formulaRegExp(this.formInline.formula).msg,
						type: 'success'
					});
					if (this.formInline.tmplShowType == '0') {
						var params = {
							invoiceTaxesId: this.formInline.e9z.columnId || this.formInline.e9z.invoiceTaxesId,
							formulaId: this.formInline.e9z.formulaId,
							taxesTaxType: this.formInline.taxesTaxType,
							formula: this.formInline.formula,
							type: this.formInline.e9z.columnId ? 2 : 1,
							taxesTitle: this.formInline.e9z.taxesTitle,
						};
					} else {
						var params = {
							invoiceTaxesId: this.formInline.columnTitle.columnId,
							formulaId: this.formInline.columnTitle.formulaId,
							taxesTaxType: this.formInline.taxesTaxType,
							formula: this.formInline.formula,
							type: 2
						};
					}

					this.axios.post('/api/perTaxToolTwo/e9z/configInvoiceFormula/updateInvoiceFormulaById', params).then(res => {
						if (res.data.code == 200) {
							this.$message({
								message: '公式添加成功',
								type: 'success'
							});
							this.resetSelect();
							this.formInline.tmplShowType = '0';
							this.queryFormulaList();
						} else {
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}

					}).catch(function(err) {
						this.$message({
							message: '公式添加失败',
							type: 'error'
						});
					})
					// this.showCommitBtn = true;
				} else {
					this.$message.error(this.regExpUtil.formulaRegExp(this.formInline.formula));
					// this.showCommitBtn = false;
				}
			},
			/*
			 * 清空公式按钮
			 * 
			 * */
			resetFormula() {
				this.formInline.formula = "";
			},
			resetSelect(val) {
				this.formInline.taxCalcType = '';
				this.formInline.invoiceType = '';
				this.formInline.invoiceName = '';
				this.formInline.e9z = '';
				this.formInline.tmplName = '';
				this.formInline.columnTitle = '';
				this.formInline.formula = '';
			},

			resetFilter(val) {
				this.searchTaxCalcType = '';
				this.searchInvoiceType = '';
				this.searchInvoiceName = '';
				this.searchTmplName = '';
				this.searchColumnTitle = '';
			},


			/*
			 * 查询右侧发票类型下拉列表
			 * {params}
			 * 无
			 * */
			queryInvoiceType() {
				let params = {
					"area":this.area
				};
				this.axios.post('/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceTypeByAreaAndState', params).then(res => {
					this.invoiceTypeSearchList = res.data.data;
				}).catch(function(err) {
					this.$message({
						message: '获取发票类型失败',
						type: 'error'
					});
				})
			},
			/*
			 * 查询右侧发票名称下拉列表
			 * {params}
			 * 无
			 * */
			queryInvoiceName() {
				let params = {
					"area":this.area
				};
				this.axios.post('/api/perTaxToolTwo/e9z/invoiceListInfo/findInvoiceName', params).then(res => {
					this.invoiceNameSearchList = res.data.data;
				}).catch(function(err) {
					this.$message({
						message: '获取发票名称失败',
						type: 'error'
					});
				})
			},
			/*
			 * 查询右侧模板名称下拉列表
			 * {params}
			 * 无
			 * */
			queryTemplateList() {
				let params = {
					"area":this.area
				};
				this.axios.post('/api/perTaxToolTwo/e9z/configTemplate/findTemplateList', params).then(res => {
					this.templateListSearchList = res.data.data;
				}).catch(function(err) {
					this.$message({
						message: '获取模板名称失败',
						type: 'error'
					});
				})
			},
			/*
			 * 公式过滤
			 * {params}
			 * 无
			 * */
			filterFormula() {
				this.queryFormulaList();
			},
			/*
			 * 公式过滤
			 * {params}
			 * 无
			 * */
			downLoad() {
				var sheet = this.xlsx.utils.json_to_sheet(this.formulaList);
				this.openDownloadDialog(this.sheet2blob(sheet), '税种公式.xlsx');
			},
			sheet2blob(sheet, sheetName) {
				sheetName = sheetName || 'sheet1';
				var workbook = {
					SheetNames: [sheetName],
					Sheets: {}
				};
				workbook.Sheets[sheetName] = sheet;
				// 生成excel的配置项
				var wopts = {
					bookType: 'xlsx', // 要生成的文件类型
					bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
					type: 'binary'
				};
				var wbout = this.xlsx.write(workbook, wopts);
				var blob = new Blob([s2ab(wbout)], {
					type: "application/octet-stream"
				});
				// 字符串转ArrayBuffer
				function s2ab(s) {
					var buf = new ArrayBuffer(s.length);
					var view = new Uint8Array(buf);
					for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
					return buf;
				}
				return blob;
			},
			openDownloadDialog(url, saveName) {
				if (typeof url == 'object' && url instanceof Blob) {
					url = URL.createObjectURL(url); // 创建blob地址
				}
				var aLink = document.createElement('a');
				aLink.href = url;
				aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
				var event;
				if (window.MouseEvent) event = new MouseEvent('click');
				else {
					event = document.createEvent('MouseEvents');
					event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				}
				aLink.dispatchEvent(event);
			},

			/*
			 * 分页事件
			 * {params}
			 * 无
			 * */
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryFormulaList();
				console.log(`当前页: ${val}`);
			}
		},
		watch: {
			"formInline.taxesTaxType": {
				handler(val, oldVal) {
					let params = {
						"taxesTaxType": val,
						"tmplShowType": this.formInline.tmplShowType,
						"area":this.area
					};
					this.axios.post('/api/perTaxToolTwo/e9z/configColumn/findFormulaTitleList', params).then(res => {
						this.formulaTitleList = res.data.data;
					}).catch(function(err) {
						this.$message({
							message: '获取公式标题失败',
							type: 'error'
						});
					})
				},
				deep: true

			},
			"formInline.taxCalcType": {
				handler(val, oldVal) {
					let params = {
						"taxCalcType": this.formInline.taxCalcType,
						"taxesTaxType": this.formInline.taxesTaxType,
						"tmplShowType": this.formInline.tmplShowType,
						"area":this.area
					};
					this.axios.post('/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceFormula', params).then(res => {
						this.invoiceTypeList = res.data.data;
					}).catch(function(err) {
						this.$message({
							message: '获取发票/模板公式失败',
							type: 'error'
						});
					})
				},
				deep: true



			},
			"formInline.tmplShowType": {
				handler(val, oldVal) {
					let params = {
						"taxesTaxType": this.formInline.taxesTaxType,
						"tmplShowType": this.formInline.tmplShowType,
						"area":this.area
					};
					this.axios.post('/api/perTaxToolTwo/e9z/configColumn/findFormulaTitleList', params).then(res => {
						this.formulaTitleList = res.data.data;
					}).catch(function(err) {
						this.$message({
							message: '获取模板名称失败',
							type: 'error'
						});
					})
					if (val == 1) {
						let params = {
							"taxesTaxType": this.formInline.taxesTaxType,
							"tmplShowType": this.formInline.tmplShowType,
							"area":this.area
						};
						this.axios.post('/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceFormula', params).then(res => {
							this.templateTypeList = res.data.data;
						}).catch(function(err) {
							this.$message({
								message: '获取发票/模板公式失败',
								type: 'error'
							});
						})
					}
				},
				deep: true
			}
		},
		computed: {},
		created() {
			this.queryDicName();
			this.queryRateMethods();
			this.queryFormulaList();
			this.queryCalSymbol();
			this.queryInvoiceType();
			this.queryInvoiceName();
			this.queryTemplateList();
			this.queryDivision();
			this.getAreaDefault()
		}
	}
</script>

<style lang='less' scoped>
	@button: #4cb6dc;
	@button_orange: #ffbb84;
	@blue: #4bb6dc;
	@orange: #ffb980;
	@pcolor: #999;
	@scolor: #ed878e;

	/*滚动条样式*/
	::-webkit-scrollbar {
		width: 0.04rem;
		/*height: 4rem;*/
	}

	::-webkit-scrollbar-thumb {
		border-radius: 0.10rem;
		-webkit-box-shadow: inset 0 0 0.05rem rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 0.05rem rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);

	}


	.blue {
		color: @blue
	}

	.main_contain {
		padding: 0.2rem;
		width: calc(100% - 0.4rem);
		height: calc(100% - 0.4rem);



		/deep/ input::-webkit-input-placeholder {
			/* placeholder颜色  */
			color: #fff;
		}


	}

	.left_contain {
		width: calc(50% - 0.15rem);
		background: #fff;
		border-radius: 0.06rem;
		float: left;
		height: 100%;

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
			padding: 0.2rem 0.2rem 0rem;
			height: calc(100% - 2rem);
			box-sizing: border-box;
			overflow-y: scroll;
		}

		/deep/ .el-form {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;

			/deep/ .el-form-item {
				margin-right: 0rem;

				label {
					// width: 1rem;
					font-size: 0.14rem;
					padding: 0 0.12rem 0 0;
				}

				.el-form-item__content {}

			}

			/deep/ .el-form-item.long {
				label {
					// width: 1.4rem;
				}

			}

			/deep/ .el-form-item.line {
				width: 100%;

				.el-form-item__content {
					width: calc(100% - 1rem);

					.el-input {
						width: calc(100% - 1.4rem);

						.el-input__inner {
							width: 100%;
						}

					}

					.el-button {
						width: 1.2rem;
						margin-left: 0.2rem;
						background-color: @orange;
						border-color: @orange;
					}
				}
			}
		}

		/deep/ .el-input__inner {
			width: 1.2rem;
		}

		p {
			color: @pcolor;
			font-size: 0.14rem;
			line-height: 0.30rem;

			span {
				color: @scolor;
			}
		}

		.el-button.confirm {
			display: block;
			margin: 0.4rem auto;
			width: 2.8rem;
			height: 0.7rem;
			font-size: 0.18rem;
		}
	}

	.right_contain {
		width: calc(50% - 0.15rem);
		height: 100%;
		float: right;
		background: #fff;
		border-radius: 0.06rem;
		box-sizing: border-box;
		padding: 20px;
		.contain_header {
			height: 2rem;
			box-sizing: border-box;
			padding: 0.2rem 0.2rem;
			display: flex;
			flex-direction: row;

			background: url(../assets/img/list-bg2.png) no-repeat;
			background-size: cover;
			border-top-left-radius: 0.06rem;
			border-top-right-radius: 0.06rem;

			/deep/ .el-select__caret {
				color: #fff;
				line-height: 0.4rem;
			}

			/deep/ .el-input__inner {
				border: 0.01rem solid #fff;
				line-height: 0.4rem;
    			height: 0.4rem;
			}

			/deep/ .el-button {
				background: #fff;
				color: @button_orange;
				width: 1.05rem;
				height: 1.20rem;
				margin-left: 0.30rem;
				border-color: #fff;
				font-size: 0.18rem;
				letter-spacing: 0.05rem;
				line-height: 2;
			}
		}

		/deep/ .el-form-item__label {
			color: #fff;
			font-size: 0.14rem
		}

		/deep/ .el-form {
			width: calc(100% - 1.35rem);
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
			// align-content: space-between;

			.el-form-item {
				margin-right: 0rem
			}
		}

		/deep/.el-form-item {
			/* width: 25%; */
			margin-bottom: 0rem;
		}

		/deep/ .info {
			width: 100%;
			margin-top: 0.20rem;

			/deep/ .el-button {
				float: right;
				background: #fff;
				color: @button;
				width: 1.30rem;
				height: 0.40rem;
				border-color: #fff
			}

			.large {
				font-size: 0.30rem;
				color: #fff
			}

			.mini {
				font-size: 0.16rem;
				color: #fff;
				margin-left: 0.20rem;
			}
		}

		/deep/ .el-input__inner {
			border: 0.01rem solid #fff;
			background: transparent;
			color: #fff;
			width: 1.5rem
		}
	}

	.contain_body {
		h3 {
			margin-top: 0.24rem;
			height: 0.60rem;
			line-height: 0.60rem;
			font-size: 0.18rem;
			color: #333;
			padding-left: 0.30rem;

			span {
				font-size: 0.14rem;
				color: #ccc;
				margin-left: 0.18rem;
				font-weight: normal;
			}
		}

		li {
			font-size: 0.14rem;
			height: 0.28rem;
			line-height: 0.28rem;
			color: #454545;
			padding-left: 0.30rem;

			span.span1 {

				width: 1.60rem;
			}

			span.span2 {

				width: 1.60rem;
			}

			span.span3 {
				max-width: calc(100% - 3.90rem);
			}

			.formula {
				float: left;
				/* max-width: calc(100% - 140rem); */
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		span.blue {
			float: left;
			font-size: 0.14rem;
			margin-left: 0.10rem;
		}

		
	}
	/deep/ .el-pagination {
		text-align: right;
		margin-top: 0.10rem;
	}
</style>

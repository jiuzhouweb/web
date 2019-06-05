<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="省份选择:">
						<el-select v-model="formInline.province" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="城市选择:">
						<el-select v-model="formInline.area" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">确认城市</el-button>
					</el-form-item>
				</el-form>
				<div class='info clearfix'>
					<span class='large'>公式配备</span>
					<span class='mini'>查看已配备公式>></span>
					<el-button type="primary">下载资料</el-button>
				</div>
			</div>
			<div class="contain_body">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" label-position='left'>
					<el-form-item label="纳税人类型:" class='short'>
						<el-select v-model="taxesTaxType" placeholder="活动区域">
							<el-option v-for='item in dicNameList' :label="item.dicName" :value="item.dicValue"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="公式类型:">
						<el-select v-model="tmplShowType" placeholder="活动区域">
							<el-option label="发票" value="0"></el-option>
							<el-option label="其他模板" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="计税方法:" v-show='tmplShowType=="0"' class='long'>
						<el-select v-model="taxCalcType" placeholder="活动区域">
							<el-option v-for='item in taxCalcTypeList' :label="item.dicName" :value="item.dicValue"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发票类型:" v-show='tmplShowType=="0"'>
						<el-select v-model="invoiceType" placeholder="活动区域" @change='getInvoiceName' value-key='typeString'>
							<el-option v-for='item in invoiceTypeList[0].list' :label="item.typeString" :value="item"></el-option>
							<!-- <el-option label="区域二" value="shanghai"></el-option> -->
							<!-- <el-option label="区域二" value="beijing"></el-option> -->
						</el-select>
					</el-form-item>
					<el-form-item label="发票名称:" v-show='tmplShowType=="0"'>
						<el-select v-model="invoiceName" placeholder="活动区域" @change='getE9zConfigInvoice' value-key='invoiceId'>
							<el-option v-for='item in invoiceNameList' :label="item.invoiceName" :value="item"></el-option>

							<!-- <el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option> -->
						</el-select>
					</el-form-item>
					<el-form-item label="税种及相关列类型:" v-show='tmplShowType=="0"' class='long'>
						<el-select v-model="e9z" placeholder="活动区域" @change='setFormula' value-key='invoiceId'>
							<el-option v-for='item in e9zConcat' :label="item.columnTitle || item.taxesTitle" :value="item"></el-option>

							<!-- <el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option> -->
						</el-select>
					</el-form-item>
					<el-form-item label="模板名称:" v-show='tmplShowType=="1"'>
						<el-select v-model="formInline.user" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="相关列类型:" v-show='tmplShowType=="1"'>
						<el-select v-model="formInline.user" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="计算公式" prop="name" class='line'>
						<el-input v-model='formula' ref='inp'></el-input>
						<el-button type='warning' @click='judgeRegExp'>确定</el-button>
					</el-form-item>
					<el-form-item style='margin-bottom: 10px;'>
						<div>
							<el-button v-for='item in cal' @click='createFormula(item)'>{{item}}</el-button>
						</div>

					</el-form-item>

					<el-form-item>
						<div>
							<el-button type='mini' @click='createFormula(item)' :disabled='isDisable >= item.columnCalcIndex' v-for='item in e9zConcat'>{{item.columnTitle || item.taxesTitle +'税率'}}</el-button>
						</div>

					</el-form-item>
				</el-form>
				<div v-if='showCommitBtn'>
					<p>我们将根据您输入的 <span>'发票类型' '税种类型'</span> 还有 <span>'税种公式'</span> ，及时的做出相应的计算公式反馈。</p>
					<p>公式：{{formula}}</p>
				</div>
				<el-button type="danger" class='confirm' v-if='showCommitBtn' @click='comfirmAdd'>确认并添加</el-button>
			</div>
		</div>
		<div class="right_contain">
			<div class="contain_header">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="省份选择:">
						<el-select v-model="formInline.province" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="城市选择:">
						<el-select v-model="formInline.area" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="纳税人类型:" style='text-align: right;'>
						<el-select v-model="formInline.area" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发票类型:">
						<el-select v-model="formInline.area" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="税种类型:">
						<el-select v-model="formInline.area" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item style='text-align: right;'>
						<el-button type="primary">立即查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="contain_body">
				<h3>税种公式</h3>
				<ul>
					<li v-for="item in formulaList">
						<span class='formula' :title='item.formula'>{{item.formula}}</span>
						<span class='blue' v-if='item.formula'>查看</span>
					</li>
				</ul>


				<el-pagination background layout="prev, pager, next" :total="total" :page-size=15 @current-change='handleCurrentChange'
				 :current-page="currentPage">
				</el-pagination>
			</div>

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
					province: '',
					area: ''
				},
				taxesTaxType: "",
				taxCalcType: '',
				tmplShowType: "0",
				invoiceType: "",
				invoiceName: '',
				e9z: "",
				formula: "",
				isDisable: "",
				currentPage: 1,
				pageSize: 13,
				total: 0,
				showCommitBtn:false,

				dicNameList: [],
				taxCalcTypeList: [],
				invoiceTypeList: [{
					list: "",
				}],
				invoiceNameList: [],
				e9zConfigInvoiceColumnList: [],
				e9zConfigInvoiceTaxesList: [],
				e9zConcat: [],
				formulaList: [],

				cal: ["+", "-", "*", "/", "(", ")", ",", "if", "<", ">", "="]

			}
		},
		components: {
			searchModule,
			listModule
		},
		methods: {
			queryDicName() {
				this.axios.post('/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=税务类型').then(res => {
					this.dicNameList = res.data.data;
					// console.log(this.dicNameList)
				})
			},
			queryRateMethods() {
				this.axios.post('/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=计税方法').then(res => {
					this.taxCalcTypeList = res.data.data;
					// console.log(this.dicNameList)
				})
			},
			getInvoiceName(value) {
				this.invoiceName = "";
				this.invoiceNameList = value.invoiceList;
			},
			getE9zConfigInvoice(value) {
				this.e9zConfigInvoiceColumnList = value.e9zConfigInvoiceColumnList;
				this.e9zConfigInvoiceTaxesList = value.e9zConfigInvoiceTaxesList;
				this.e9zConcat = this.e9zConfigInvoiceColumnList.concat(this.e9zConfigInvoiceTaxesList);
			},
			setFormula(value) {
				console.log(value)
				this.formula = value.formula;
				this.isDisable = value.columnCalcIndex;
				// if(){
				// 	
				// }
			},
			queryFormulaList() {
				let params = {
					tmplShowType: 0
				};
				this.axios.post('/api/perTaxToolTwo/e9z/configInvoiceFormula/selectFormulaList?currentPage=' + this.currentPage +
						'&pageCount=' + this.pageSize, params)
					.then(res => {
						this.formulaList = res.data.data.list;
						this.total = res.data.data.total;
						for (let i = 0; i < this.pageSize - this.formulaList.length; i++) {
							this.formulaList.push({});
						}
						// console.log(this.dicNameList)
					})
			},
			createFormula(value) {
				if (typeof value == 'object') {
					this.formula += value.columnTitle || value.taxesTitle + '税率';
					this.$refs.inp.$el.children[0].focus();
				} else {
					this.formula += value;
					this.$refs.inp.$el.children[0].focus();
				}

				// let len = this.formula.length;
				// if (document.selection) {
				// 	var sel = this.$refs.inp.$el.children[0].createTextRange();
				// 	sel.moveStart('character', len);
				// 	sel.collapse();
				// 	sel.select();
				// } else if (typeof this.$refs.inp.$el.children[0].selectionStart == 'number' && typeof this.$refs.inp.$el.children[0].selectionEnd == 'number') {
				// 	this.$refs.inp.$el.children[0].selectionStart = this.$refs.inp.$el.children[0].selectionEnd = len;
				// }
			},
			judgeRegExp() {
				if (this.regExpUtil.formulaRegExp(this.formula).type == 'success') {
					this.$message({
						message: this.regExpUtil.formulaRegExp(this.formula).msg,
						type: 'success'
					});
					this.showCommitBtn = true;
				} else {
					this.$message.error(this.regExpUtil.formulaRegExp(this.formula));
					this.showCommitBtn = false;
				}
				// this.$message.error(this.regExpUtil.formulaRegExp(this.formula));
				// console.log(this.regExpUtil.formulaRegExp(this.formula))
			},
			comfirmAdd(){
				
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryFormulaList();
				console.log(`当前页: ${val}`);
			}
		},
		watch: {
			taxCalcType() {
				let params = {
					"taxCalcType": this.taxCalcType,
					"taxesTaxType": this.taxesTaxType,
					"tmplShowType": this.tmplShowType
				};
				this.axios.post('/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceFormula', params).then(res => {
					this.invoiceTypeList = res.data.data;
					// console.log(this.dicNameList)
				})
			}
		},
		computed: {},
		created() {
			this.queryDicName();
			this.queryRateMethods();
			this.queryFormulaList();
		}
	}
</script>

<style lang='less' scoped>
	@button: #4cb6dc;
	@blue: #4bb6dc;
	@orange: #ffb980;
	@pcolor: #999;
	@scolor: #ed878e;

	.blue {
		color: @blue
	}

	.main_contain {
		height: 100%;



		/deep/ input::-webkit-input-placeholder {
			/* placeholder颜色  */
			color: #fff;
		}
	}

	.left_contain {
		width: calc(50% - 15px);
		background: #fff;
		border-radius: 6px;
		float: left;
		height: 100%;

		.contain_header {
			height: 200px;
			box-sizing: border-box;
			padding: 40px 30px;
			background: url(../assets/img/list-bg1.png);
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;

			/deep/ .el-button {
				background: #fff;
				color: @button;
				width: 130px;
				height: 40px;
				border-color: #fff
			}

			/deep/ .el-form-item__label {
				color: #fff
			}

			/deep/ .el-form {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.el-form-item {
					margin-right: 0px
				}
			}

			/deep/ .info {
				width: 100%;
				margin-top: 20px;

				/deep/ .el-button {
					float: right;
					background: #fff;
					color: @button;
					width: 130px;
					height: 40px;
					border-color: #fff
				}

				.large {
					font-size: 30px;
					color: #fff
				}

				.mini {
					font-size: 16px;
					color: #fff;
					margin-left: 20px;
				}
			}

			/deep/ .el-input__inner {
				border: 1px solid #fff;
				background: transparent;
				color: #fff;
				width: 180px
			}
		}

		.contain_body {
			padding: 40px 40px 0px;

			/deep/ .el-form {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: wrap;

				/deep/ .el-form-item {
					margin-right: 0px;

					label {
						width: 88px;
					}

					.el-form-item__content {}

				}

				/deep/ .el-form-item.long {
					label {
						width: 130px;
					}

				}

				/deep/ .el-form-item.line {
					width: 100%;

					.el-form-item__content {
						width: calc(100% - 88px);

						.el-input {
							width: calc(100% - 140px);

							.el-input__inner {
								width: 100%;
							}

						}

						.el-button {
							width: 120px;
							margin-left: 20px;
							background-color: @orange;
							border-color: @orange;
						}
					}
				}
			}

			/deep/ .el-input__inner {
				width: 120px;
			}

			p {
				color: @pcolor;
				font-size: 14px;
				line-height: 30px;

				span {
					color: @scolor;
				}
			}

			.el-button.confirm {
				display: block;
				margin: auto;
				width: 280px;
				height: 70px;
				font-size: 18px;
				margin-top: 40px;
			}
		}
	}

	.right_contain {
		width: calc(50% - 15px);
		height: 100%;
		float: right;
		background: #fff;
		border-radius: 6px;

		.contain_header {
			height: 200px;
			box-sizing: border-box;
			padding: 40px 30px;
			display: flex;
			flex-direction: row;

			background: url(../assets/img/list-bg2.png);
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;

			/deep/ .el-button {
				background: #fff;
				color: @button;
				width: 130px;
				height: 40px;
				border-color: #fff
			}

			/deep/ .el-form-item__label {
				color: #fff
			}

			/deep/ .el-form {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: wrap;
				align-content: space-between;

				.el-form-item {
					margin-right: 0px
				}
			}

			/deep/.el-form-item {
				width: 33%;
				margin-bottom: 0px;
			}

			/deep/ .info {
				width: 100%;
				margin-top: 20px;

				/deep/ .el-button {
					float: right;
					background: #fff;
					color: @button;
					width: 130px;
					height: 40px;
					border-color: #fff
				}

				.large {
					font-size: 30px;
					color: #fff
				}

				.mini {
					font-size: 16px;
					color: #fff;
					margin-left: 20px;
				}
			}

			/deep/ .el-input__inner {
				border: 1px solid #fff;
				background: transparent;
				color: #fff;
				width: 150px
			}
		}

		.contain_body {
			h3 {
				margin-top: 24px;
				height: 60px;
				line-height: 60px;
				font-size: 18px;
				color: #333;
				padding-left: 30px;
			}

			li {
				font-size: 14px;
				height: 28px;
				line-height: 28px;
				color: #454545;
				padding-left: 30px;

				.formula {
					float: left;
					max-width: calc(100% - 80px);
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			span.blue {
				float: left;
				font-size: 14px;
				margin-left: 10px;
			}

			/deep/ .el-pagination {
				text-align: right;
				margin-top: 10px;
			}
		}
	}
</style>

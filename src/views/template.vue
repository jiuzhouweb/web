<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<div class='title'>发票模板配置</div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
					<el-form-item label="模板名称:">
						<el-input v-model='formInline.name'></el-input>
					</el-form-item>
					<el-form-item label="纳税人类型:">
						<el-select v-model='formInline.customId'>
							<el-option v-for='item in dicNameList' :label="item.customerName" :value="item.customerId"></el-option>
						</el-select>
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
		},
		methods: {
			/*
			 * 获取纳税人类型下拉列表
			 * {params}
			 * 无
			 * 一般纳税，小规模纳税
			 * */
			queryDicName() {
				this.axios.post('/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=税务类型').then(res => {
					this.dicNameList = res.data.data;
				}).catch(function(err) {
					this.$message({
						message: '获取纳税人类型失败',
						type: 'error'
					});
				})
			},
			
			queryTemplateList(){
				let params = {
					// state:1
				};
				this.axios.post('/perTaxToolTwo/e9z/configTemplate/findTemplateListByTypeAndName', params)
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
			}

		},
		watch: {},
		computed: {},
		created() {
			this.queryDicName();
			this.queryTemplateList()
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

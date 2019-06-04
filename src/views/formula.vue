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
						<el-button type="primary" @click="onSubmit">确认城市</el-button>
					</el-form-item>
				</el-form>
				<div class='info clearfix'>
					<span class='large'>公式配备</span>
					<span class='mini'>查看已配备公式>></span>
					<el-button type="primary" @click="onSubmit">下载资料</el-button>
				</div>
			</div>
			<div class="contain_body">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="纳税人类型:">
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
					<el-form-item label="计税方法:" v-show='tmplShowType=="0"'>
						<el-select v-model="taxCalcType" placeholder="活动区域">
							<el-option v-for='item in taxCalcTypeList' :label="item.dicName" :value="item.dicValue"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发票类型:" v-show='tmplShowType=="0"'>
						<el-select v-model="formInline.dicName" placeholder="活动区域">
							<el-option label="区域二" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发票名称:" v-show='tmplShowType=="0"'>
						<el-select v-model="formInline.user" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="税种及相关列类型:" v-show='tmplShowType=="0"'>
						<el-select v-model="formInline.user" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
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
				</el-form>
			</div>
		</div>
		<div class="right_contain">
			<div class="contain_header"></div>
			<div class="contain_body"></div>

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
				dicNameList: [],
				taxCalcTypeList: []
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
					console.log(this.dicNameList)
				})
			},
			queryRateMethods() {
				this.axios.post('/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=计税方法').then(res => {
					this.taxCalcTypeList = res.data.data;
					console.log(this.dicNameList)
				})
			},
			onSubmit() {
				console.log('submit!');
			}
		},
		watch: {
			taxCalcType() {
				alert(1)
				let params = {
					"taxCalcType": this.taxCalcType,
					"taxesTaxType":this.taxesTaxType,
					"tmplShowType":this.tmplShowType
				};
				this.axios.post('/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceFormula',params).then(res => {
					this.fapiaotypeList = res.data.data;
					console.log(this.dicNameList)
				})
			}
		},
		computed: {
		},
		created() {
			this.queryDicName();
			this.queryRateMethods();
		}
	}
</script>

<style lang='less' scoped>
	@button: #4cb6dc;

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
	}

	.right_contain {
		width: calc(50% - 15px);
		height: 100%;
		float: right;
		background: purple;

		.contain_header {
			height: 200px;
			box-sizing: border-box;
			padding-top: 20px;

			background: url(../assets/img/list-bg2.png);
		}
	}
</style>

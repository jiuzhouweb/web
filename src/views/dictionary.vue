<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<div class='title'>字典表配置</div>
				<div>
					<el-button @click='addFirstMenu'>添加一级条目</el-button>
					<el-button>删除</el-button>
					<el-button>刷新</el-button>
				</div>
				
			</div>
			<div class="contain_body">
				<el-table :data="tableList" style="width: 100%" stripe border>
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
							<el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">添加子条目</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '4')})"
				 :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</div>
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
			}
		},
		components: {
		},
		methods:{
			getList(){
				let params = {
					// state:1
				};
				this.axios.post('/perTaxToolTwo/e9z/configDictionary/queryTree',params)
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
						message: '获取历史失败',
						type: 'error'
					});
				})
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

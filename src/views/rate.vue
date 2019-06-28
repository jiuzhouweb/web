<template>
	<div class="main_contain">
		<div class="left_contain">
			<div class="contain_header">
				<span class='title'>税率配置</span>
				<el-button class='right'>新增税率</el-button>
			</div>
			<div class="contain_body">
				<el-table :data="rateList" style="width: 100%" stripe border>
					<el-table-column align="center" label="税率名称" prop="dicName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="税率" prop="dicValue" :resizable="false"></el-table-column>
				</el-table>
			</div>
		</div>
		<div class="right_contain">
			<div class="contain_header">
				<span class='title'>发票税率关联配置</span>
			</div>
			<div class="contain_body">
				<el-table :data="tableList" style="width: 100%" stripe border>
					<el-table-column align="center" label="发票名称" prop="dicName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="发票分类" prop="dicName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="发票类型" prop="dicName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="区域代码" prop="dicName" :resizable="false"></el-table-column>
					<el-table-column align="center" label="计税方式" prop="dicValue" :resizable="false"></el-table-column>
					<el-table-column align="center" label="操作" prop="roleId" :resizable="false">
						<template slot-scope="scope">
							<span>编辑</span>
						</template>
					</el-table-column>
				</el-table>
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
				rateList:[
					
					
				],
			}
		},
		components: {
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
			span.title{
				font-size: 0.28rem;
				color: #fff
			}
			/deep/ .el-button{
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
		
		.contain_header {
			height: 2rem;
			// line-height: 2rem;
			padding: 0px 30px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			background: url(../assets/img/list-bg2.png) no-repeat;
			background-size: cover;
			align-items: center;
			span.title{
				font-size: 0.28rem;
				color: #fff
			}
			/deep/ .el-button{
				color: #43b3db
			}
		}
		.contain_body {
			padding: 0.2rem 0.2rem;
			background: #fff
		}
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

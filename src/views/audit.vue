<template>
	<div class="main_contain">
		<div class='search_contain'>
			<div class="row1">
				<span class="labelTitle">
					客户名称：
				</span>
				<el-select v-model="searchList.value" placeholder="请选择">
					<el-option v-for="item in $store.state.cust" :key="item.customerId" :label="item.customerName" :value="item.customerId">
					</el-option>
				</el-select>
			</div>
			<div class="row2" style="margin-left:0.2rem">
				<span class="labelTitle">
					账期：
				</span>
				<el-date-picker v-model="searchList.nowDate" type="month" placeholder="选择月">
				</el-date-picker>
			</div>
			<div class="searchButton" @click="search()">查询</div>
		</div>
		<div class='body_contain'>
			<div class='card' v-for="item in 5">
				<div class='card_head'>
					<p>南京测试客户</p>
					<p>2018-12</p>
					<p>大额审核</p>
					<p>税金：800000元</p>
				</div>
				<div class='card_body'>
					<p>责任会计：aaa</p>
					<p>工号：bbb</p>
					<p>税务类型：ccc</p>
				</div>
				<div class='card_btn'>
					<el-button>发回重做</el-button>
					<el-button>审核通过</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "router1",
		data() {
			return {
				message: "12334456",
				searchList: {
					value: "",
					nowDate: ""
				},
			}
		},
		components: {}
	}
</script>

<style scoped lang="less">
	.main_contain {
		height: 100%;
		margin: 20px;
	}

	div.search_contain {
		/* width: 1180rem; */
		/* height: 78rem; */
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		/* justify-content: space-between; */
		border-top-left-radius: 0.05rem;
		border-top-right-radius: 0.05rem;
		background: #fff;
		padding: 0.20rem 0.20rem;
	}
	div.body_contain{
		margin-top: .2rem;
		
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: start;
		.card{
			width: calc((100% - 0.8rem) / 5);
			margin-right: .2rem;
			background: #fff;
			height: 4.85rem;
		}
		.card:nth-of-type(5n){
			margin-right: 0rem;
		}
	}
	.searchButton {
	  background: #ffb980;
	  color: #fff;
	  border-radius: 0.05rem;
	  cursor: pointer;
	  padding: 0.07rem 0.35rem;
	  margin-left:0.2rem
	}
</style>

<template>
	<div class="main_contain">
		<div class="left_contain">
			<searchModule></searchModule>
			<listModule></listModule>
		</div>
		<div class="right_contain">
			<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
		</div>
	</div>
</template>

<script>
	import searchModule from "../components/customer/searchModule.vue"
	import listModule from "../components/customer/listModule.vue"
	export default {
		name: "customer",
		data() {
			return {
				message: "12334456"
			}
		},
		components: {
			searchModule,
			listModule
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					title: {
						text: ''
					},
					tooltip: {},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}]
				});
			}
		},
	}
</script>

<style scoped>
	.main_contain {
		height: 100%;
	}

	.left_contain {
		width: 1180px;
		/* background: pink; */
		float: left;
		height: 100%;
	}

	.right_contain {
		width: 420px;
		height: 100%;
		float: right;
		background: purple;
	}
</style>

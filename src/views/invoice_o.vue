<template>
	<div class="main_contain">
		<div class="left_contain">
			<searchModule></searchModule>
			<listModule></listModule>
		</div>
		<div class="right_contain">
			<div class="charts">
				<p class="chartsTitle">收入合计</p>
				<div id="myChart" :style="{width: '100%', height: '200px'}"></div>
			</div>
			<div class="chartsTable">
				<el-table :data="tableData" border style="width: 90%;margin-left:5%">
					<el-table-column prop="date" label="税种" width="50" align="center">
						<template slot-scope="scope">
			        			<i class="el-icon-time"></i>
</template>
					</el-table-column>
					<el-table-column prop="name" label="票面金额" align="right" header-align="center" >
					</el-table-column>
					<el-table-column prop="address" label="收入不含税" align="right" header-align="center" >
					</el-table-column>
					<el-table-column prop="price" label="销项税额" align="right" header-align="center" >
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import searchModule from "../components/invoice_o/searchModule.vue";
import listModule from "../components/invoice_o/listModule.vue";
export default {
  name: "router1",
  data() {
    return {
      message: "12334456",
      echarts1_option: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "138233.00",
          address: "3456.00",
          price: "20000.00"
        },
        {
          date: "2016-05-02",
          name: "138233.00",
          address: "3456.00",
          price: "20000.00"
        },
        {
          date: "2016-05-02",
          name: "138233.00",
          address: "3456.00",
          price: "20000.00"
        },
        {
          date: "2016-05-02",
          name: "138233.00",
          address: "3456.00",
          price: "20000.00"
        },
        {
          date: "2016-05-02",
          name: "138233.00",
          address: "3456.00",
          price: "20000.00"
        }
      ]
    };
  },
  components: {
    searchModule,
    listModule
  },
  mounted() {
	// this.drawLine();
	this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      // /api/user/getLoginUserInfo.do
      axios.get("/log/api/user/getLoginUserInfo.do").then(res => {
        console.log("获取用户信息", res);
        if (res.data.code == 200) {

        }
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.echarts1_option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "40%", //图例距离左的距离
          top: "10%",
          padding: [0, 0, 60, 30],
          // y: 'center', //图例上下居中
          x: "center", //图例水平居中
          // 图标大小,宽和高
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            fontSize: 12,
            color: "#666"
          },
          icon: "circle",
          data: [
            "21%增值税",
            "17%增值税",
            "16%增值税",
            "12%增值税",
            "8%增值税",
            "6%增值税",
            "即征即用",
            "简易"
          ]
        },
        color: [
          "#ec6969",
          "#f39f72",
          "#c181b6",
          "#7baddc",
          "#ece674",
          "#8fc879",
          "#8e8ec5",
          "#ccc"
        ], //五个数据，五个颜色
        series: [
          {
            name: "",
            type: "pie",
            radius: "100%", //图的大小
            // 环形大小
            radius: ["30%", "50%"],
            center: ["18%", "40%"], //图的位置，距离左跟上的位置
            itemStyle: {
              normal: {
                //隐藏标示文字
                label: {
                  show: false
                },
                //隐藏标示线
                labelLine: {
                  show: false
                }
              }
            },
            data: [
              {
                name: "21%增值税",
                value: "16"
              },
              {
                name: "17%增值税",
                value: "14"
              },
              {
                name: "16%增值税",
                value: "9"
              },
              {
                name: "12%增值税",
                value: "5"
              },
              {
                name: "8%增值税",
                value: "18"
              },
              {
                name: "6%增值税",
                value: "7"
              },
              {
                name: "即征即用",
                value: "3"
              },
              {
                name: "简易",
                value: "2"
              }
            ]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(this.echarts1_option);
    }
  }
};
</script>
<style>
.chartsTable .el-table th > .cell {
  font-size: 14px;
  color: #333;
}
.chartsTable .el-table td div {
  font-size: 12px;
  color: #666;
}
.chartsTable .el-table td,
.el-table th {
  padding: 4px 0;
}
</style>

<style scoped>
.main_contain {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.left_contain {
  height: 100%;
  flex: 3;
  min-width: 800px;
  margin-right: 20px;
}
.right_contain {
  height: 100%;
  flex: 1;
  border-radius: 5px;
  background: #fff;
}
.chartsTitle {
  padding: 20px 20px 0 20px;
  font-size: 18px;
  color: #4fb8dd;
}
.chartsTable {
  margin-top: -36px;
}
</style>

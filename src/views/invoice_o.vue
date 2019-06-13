<template>
  <div class="main_contain">
    <div class="left_contain">
      <searchModule @getInvoiceLeaveShowList="getInvoiceLeaveShowList" @getShowSumIncome="getShowSumIncome" @getShowSumDeduct="getShowSumDeduct" @getShowSumTaxPayable="getShowSumTaxPayable"></searchModule>
      <listModule @getInvoiceLeaveShowList="getInvoiceLeaveShowList" :invoicePanelList="invoicePanelList" :taxationId="taxationId" :taxInfoId="taxInfoId" :searchList="searchList" :loadingCard="loadingCard"></listModule>
      <!-- taxation_id,tax_info_id -->
    </div>
    <div class="right_contain">
      <div class="charts">
        <p class="chartsTitle">收入合计</p>
        <div id="myChart" :style="{width: '100%', height: '200px'}"></div>
      </div>
      <div class="chartsTable">
        <el-table :data="tableData" show-summary border style="width: 90%;margin-left:5%">
          <el-table-column label="税种" width="50" align="center" :resizable="false">
            <template slot-scope="scope">
      				  <div class="tableSquare" :style="{background:scope.row.color}"></div>
</template>
					</el-table-column>
					<el-table-column prop="invoice_amt" label="票面金额" align="right" header-align="center"  :resizable="false">
					</el-table-column>
					<el-table-column prop="ex_tax_income" label="收入不含税" align="right" header-align="center" :resizable="false" >
					</el-table-column>
					<el-table-column prop="sale_vat_taxation" label="销项税额" align="right" header-align="center"  :resizable="false">
					</el-table-column>
				</el-table>
			</div>

			<div class="charts">
				<p class="chartsTitle">抵扣合计</p>
			</div>
			<div class="chartsTable" style="margin-top:20px">
				<el-table :data="tableDeductData" :show-header="false" border style="width: 90%;margin-left:5%">
					<el-table-column prop="name" align="left" header-align="center"  :resizable="false">
					</el-table-column>
					<el-table-column prop="value" align="center" header-align="center" :resizable="false" >
					</el-table-column>
				</el-table>
			</div>

			<div class="charts">
				<p class="chartsTitle">应纳税额合计</p>
			</div>
			<div class="chartsTable" style="margin-top:20px;margin-bottom: 20px;">
				<el-table :data="tableTaxData" show-summary border style="width: 90%;margin-left:5%">
					<el-table-column label="税种" prop="name" align="center" header-align="center"  :resizable="false">
					</el-table-column>
					<el-table-column label="税率" width="49" prop="rate" align="center" header-align="center" :resizable="false" >
					</el-table-column>
					<el-table-column label="应缴" width="70" prop="payable" align="center" header-align="center" :resizable="false" >
					</el-table-column>
					<el-table-column label="已交" width="55" prop="paid" align="center" header-align="center" :resizable="false" >
					</el-table-column>
					<el-table-column label="应补交" width="70" prop="taxation" align="center" header-align="center" :resizable="false" >
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
        tableData: [],
        invoiceList: [],
        invoicePanelList: [],
        nameData: [],
        seriesData: [],
        color: [
          "#ec6969",
          "#f39f72",
          "#c181b6",
          "#7baddc",
          "#ece674",
          "#8fc879",
          "#8e8ec5",
          "#ccc"
        ],
        tableDeductData: [],
        tableTaxData: [],
        taxationId: "",
        taxInfoId: "",
        searchList: {},
        loadingCard: false,
      };
    },
    components: {
      searchModule,
      listModule
    },
    mounted() {
      // this.getUserInfo();
    },
    methods: {
      // 获取用户信息
      getUserInfo() {
        axios.get("/log/api/user/getLoginUserInfo.do").then(res => {
          console.log("获取用户信息", res);
          if (res.data.code == 200) {}
        });
      },
      //获取列表数据
      getInvoiceLeaveShowList(params) {
        this.taxationId = params.taxationId;
        this.taxInfoId = params.taxInfoId;
        this.searchList = params.searchList;
        //
        this.loadingCard = true;
        axios
          .get(
            "/api/perTaxToolTwo/e9zCalculate/invoiceLeaveShow?taxationId=" +
            params.taxationId
          )
          .then(res => {
            this.loadingCard = false;
            console.log("获取列表数据", res);
            if (res.data.code == 200) {
              let obj = res.data.data[0];
              let arr = [];
              for (var i in obj) {
                if (obj[i].length > 0) {
                  if (i !== "taxesList") {
                    arr.push(obj[i]);
                  }
                }
              }
              this.invoicePanelList = this.flatten(arr);
              console.log(
                "res.data.data[i]",
                this.invoicePanelList,
                this.taxationId,
                this.taxInfoId
              );
            }
          }).catch((err) => {
            this.$message({
              message: '获取列表数据失败',
              type: 'error'
            });
          });
      },
      //获取右侧统计数据--收入合计
      getShowSumIncome(taxation_id) {
        console.log('taxationId', taxation_id)
        axios.get("/test/www").then(res => {
        // axios.get("/api/perTaxToolTwo/e9zCalculate/showSumIncome?taxationId=" + taxation_id).then(res => {
          console.log("获取收入合计数据", res);
          if (res.data.code == 200) {
            let nameArr = [];
            let valueArr = [];
            this.seriesData = [];
            this.nameData = [];
            res.data.data.forEach((item, index) => {
              if (item.vat_rate == "simple") {
                item.vat_rate = "简易征收";
              } else if (item.vat_rate == "immeduate") {
                item.vat_rate = "即佂即退";
              }
              if (item.ex_tax_income) {
                valueArr.push(item);
              } else {
                nameArr.push(item);
              }
            });
            nameArr.forEach((item, index) => {
              this.nameData.push(item.vat_rate);
            });
            valueArr.forEach((item, index) => {
              item.color = this.color[index];
              var obj = {};
              obj.name = item.vat_rate;
              obj.value = item.invoice_amt;
              this.seriesData.push(obj);
            });
            this.tableData = valueArr;
            //   console.log("this.nameData", this.nameData);
            //   console.log("this.seriesData", this.seriesData);
            //   console.log('this.tableData', this.tableData)
            this.drawLine();
          }
        }).catch((err) => {
          this.$message({
            message: '获取收入合计数据失败',
            type: 'error'
          });
        });
      },
      // 获取右侧统计数据--抵扣合计
      getShowSumDeduct() {
        this.tableDeductData = [];
        axios.get("/test/showSumIncome").then(res => {
          // console.log("获取抵扣合计数据", res);
          if (res.data.code == 200) {
            for (var key in res.data.data) {
              var obj = {};
              switch (key) {
                case "input_local_real":
                  obj.name = "本期实际抵扣税额";
                  break;
                case "con_local_used":
                  obj.name = "本期动用减佂额";
                  break;
                case "input_local_recover":
                  obj.name = "免、抵、退应退税额";
                  break;
                case "input_local_leave":
                  obj.name = "上期留抵税额";
                  break;
                case "input_local_out":
                  obj.name = "进项税额转出";
                  break;
                case "input_pre_leave":
                  obj.name = "上期留抵税额";
                  break;
                case "input_local":
                  obj.name = "本期进项税额";
                  break;
              }
              obj.value = res.data.data[key];
              this.tableDeductData.push(obj);
            }
            //   console.log("this.tableDeductData", this.tableDeductData);
          }
        }).catch((err) => {
          this.$message({
            message: '获取抵扣合计数据失败',
            type: 'error'
          });
        });
      },
      // 获取右侧统计数据--应纳税额合计
      getShowSumTaxPayable() {
        axios.get("/test/showSumTaxPayable").then(res => {
          // console.log("获取应纳税额合计数据", res);
          if (res.data.code == 200) {
            this.tableTaxData = res.data.data;
          }
        }).catch((err) => {
          this.$message({
            message: '获取应纳税额合计数据失败',
            type: 'error'
          });
        });
      },
      // 二维数组转一位数组
      flatten(arr) {
        return [].concat(
          ...arr.map(x => (Array.isArray(x) ? this.flatten(x) : x))
        );
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
            data: this.nameData
          },
          color: this.color,
          series: [{
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
            data: this.seriesData
          }]
        };
        // 绘制图表
        myChart.setOption(this.echarts1_option);
      }
    }
  };
</script>
<style>
  .chartsTable .el-table th>.cell {
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
    overflow-y: auto;
    overflow-x: hidden;
  }
  .chartsTitle {
    padding: 20px 20px 0 20px;
    font-size: 18px;
    color: #4fb8dd;
  }
  .chartsTable {
    margin-top: -36px;
  }
  .tableSquare {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin: 0 auto;
  }
</style>

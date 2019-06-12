<template>
  <div class='search_contain'>
    <div class="row1">
      <span class="labelTitle">
    					客户名称：
    				</span>
      <el-select v-model="searchList.value" placeholder="请选择">
        <el-option v-for="item in searchList.options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="row2">
      <span class="labelTitle">
    					账期：
    				</span>
      <el-date-picker v-model="searchList.nowDate" type="month" placeholder="选择月">
      </el-date-picker>
    </div>
    <div class="row3">
      <span class="labelTitle">
    					发票类型：
    				</span>
      <el-select v-model="searchList.value" placeholder="请选择">
        <el-option v-for="item in searchList.options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="searchButton" @click="search()">查询</div>
    <div class="importButton">发票导入</div>
    <div class="deleteButton">批量删除</div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "searchModule",
    data() {
      return {
        searchList: {
          options: [{
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            }
          ],
          value: "",
          nowDate: ""
        }
      };
    },
    created() {
      this.getNowMonth();
    },
    methods: {
      getNowMonth() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        this.searchList.nowDate = year.toString() + "-" + month.toString();
      },
      search() {
        let params = {
          accountPeriod: "2019-05", //账期
          customerId: 1, //客户Id
          stepName: "发票录入" //步骤名称
        };
        let taxation_id, tax_info_id;
        axios
          .post("/api/perTaxToolTwo/e9zCalculate/getTaxInfo", params)
          .then(res => {
            console.log("获取收账信息Id和税款信息id", res);
            if (res.data.code == 200) {
              // 在这里获取收账税款id
              taxation_id = res.data.data.taxation_id;
              tax_info_id = res.data.data.tax_info_id;
              // 真正接口需要传参：收账税款id
              // this.$emit("getInvoiceLeaveShowList", taxation_id, tax_info_id,this.searchList);
              this.$emit("getInvoiceLeaveShowList", {
                taxationId: taxation_id,
                taxInfoId: tax_info_id,
                searchList: this.searchList
              })
              this.$emit("getShowSumIncome", taxation_id);
              this.$emit("getShowSumDeduct", taxation_id);
              this.$emit("getShowSumTaxPayable", taxation_id);
            }
          });
      }
    }
  };
</script>

<style scoped>
  div.search_contain {
    /* width: 1180px; */
    /* height: 78px; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #fff;
    padding: 20px 20px;
  }
  .labelTitle {
    color: #999;
    font-size: 14px;
  }
  .importButton {
    background: #43b3db;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    padding: 7px 35px;
  }
  .searchButton {
    background: #ffb980;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    padding: 7px 35px;
  }
  .deleteButton {
    background: #ed878e;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    padding: 7px 35px;
  }
</style>

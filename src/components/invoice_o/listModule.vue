<template>
    <div class="invoice_oListModule">
        <div class="cardBox">
            <div class="eachCard" v-for="(item,index) in invoicePanelList" :key="index">
                <!-- :class="{ 'class-a': isA, 'class-b': isB}" -->
                <div class="topContent color1">
                    <div class="line1">
                        <p v-if="item.tmplId" class="bigTitle">{{item.tmplName}}</p>
                        <p v-if="item.invoiceId" class="bigTitle">税金：80000元</p>
                        <p class="smallTitle" @click="showDetail">详情</p>
                        <p class="smallTitle">删除</p>
                    </div>
                    <div v-if="!item.tmplId" class="line2">
                        <!-- <p v-if="item.tmplId">{{item.tmplName}}</p> -->
                        <p>{{item.invoiceCategory}}</p>
                        <p style="margin-left:15px;">{{item.invoiceType}}</p>
                    </div>
                </div>
                <div class="dataContent">
                    <div v-if="child.columnShow==1" class="lineData" v-for="(child,ind) in item.e9zConfigInvoiceColumnList" :key="ind">
                        <p>{{child.columnTitle}}</p>
                        <p>{{child.columnValue!=''?child.columnValue:child.defaultValue}}</p>
                    </div>
                </div>
                <div class="footerContent">
                    <img src="../../assets/img/btn-detail.png" alt="">
                </div>
            </div>
            <div class="eachCard addBtn" @click="addDialog()">
                <img src="../../assets/img/list-add.png" alt="">
            </div>
        </div>
        <!-- 新增弹窗 -->
        <el-dialog class="smallDialog" :close-on-click-modal="false" :visible.sync="addDialogVisible">
            <el-form ref="form" :rules="rules" :model="form" label-width="94px">
              <!-- <el-form-item label="活动名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item> -->
                <el-form-item label="票面张数：" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="票面金额：" prop="pages">
                    <el-input v-model="form.pages"></el-input>
                </el-form-item> -->
                <el-form-item label="票面金额：">
                    <el-input v-model="form.amount"></el-input>
                </el-form-item>
                <el-form-item label="计税方法：" prop="taxCalcMethod">
                    <el-select v-model="form.taxCalcMethod" placeholder="请选择" @change="changeTaxMethod">
                        <el-option v-for="item in taxCalcMethodOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票类型：" prop="invoiceType">
                    <el-select v-model="form.invoiceType" placeholder="请选择" @change="changeInvoiceType">
                        <el-option v-for="item in invoiceTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票名称：" prop="invoiceName">
                    <el-select v-model="form.invoiceName" placeholder="请选择">
                        <el-option v-for="item in invoiceNameOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="nextStep" @click="nextStep('form')">下一步</div>
            <div class="cancel" @click="closeDialog()">取消</div>
        </el-dialog>
        <!-- 下一步弹窗 -->
        <el-dialog class="smallNextDialog" :close-on-click-modal="false" :visible.sync="nextStepDialogVisible">
            <div class="dialogTitle">
                <p class="dialogSmallTitle">{{form.invoiceType}}</p>
                <p class="dialogSmallTitle" style="margin-top:15px">{{invoiceName}}</p>
            </div>
            <el-form ref="form2" :model="form2">
              <el-form-item label="票面张数">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="票面金额">
                    <el-input v-model="form.amount"></el-input>
                </el-form-item>
                <el-form-item :label="item.columnTitle" v-for="(item,index) in nextStepList" :key="index" prop="invoiceType">
                    <!-- <div class="lineBox"> -->
                        <el-input v-if="item.columnEdit==1" v-model="item.defaultValue"></el-input>
                        <p style="float:right" v-if="item.columnEdit==0">{{item.defaultValue}}</p>
                        <span class="error">{{item.errInfo}}</span>
                    <!-- </div> -->
                    
                </el-form-item>
            </el-form>
            <div class="nextStep" @click="save()">保存</div>
            <div class="cancel" @click="closeNextDialog()">取消</div>
        </el-dialog>

        <!-- 详情弹窗 -->
        <el-dialog class="detailDialog" :close-on-click-modal="false" :visible.sync="detailDialogVisible">
            <div class="detailHeader">
              <div class="costumer">
                <p class="label">客户名称：</p>
                <p class="value">南京公司</p>
                <p class="pages">11张</p>
              </div>
              <div class="invoice">
                <div class="left">
                  <p class="label">发票类型：</p>
                  <p class="value">防伪税控</p>
                  <p class="pages">专票</p>
                </div>
                <div class="right">
                  <p class="label">发票名称：</p>
                  <p class="value">农产品销售</p>
                </div>
              </div>
              <div class="date">
                <div class="left">
                  <p class="label">账期：</p>
                  <p class="value">6月份</p>
                </div>
                <div class="right">
                  <p class="label">申报纳税种类：</p>
                  <p class="value">一般纳税人</p>
                </div>
              </div>
            </div>
            <div class="taxRate">
              <div class="valueBox" v-for="n in 5">
                <p class="label">增值税率：</p>
                <p class="value">0</p>
              </div>
            </div>
            <div class="content">
              <div class="valueBox">
                <p class="label">本期负数结余</p>
                <p class="value" v-show="!setNo" @dblclick="changeValue()">{{value1}}</p>
                <el-input  v-show="setNo" v-model="value1" @blur="unfocused()"></el-input>
              </div>
              <div class="valueBox">
                <p class="label">本期负数结余</p>
                <p class="value">9888</p>
              </div>
              <div class="valueBox">
                <p class="label">本期负数结余</p>
                <p class="value">9888</p>
              </div>
            </div>
            <div class="detailFooter">
              <div class="nextStep">提交</div>
              <div class="cancel">关闭</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "listModule",
  props: {
    invoicePanelList: {
      type: Array,
      default: []
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      var reg = /^\d+(\.\d{0,2})?$/;
      if (value === "") {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("只可填数字或含两位小数"));
      } else {
        callback();
      }
    };
    var validateAmount = (rule, value, callback) => {
      var reg = /^\d+(\.\d{0,2})?$/;
      if (!reg.test(value)) {
        callback(new Error("只可填数字或含两位小数"));
      } else {
        //  if (value === '') {
        //     callback(new Error('请再次输入密码'));}
        callback();
      }
    };
    return {
      form: {
        name: "",
        pages: "",
        amount: "",
        taxCalcMethod: "", //计税方法
        invoiceType: "", //发票类型
        invoiceName: "" //发票名称
      },
      invoiceName: "",
      rules: {
        name: [{ validator: validatePass, trigger: "blur" }],
        pages: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        taxCalcMethod: [
          {
            required: true,
            message: "请选择计税方法",
            trigger: "change"
          }
        ],
        invoiceType: [
          {
            required: true,
            message: "请选择发票类型",
            trigger: "change"
          }
        ],
        invoiceName: [
          {
            required: true,
            message: "请选择发票名称",
            trigger: "change"
          }
        ],
        amount: [{ validator: validateAmount, trigger: "blur" }]
      },
      form2: {
        name: "",
        invoiceType: ""
      },
      rules2: {
        invoiceType: [
          {
            required: true,
            message: "请选择发票类型",
            trigger: "blur"
          }
        ]
      },
      addDialogVisible: false,
      nextStepDialogVisible: false,
      detailDialogVisible: false,
      taxCalcMethodOptions: [], //计税方法选择框
      invoiceTypeOptions: [], //发票类型选择框
      invoiceNameOptions: [], //发票名称选择框
      allSelectList: [],
      invoiceList: [],
      nextStepList: [],
      value1:"9888",
      setNo:false,
    };
  },
  //   updated(){
  //       alert(this.invoicePanelList)
  //   },
  created() {
    this.getTaxCalcMethod();
  },
  methods: {
    //获取计税方法
    getTaxCalcMethod() {
      axios
        .post(
          "/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=计税方法"
        )
        .then(res => {
          console.log("获取计税方法", res);
          if (res.data.code == 200) {
            this.taxCalcMethodOptions = res.data.data.map(v => {
              var obj = {};
              obj.label = v.dicName;
              obj.value = v.dicValue;
              return obj;
            });
          }
        });
    },
    // 更改计税方法时触发
    changeTaxMethod() {
      console.log(1111);
      this.invoiceTypeOptions = [];
      this.form.invoiceType = "";
      this.invoiceNameOptions = [];
      this.form.invoiceName = "";
      this.getInvoiceTypeAndName();
    },
    // 获取发票类型和发票名称
    getInvoiceTypeAndName() {
      let params = {
        taxCalcType: this.form.taxCalcMethod,
        taxesTaxType: 233,
        tmplShowType: 0
      };
      axios
        .post("/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceFormula", params)
        .then(res => {
          console.log("获取发票类型和发票名称", res);
          if (res.data.code == 200) {
            console.log("res.data.data[1]", res.data.data);
            this.allSelectList = res.data.data;
            res.data.data.forEach((item, index) => {
              // type是发票
              if (item.type == "invoice") {
                item.list.forEach((v, index) => {
                  var obj = {};
                  obj.label = v.typeString;
                  obj.value = v.typeString;
                  this.invoiceTypeOptions.push(obj);
                });
              }
            });
            console.log("22", this.invoiceTypeOptions);
          }
        });
    },
    // 更改发票类型时触发
    changeInvoiceType() {
      console.log("1110", this.allSelectList);
      this.invoiceNameOptions = [];
      this.form.invoiceName = "";
      this.invoiceList = [];
      this.allSelectList.forEach((item, index) => {
        // type是发票
        if (item.type == "invoice") {
          item.list.forEach((v, index) => {
            if (v.typeString == this.form.invoiceType) {
              v.invoiceList.forEach((i, index) => {
                var obj = {};
                obj.label = i.invoiceName;
                obj.value = i.invoiceId;
                this.invoiceNameOptions.push(obj);
                this.invoiceList.push(i);
              });
            }
          });
        }
      });
      console.log("this.invoiceNameOptions", this.invoiceNameOptions);
      console.log("invoiceList", this.invoiceList);
    },
    // 新增弹窗1
    addDialog() {
      this.form = {
        name: "",
        taxCalcMethod: "", //计税方法
        invoiceType: "", //发票类型
        invoiceName: "" //发票名称
      };
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
      this.addDialogVisible = true;
    },
    // 关闭弹窗1
    closeDialog() {
      this.addDialogVisible = false;
    },
    // 点击下一步,获取字段列
    nextStep(formName) {
      console.log("this.invoiceNameOptions", this.invoiceNameOptions);
      this.invoiceName = this.invoiceNameOptions
        .map(v => {
          if (v.value == this.form.invoiceName) {
            console.log(111, v.label);
            return v.label;
          }
        })
        .join("");
      // =invoiceNameArr
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");
          let params = {
            invoiceId: this.form.invoiceName
          };
          axios
            .post(
              "/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceProperty",
              params
            )
            .then(res => {
              console.log("获取下一步字段列", res);
              this.nextStepList = [];
              res.data.data.e9zConfigInvoiceColumnList.forEach(
                (item, index) => {
                  if (item.columnShow == 1) {
                    item.errInfo = "";
                    if (item.columnEdit == 1) {
                      this.nextStepList.push(item);
                    }
                  }
                }
              );
              this.addDialogVisible = false;
              this.nextStepDialogVisible = true;
            });
          //
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 保存提交数据
    save() {
      console.log("this.stepLise", this.nextStepList);
      console.log("id", this.form.invoiceName);
      var reg = /^\d+(\.\d{0,2})?$/;
      this.nextStepList.forEach((item, index) => {
        if (item.columnEdit == 1) {
          if (item.columnRequire == 1) {
            if (item.defaultValue == null || item.defaultValue == "") {
              item.errInfo = "必填项不可为空";
            } else if (!reg.test(item.defaultValue)) {
              item.errInfo = "只可填数字或含两位小数";
            } else {
              item.errInfo = "";
            }
          } else {
            if (item.defaultValue != null) {
              if (!reg.test(item.defaultValue)) {
                item.errInfo = "只可填数字或含两位小数";
              } else {
                item.errInfo = "";
              }
            }
          }
        }
      });
      let flag = false;
      this.nextStepList.forEach((item, index) => {
        if (item.errInfo != "") {
          flag = true;
        }
      });
      console.log("flag", flag);
      if (!flag) {
        let invoiceColumns = [];
        this.nextStepList.forEach((item, index) => {
          var obj = {};
          obj.columnId = item.columnId;
          obj.columnValue = item.defaultValue;
          invoiceColumns.push(obj);
        });
        console.log("invoiceColumns", invoiceColumns);
        let params = {
          invoice: this.form.invoiceName,
          invoiceColumns: invoiceColumns
        };
        axios
          .post("/api/perTaxToolTwo/e9zCalculate/invoiceCalculate", params)
          .then(res => {
            console.log("插入数据", res);
            if (res.data.code == 200) {
            }
          });
      }
    },
    // 关闭弹窗2
    closeNextDialog() {
      this.nextStepDialogVisible = false;
    },
    // 打开详情弹窗
    showDetail() {
      this.detailDialogVisible = true;
    },
    changeValue(){
      this.setNo=true
    },
    unfocused(){
      this.setNo=false
    }
  }
};
</script>
<style>
.smallDialog .el-dialog,
.smallNextDialog .el-dialog {
  width: 280px;
}
.detailDialog .el-dialog {
  width: 560px;
}
.detailDialog .el-dialog__body {
  padding: 30px 45px;
}
.detailDialog .el-input {
  width: 80px;
  float: right;
  font-size: 12px;
}
.detailDialog .el-input__inner {
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
}
.smallNextDialog .el-dialog__body {
  padding: 50px 15px;
}
.smallNextDialog .el-input {
  width: 80px;
  float: right;
  font-size: 12px;
}
.smallNextDialog .el-form-item {
  margin-bottom: 11px;
}
.smallNextDialog .el-form-item__label {
  font-size: 12px;
  padding: 0 5px 0 0;
}
.smallNextDialog .el-input__inner {
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 120px;
}
</style>

<style scoped>
.invoice_oListModule {
  /* width: 1180px; */
}
.cardBox {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.eachCard {
  width: 24.25%;
  height: 253px;
  border-radius: 5px;
  margin-top: 20px;
  background: #fff;
  margin-right: 1%;
  position: relative;
}
.eachCard:nth-child(4n) {
  margin-right: 0;
}
.topContent {
  height: 80px;
}
.color1 {
  background: #43b3db;
}
.color2 {
  background: #7dc36d;
}
.color3 {
  background: #ffac69;
}
.color4 {
  background: #ed878e;
}
.color5 {
  background: #e6a08a;
}
.color6 {
  background: #d19ae9;
}
.line1 {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 15px 20px;
}
.line1 p {
  color: #fff;
}
.bigTitle {
  font-size: 18px;
  flex: 0.8;
}
.smallTitle {
  font-size: 12px;
  cursor: pointer;
}
.line2 {
  display: flex;
  padding: 0px 20px;
  /* align-items: flex-end; */
  /* justify-content: space-between;*/
}
.line2 p {
  font-size: 14px;
  color: #fff;
}
.dataContent {
  padding: 15px 20px;
}
.lineData {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  color: #666;
  font-size: 12px;
}
.footerContent {
  position: absolute;
  bottom: 6px;
  left: 50%;
  cursor: pointer;
}
.addBtn {
  cursor: pointer;
}
.nextStep {
  color: #fff;
  background: #43b3db;
  text-align: center;
  border-radius: 5px;
  padding: 12px 0;
  cursor: pointer;
  margin-top: 25px;
}
.cancel {
  margin-top: 30px;
  color: #fff;
  background: #ed878e;
  text-align: center;
  border-radius: 5px;
  padding: 12px 0;
  cursor: pointer;
}
.dialogTitle {
  position: absolute;
  top: 20px;
}
.dialogBigTitle {
  font-size: 18px;
  color: #43b3db;
}
.dialogTitleLine2 {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.dialogSmallTitle {
  color: #ed878e;
}
.error {
  position: absolute;
  bottom: 0;
  left: 0;
  line-height: 0px;
}
.costumer,
.invoice,
.left,
.right,
.date {
  display: flex;
  align-items: center;
}
.invoice,
.date {
  justify-content: space-between;
}
.costumer,
.invoice {
  margin-bottom: 15px;
}
.costumer .label,
.costumer .pages,
.invoice .left .label,
.invoice .right .label,
.date .left .label,
.date .right .label,
.taxRate .valueBox .label {
  color: #999;
}
.costumer .value {
  color: black;
}
.costumer .pages {
  margin-left: 25px;
}
.invoice .left .pages {
  color: #57bbdf;
  margin-left: 10px;
}
.date {
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e5e5;
}
.taxRate {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.taxRate .valueBox {
  display: flex;
  align-items: center;
  width: 50%;
  padding: 0 0 15px 0;
}
.content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.content .valueBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 47%;
  margin-right: 6%;
  padding: 5px 0;
}
.content .valueBox:nth-child(2n) {
  margin-right: 0;
}
.content .valueBox .label,
.content .valueBox .value {
  font-size: 12px;
}
.detailFooter{
      display: flex;
    align-items: center;
    justify-content: space-around;
}
.detailFooter .nextStep{
    width: 180px;
    margin-top: 30px;
}
.detailFooter .cancel{
      width: 180px;
}
</style>

<template>
    <div class="invoice_oListModule">
        <div class="cardBox">
            <div class="eachCard">
                <!-- :class="{ 'class-a': isA, 'class-b': isB}" -->
                <div class="topContent color1">
                    <div class="line1">
                        <p class="bigTitle">税金：800000元</p>
                        <p class="smallTitle">详情</p>
                        <p class="smallTitle">删除</p>
                    </div>
                    <div class="line2">
                        <p>防伪税控专票</p>
                        <p style="margin-left:15px;">广告服务</p>
                    </div>
                </div>
                <div class="dataContent">
                    <div class="lineData" v-for="n in 5">
                        <p>票面金额</p>
                        <p>50000.09元</p>
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
                <el-form-item label="票面张数：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="票面金额：" prop="checkNumber">
                    <el-input v-model="form.price"></el-input>
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
            <el-form ref="form2" :model="form2" :rules="rules2">
                <el-form-item label="票面金额">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item :label="item.columnTitle" v-for="(item,index) in nextStepList" :key="index">
                    <el-input v-if="item.columnEdit==1" v-model="item.defaultValue"></el-input>
                    <p v-if="item.columnEdit==0">{{item.defaultValue}}</p>
                </el-form-item>
            </el-form>
            <div class="nextStep" @click="save('form2')">保存</div>
            <div class="cancel" @click="closeNextDialog()">取消</div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "listModule",
        data() {
            return {
                form: {
                    name: "",
                    price: '',
                    taxCalcMethod: "", //计税方法
                    invoiceType: "", //发票类型
                    invoiceName: "" //发票名称
                },
                invoiceName: "",
                rules: {
                    taxCalcMethod: [{
                        required: true,
                        message: "请选择计税方法",
                        trigger: "change"
                    }],
                    invoiceType: [{
                        required: true,
                        message: "请选择发票类型",
                        trigger: "change"
                    }],
                    invoiceName: [{
                        required: true,
                        message: "请选择发票名称",
                        trigger: "change"
                    }],
                    // checkNumber:[{
                    //     validator: decimalNumber, trigger: 'blur' 
                    // }]
                },
                form2: {
                    name: ""
                },
                rules2: {
                },
                addDialogVisible: false,
                nextStepDialogVisible: false,
                taxCalcMethodOptions: [], //计税方法选择框
                invoiceTypeOptions: [], //发票类型选择框
                invoiceNameOptions: [], //发票名称选择框
                allSelectList: [],
                invoiceList: [],
                nextStepList: []
            };
        },
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
                this.nextStepList = [];
                console.log('this.invoiceNameOptions', this.invoiceNameOptions)
                this.invoiceName = this.invoiceNameOptions.map(v => {
                    if (v.value == this.form.invoiceName) {
                        console.log(111, v.label)
                        return v.label
                    }
                }).join("")
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
                                res.data.data.e9zConfigInvoiceColumnList.forEach(
                                    (item, index) => {
                                        if (item.columnShow == 1) {
                                            this.nextStepList.push(item);
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
            save(formName) {
                console.log('this.stepLise',this.nextStepList)
            },
            // 关闭弹窗2
            closeNextDialog() {
                this.nextStepDialogVisible = false;
            }
        }
    };
</script>
<style>
    .smallDialog .el-dialog,
    .smallNextDialog .el-dialog {
        width: 280px;
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
        /* justify-content: space-between;
                                                                    	 */
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
        margin-top:25px;
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
</style>

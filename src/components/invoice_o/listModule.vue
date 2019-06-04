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
            <el-form ref="form" :model="form" label-width="85px">
                <el-form-item label="票面张数：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="票面金额：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="计税方法：">
                    <el-select v-model="form.taxCalcMethod" placeholder="请选择" @change="changeTaxMethod">
                        <el-option v-for="item in taxCalcMethodOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票类型：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in invoiceTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票名称：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in invoiceNameOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="nextStep" @click="nextStep()">下一步</div>
            <div class="cancel" @click="closeDialog()">取消</div>
        </el-dialog>
        <!-- 下一步弹窗 -->
        <el-dialog class="smallNextDialog" :close-on-click-modal="false" :visible.sync="nextStepDialogVisible">
            <div class="dialogTitle">
                <p class="dialogBigTitle">税金：800000元</p>
                <div class="dialogTitleLine2">
                    <p class="dialogSmallTitle">税务局代开普票</p>
                    <p class="dialogSmallTitle" style="margin-left:25px">建筑安装</p>
                </div>
            </div>
            <el-form ref="form" :model="form2">
                <el-form-item label="票面张数票面张数票面张数">
                    <el-input v-model="form2.name"></el-input>
                </el-form-item>
                <el-form-item label="票面金额">
                    <el-input v-model="form2.name"></el-input>
                </el-form-item>
            </el-form>
            <div class="nextStep" @click="save()">保存</div>
            <div class="cancel" @click="closeNextDialog()">取消</div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'listModule',
        data() {
            return {
                form: {
                    name: '',
                    taxCalcMethod: '', //计税方法
                },
                form2: {
                    name: '',
                },
                addDialogVisible: false,
                nextStepDialogVisible: false,
                taxCalcMethodOptions: [], //计税方法选择框
                invoiceTypeOptions: [], //发票类型选择框
                invoiceNameOptions: [], //发票名称选择框
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                value: '',
            }
        },
        created() {
            this.getTaxCalcMethod();
        },
        methods: {
            //获取计税方法
            getTaxCalcMethod() {
                axios.post('/api/perTaxToolTwo/e9z/configDictionary/findDictionayList?dicName=计税方法').then(res => {
                    console.log('获取计税方法', res)
                    if (res.data.code == 200) {
                        this.taxCalcMethodOptions = res.data.data.map((v) => {
                            var obj = {};
                            obj.label = v.dicName;
                            obj.value = v.dicValue;
                            return obj;
                        })
                    }
                })
            },
            changeTaxMethod() {
                console.log(1111)
                this.getInvoiceTypeAndName();
            },
            // 获取发票类型和发票名称
            getInvoiceTypeAndName() {
                let params = {
                    taxCalcType: this.form.taxCalcMethod,
                    taxesTaxType: 233,
                    tmplShowType: 0,
                }
                axios.post('/api/perTaxToolTwo/e9z/invoiceInfo/findInvoiceFormula', params).then(res => {
                    console.log('获取发票类型和发票名称', res)
                    if (res.data.code == 200) {
                        console.log('res.data.data[1]', res.data.data[1])
                        // for (key in res.data.data[1]) {
                        //     var obj = {};
                        //         obj.label=v[index];
                        //     obj.value=v[index];
                        //     this.invoiceTypeOptions.push(obj)
                        // }
                        // keys.push(key)
                        // this.invoiceTypeOptions = res.data.data[1].forEach((v,index) => {
                        //     var obj = {};
                        //     obj.label=v[index];
                        //     obj.value=v[index];
                        //     return obj;
                        // })
                        console.log('22', this.invoiceTypeOptions)
                    }
                })
            },
            addDialog() {
                this.addDialogVisible = true;
            },
            closeDialog() {
                this.addDialogVisible = false;
            },
            nextStep() {
                this.addDialogVisible = false;
                this.nextStepDialogVisible = true;
                console.log('taxCalcMethodID', this.form.taxCalcMethod)
            },
            save() {},
            closeNextDialog() {
                this.nextStepDialogVisible = false;
            },
            onSubmit() {
                console.log('submit!');
            }
        }
    }
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
        padding: 0 5px 0 0
    }
    .smallNextDialog .el-input__inner {
        padding: 0 5px;
        height: 30px;
        line-height: 30px
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 120px;
    }
</style>

<style scoped>
    .invoice_oListModule {
        width: 1180px;
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

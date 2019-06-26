<template>
    <div class="showReport">
        <div class='search'>
            <!-- <div class="title">报表查看</div> -->
            <div class='search_contain'>
                <div class="row1">
                    <span class="labelTitle">公司：</span>
                    <el-select v-model="searchList.value" placeholder="请选择" size="small">
                        <el-option v-for="item in $store.state.user.customerinfoList" :key="item.customerId" :label="item.customerName" :value="item.customerId">
                        </el-option>
                    </el-select>
                </div>
                <div class="row2">
                    <span class="labelTitle">账期：</span>
                    <el-date-picker v-model="searchList.nowDate" type="month" format="yyyy-MM " value-format="yyyy-MM" placeholder="选择月" size="small">
                    </el-date-picker>
                </div>
                <div class="row3">
                    <span class="labelTitle">报表类型：</span>
                    <el-select v-model="searchList.statusVaule" placeholder="请选择" size="small">
                        <el-option label="一般纳税人主表" value="一般纳税人主表"></el-option>
                        <el-option label="一般纳税人附表一" value="一般纳税人附表一"></el-option>
                        <el-option label="一般纳税人附表二" value="一般纳税人附表二"></el-option>
                        <el-option label="一般纳税人附表三" value="一般纳税人附表三"></el-option>
                        <el-option label="一般纳税人附表四" value="一般纳税人附表四"></el-option>
                        <el-option label="增值税减免税明细表" value="增值税减免税明细表"></el-option>
                        <el-option label="小规模纳税人主表" value="小规模纳税人主表"></el-option>
                        <el-option label="小规模纳税人附列资料" value="小规模纳税人附列资料"></el-option>
                    </el-select>
                </div>
                <el-button type="primary" @click="search()" style="margin-left:20px" size="small">查看</el-button>
                <el-button @click="clear()" size="small">重置</el-button>
            </div>
        </div>
        <div class="titleBox" v-if="statusVaule=='一般纳税人主表'">
            <div class="title">
                <p class="line1">增 值 税 纳 税 申 报 表</p>
                <p class="line2">（一般纳税人适用）</p>
                <p class="line3">根据国家税收法律法规及增值税相关规定制定本表。纳税人不论有无销售额，均应按税务机关核定的纳税期限填写本表，并向当地税务机关申报。</p>
            </div>
            <div class="Infobox">
                <el-form :inline="true" :model="uploadData" class="demo-form-inline" size="small">
                    <div class="line1">
                        <el-form-item label="税款所属时间：">
                            <el-date-picker style="width:2.8rem" v-model="uploadData.shuikuanDate" type="daterange" range-separator="至" format="yyyy-MM " value-format="yyyy-MM" start-placeholder="开始日期" end-placeholder="结束日期"> clearable>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="填表日期：">
                            <el-date-picker v-model="uploadData.tianbiaoData" type="month" format="yyyy-MM " value-format="yyyy-MM" placeholder="选择日期" clearable>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="金额单位：">
                            <p>元至角分</p>
                        </el-form-item>
                    </div>
                    <div class="line2">
                        <el-form-item label="纳税人识别号：">
                            <el-input v-model="uploadData.taxerNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="所属行业：">
                            <el-input v-model="uploadData.trade"></el-input>
                        </el-form-item>
                    </div>
                    <div class="line3">
                        <el-form-item label="纳税人名称：">
                            <div class="inlineInput">
                                <el-input v-model="uploadData.taxerName"></el-input>
                                <span style="width:0.8rem">（公章）</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="法定代表人姓名：">
                            <el-input v-model="uploadData.legalName"></el-input>
                        </el-form-item>
                        <el-form-item label="注册地址：">
                            <el-input v-model="uploadData.registerAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="生产经营地址：">
                            <el-input v-model="uploadData.runAddress"></el-input>
                        </el-form-item>
                    </div>
                    <div class="line4">
                        <el-form-item label="开户银行及账号：">
                            <el-input v-model="uploadData.bank"></el-input>
                        </el-form-item>
                        <el-form-item label="登记注册类型：">
                            <el-input v-model="uploadData.registerType"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码：">
                            <el-input v-model="uploadData.phone"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="titleBox">
            <div class="title" v-if="statusVaule=='一般纳税人附表一'">
                <p class="line1">增值税纳税申报表附列资料（一）</p>
                <p class="line2">（本期销售情况明细）</p>
            </div>
            <div class="title" v-if="statusVaule=='一般纳税人附表二'">
                <p class="line1">增值税纳税申报表附列资料（二）</p>
                <p class="line2">（本期进项税额明细）</p>
            </div>
            <div class="Infobox" v-if="statusVaule=='一般纳税人附表一'||statusVaule=='一般纳税人附表二'">
                <el-form :inline="true" :model="uploadData" class="demo-form-inline" size="small">
                    <div class="line1">
                        <el-form-item label="税款所属时间：">
                            <el-date-picker style="width:2.8rem" v-model="uploadData.shuikuanDate" type="daterange" range-separator="至" format="yyyy-MM " value-format="yyyy-MM" start-placeholder="开始日期" end-placeholder="结束日期"> clearable>
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="line3">
                        <el-form-item label="纳税人名称：">
                            <div class="inlineInput">
                                <el-input v-model="uploadData.taxerName"></el-input>
                                <span style="width:0.8rem">（公章）</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="金额单位：">
                            <p>元至角分</p>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <!-- <el-button type="primary" icon="el-icon-success" size="small" @click='exportExcel'>一键导出</el-button> -->
            <div class="tableBox" v-if="statusVaule=='一般纳税人主表'">
                <table border="1 " width="100% " v-if="thisData.ajynsjcybjseybby">
                    <tr>
                        <td rowspan="2" colspan="2" class="center">项目</td>
                        <td rowspan="2" class="center" style="width:1.4rem">栏次</td>
                        <td colspan="2" class="pad3 center">一般项目</td>
                        <td colspan="2" class="center">即征即退项目</td>
                    </tr>
                    <tr>
                        <td class="pad3 center">本月数</td>
                        <td class="pad3 center">本年累计</td>
                        <td class="pad3 center">本月数</td>
                        <td class="pad3 center">本年累计</td>
                    </tr>
                    <tr>
                        <td rowspan="10" class="shuli">销售额</td>
                        <td class="pad3">（一）按适用税率计税销售额</td>
                        <td class="pad3 center">1</td>
                        <td class="pad3 center" :contenteditable="thisData.asysljsxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','asysljsxse',$event)" v-text="thisData.asysljsxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.asysljsxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','asysljsxse',$event)" v-text="thisData.asysljsxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.asysljsxsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','asysljsxse',$event)" v-text="thisData.asysljsxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.asysljsxsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','asysljsxse',$event)" v-text="thisData.asysljsxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：应税货物销售额</td>
                        <td class="pad3 center">2</td>
                        <td class="pad3 center" :contenteditable="thisData.yshwxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','yshwxse',$event)" v-text="thisData.yshwxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.yshwxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','yshwxse',$event)" v-text="thisData.yshwxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.yshwxsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','yshwxse',$event)" v-text="thisData.yshwxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.yshwxsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','yshwxse',$event)" v-text="thisData.yshwxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3 padL">应税劳务销售额</td>
                        <td class="pad3 center">3</td>
                        <td class="pad3 center" :contenteditable="thisData.yslwxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','yslwxse',$event)" v-text="thisData.yslwxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.yslwxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','yslwxse',$event)" v-text="thisData.yslwxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.yslwxsejzby.columnEdit==1" @blur="unfocus('table1','jz','yb','yslwxse',$event)" v-text="thisData.yslwxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.yslwxsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','yslwxse',$event)" v-text="thisData.yslwxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3 padL">纳税检查调整的销售额</td>
                        <td class="pad3 center">4</td>
                        <td class="pad3 center" :contenteditable="thisData.nsjcdzxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','nsjcdzxse',$event)" v-text="thisData.nsjcdzxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.nsjcdzxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','nsjcdzxse',$event)" v-text="thisData.nsjcdzxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.nsjcdzxsejzby.columnEdit==1" @blur="unfocus('table1','jz','yb','nsjcdzxse',$event)" v-text="thisData.nsjcdzxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.nsjcdzxsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','nsjcdzxse',$event)" v-text="thisData.nsjcdzxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">（二）按简易办法计税销售额</td>
                        <td class="pad3 center">5</td>
                        <td class="pad3 center" :contenteditable="thisData.ajyfsjsxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ajyfsjsxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ajyfsjsxsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ajyfsjsxsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：纳税检查调整的销售额</td>
                        <td class="pad3 center">6</td>
                        <td class="pad3 center" :contenteditable="thisData.nsjctzxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','nsjctzxse',$event)" v-text="thisData.nsjctzxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.nsjctzxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','nsjctzxse',$event)" v-text="thisData.nsjctzxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.nsjctzxsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','nsjctzxse',$event)" v-text="thisData.nsjctzxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.nsjctzxsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','nsjctzxse',$event)" v-text="thisData.nsjctzxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">（三）免、抵、退办法出口销售额</td>
                        <td class="pad3 center">7</td>
                        <td class="pad3 center" :contenteditable="thisData.mdtbfckxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','mdtbfckxse',$event)" v-text="thisData.mdtbfckxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.mdtbfckxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','mdtbfckxse',$event)" v-text="thisData.mdtbfckxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">（四）免税销售额</td>
                        <td class="pad3 center">8</td>
                        <td class="pad3 center" :contenteditable="thisData.msxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','msxse',$event)" v-text="thisData.msxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.msxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','msxse',$event)" v-text="thisData.msxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：免税货物销售额</td>
                        <td class="pad3 center">9</td>
                        <td class="pad3 center" :contenteditable="thisData.mshwxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','mshwxse',$event)" v-text="thisData.mshwxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.mshwxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','mshwxse',$event)" v-text="thisData.mshwxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3 padL">免税劳务销售额</td>
                        <td class="pad3 center">10</td>
                        <td class="pad3 center" :contenteditable="thisData.mslwxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','mslwxse',$event)" v-text="thisData.mslwxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.mslwxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','mslwxse',$event)" v-text="thisData.mslwxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td rowspan="14" class="shuli">税款计算</td>
                        <td class="pad3">销项税额</td>
                        <td class="pad3 center">11</td>
                        <td class="pad3 center" :contenteditable="thisData.xxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','xxse',$event,'sjdkse')" v-text="thisData.xxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.xxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','xxse',$event,'sjdkse')" v-text="thisData.xxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.xxsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','xxse',$event,'sjdkse')" v-text="thisData.xxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.xxsejzbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','xxse',$event,'sjdkse')" v-text="thisData.xxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">进项税额</td>
                        <td class="pad3 center">12</td>
                        <td class="pad3 center" :contenteditable="thisData.jxseybby.columnEdit==1" @blur="unfocus('table1','yb','by','jxse',$event,'ydksehj')" v-text="thisData.jxseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jxseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','jxse',$event,'ydksehj')" v-text="thisData.jxseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jxsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','jxse',$event,'ydksehj')" v-text="thisData.jxsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jxsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','jxse',$event,'ydksehj')" v-text="thisData.jxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">上期留抵税额</td>
                        <td class="pad3 center">13</td>
                        <td class="pad3 center" :contenteditable="thisData.sqldseybby.columnEdit==1" @blur="unfocus('table1','yb','by','sqldse',$event,'ydksehj')" v-text="thisData.sqldseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.sqldseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','sqldse',$event,'ydksehj')" v-text="thisData.sqldseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.sqldsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','sqldse',$event,'ydksehj')" v-text="thisData.sqldsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">进项税额转出</td>
                        <td class="pad3 center">14</td>
                        <td class="pad3 center" :contenteditable="thisData.jxsezcybby.columnEdit==1" @blur="unfocus('table1','yb','by','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jxsezcybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jxsezcjzby.columnEdit==1" @blur="unfocus('table1','jz','by','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcjzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jxsezcjzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcjzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">免、抵、退应退税额</td>
                        <td class="pad3 center">15</td>
                        <td class="pad3 center" :contenteditable="thisData.mdtytseybby.columnEdit==1" @blur="unfocus('table1','yb','by','mdtytse',$event,'ydksehj')" v-text="thisData.mdtytseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.mdtytseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','mdtytse',$event,'ydksehj')" v-text="thisData.mdtytseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">按适用税率计算的纳税检查应补缴税额</td>
                        <td class="pad3 center">16</td>
                        <td class="pad3 center" :contenteditable="thisData.asysljsnsjcybjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','asysljsnsjcybjse',$event,'ydksehj')" v-text="thisData.asysljsnsjcybjseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.asysljsnsjcybjseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','asysljsnsjcybjse',$event,'ydksehj')" v-text="thisData.asysljsnsjcybjseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">应抵扣税额合计</td>
                        <td class="pad3 center">17=12+13-14-15+16</td>
                        <td class="pad3 center" :contenteditable="thisData.ydksehjybby.columnEdit==1" @blur="unfocus('table1','yb','by','ydksehj',$event,'sjdkse')" v-text="thisData.ydksehjybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" :contenteditable="thisData.ydksehjjzby.columnEdit==1" @blur="unfocus('table1','yb','lj','ydksehj',$event,'sjdkse')" v-text="thisData.ydksehjjzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">实际抵扣税额</td>
                        <td class="pad3 center">18（如17
                            <11，则为17，否则为11）</td>
                                <td class="pad3 center" :contenteditable="thisData.sjdkseybby.columnEdit==1" @blur="unfocus('table1','yb','by','sjdkse',$event,'sjdkse')" v-text="thisData.sjdkseybby.columnValue"></td>
                                <td class="pad3 center" :contenteditable="thisData.sjdkseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','sjdkse',$event,'sjdkse')" v-text="thisData.sjdkseybbnlj.columnValue"></td>
                                <td class="pad3 center" :contenteditable="thisData.sjdksejzby.columnEdit==1" @blur="unfocus('table1','jz','by','sjdkse',$event,'sjdkse')" v-text="thisData.sjdksejzby.columnValue"></td>
                                <td class="pad3 center" :contenteditable="thisData.sjdksejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','sjdkse',$event,'sjdkse')" v-text="thisData.sjdksejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">应纳税额</td>
                        <td class="pad3 center">19=if(（11-18）>0,(11-18-附表4G16),(11-18))</td>
                        <td class="pad3 center" :contenteditable="thisData.ynseybby.columnEdit==1" @blur="unfocus('table1','yb','by','ynse',$event,'ynsehj')" v-text="thisData.ynseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','ynse',$event,'ynsehj')" v-text="thisData.ynseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','ynse',$event,'ynsehj')" v-text="thisData.ynsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','ynse',$event,'ynsehj')" v-text="thisData.ynsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">期末留抵税额</td>
                        <td class="pad3 center">20=17-18</td>
                        <td class="pad3 center" :contenteditable="thisData.qmldseybby.columnEdit==1" @blur="unfocus('table1','yb','by','qmldse',$event)" v-text="thisData.qmldseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qmldseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','qmldse',$event)" v-text="thisData.qmldseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qmldsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','qmldse',$event)" v-text="thisData.qmldsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">简易计税办法计算的应纳税额</td>
                        <td class="pad3 center">21</td>
                        <td class="pad3 center" :contenteditable="thisData.jyjsynseybby.columnEdit==1" @blur="unfocus('table1','yb','by','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jyjsynseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jyjsynsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jyjsynsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">按简易计税办法计算的纳税检查应补缴税额</td>
                        <td class="pad3 center">22</td>
                        <td class="pad3 center" :contenteditable="thisData.ajynsjcybjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','ajynsjcybjse',$event,'qmmjcbse')" v-text="thisData.ajynsjcybjseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ajynsjcybjseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','ajynsjcybjse',$event,'qmmjcbse')" v-text="thisData.ajynsjcybjseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">应纳税额减征额</td>
                        <td class="pad3 center">23</td>
                        <td class="pad3 center" :contenteditable="thisData.ynsejzeybby.columnEdit==1" @blur="unfocus('table1','yb','by','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzeybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsejzeybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzeybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsejzejzby.columnEdit==1" @blur="unfocus('table1','jz','by','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsejzejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">应纳税额合计</td>
                        <td class="pad3 center">24=19+21-23</td>
                        <td class="pad3 center" :contenteditable="thisData.ynsehjybby.columnEdit==1" @blur="unfocus('table1','yb','by','ynsehj',$event,'qmwjse')" v-text="thisData.ynsehjybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsehjybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','ynsehj',$event,'qmwjse')" v-text="thisData.ynsehjybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsehjjzby.columnEdit==1" @blur="unfocus('table1','jz','by','ynsehj',$event,'qmwjse')" v-text="thisData.ynsehjjzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ynsehjjzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','ynsehj',$event,'qmwjse')" v-text="thisData.ynsehjjzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td rowspan="14" class="shuli">税款缴纳</td>
                        <td class="pad3">期初未缴税额（多缴为负数）</td>
                        <td class="pad3 center">25</td>
                        <td class="pad3 center" :contenteditable="thisData.qcmjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qcmjseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qcmjsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qcmjsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">实收出口开具专用缴款书退税额</td>
                        <td class="pad3 center">26</td>
                        <td class="pad3 center" :contenteditable="thisData.ssckkjzyjkstkeybby.columnEdit==1" @blur="unfocus('table1','yb','by','ssckkjzyjkstke',$event,'qmwjse')" v-text="thisData.ssckkjzyjkstkeybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.ssckkjzyjkstkeybbnlj.columnEdit==1" @blur="unfocus('table1','yb','by','ssckkjzyjkstke',$event,'qmwjse')" v-text="thisData.ssckkjzyjkstkeybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">本期已缴税额</td>
                        <td class="pad3 center">27=28+29+30+31</td>
                        <td class="pad3 center" :contenteditable="thisData.bqyjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','bqyjse',$event,'qmwjse')" v-text="thisData.bqyjseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.bqyjseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','bqyjse',$event,'qmwjse')" v-text="thisData.bqyjseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.bqyjsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','bqyjse',$event,'qmwjse')" v-text="thisData.bqyjsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.bqyjsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','bqyjse',$event,'qmwjse')" v-text="thisData.bqyjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">①分次预缴税额</td>
                        <td class="pad3 center">28</td>
                        <td class="pad3 center" :contenteditable="thisData.cyjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','cyjse',$event,'bqyjse')" v-text="thisData.cyjseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" :contenteditable="thisData.cyjsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','cyjse',$event,'bqyjse')" v-text="thisData.cyjsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">②出口开具专用缴款书预缴税额</td>
                        <td class="pad3 center">29</td>
                        <td class="pad3 center" :contenteditable="thisData.ckkjzyjksyjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','cyjse',$event,'bqyjse')" v-text="thisData.ckkjzyjksyjseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">③本期缴纳上期应纳税额</td>
                        <td class="pad3 center">30</td>
                        <td class="pad3 center" :contenteditable="thisData.jqjnsqynseybby.columnEdit==1" @blur="unfocus('table1','yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jqjnsqynseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jqjnsqynsejzby.columnEdit==1" @blur="unfocus('table1','yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jqjnsqynsejzbnlj.columnEdit==1" @blur="unfocus('table1','yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">④本期缴纳欠缴税额</td>
                        <td class="pad3 center">31</td>
                        <td class="pad3 center" :contenteditable="thisData.bqjnqjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.bqjnqjseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.bqjnqjsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.bqjnqjsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">期末未缴税额（多缴为负数）</td>
                        <td class="pad3 center">32=24+25+26-27</td>
                        <td class="pad3 center" :contenteditable="thisData.qmwjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','qmwjse',$event)" v-text="thisData.qmwjseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qmwjseybbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','qmwjse',$event)" v-text="thisData.qmwjseybbnlj.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qmwjsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','qmwjse',$event)" v-text="thisData.qmwjsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qmwjsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','qmwjse',$event)" v-text="thisData.qmwjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：欠缴税额（≥0）</td>
                        <td class="pad3 center">33=25+26-27</td>
                        <td class="pad3 center" :contenteditable="thisData.qzqjseybby.columnEdit==1" @blur="unfocus('table1','yb','by','qzqjse',$event)" v-text="thisData.qzqjseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" :contenteditable="thisData.qzqjsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','qzqjse',$event)" v-text="thisData.qzqjsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">本期应补(退)税额</td>
                        <td class="pad3 center">34＝24-28-29</td>
                        <td class="pad3 center" :contenteditable="thisData.bqybtseybby.columnEdit==1" @blur="unfocus('table1','yb','by','bqybtse',$event)" v-text="thisData.bqybtseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" :contenteditable="thisData.bqybtsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','bqybtse',$event)" v-text="thisData.bqybtsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">即征即退实际退税额</td>
                        <td class="pad3 center">35</td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" :contenteditable="thisData.jzjtsjtsejzby.columnEdit==1" @blur="unfocus('table1','jz','by','jzjtsjtse',$event)" v-text="thisData.jzjtsjtsejzby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.jzjtsjtsejzbnlj.columnEdit==1" @blur="unfocus('table1','jz','lj','jzjtsjtse',$event)" v-text="thisData.jzjtsjtsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">期初未缴查补税额</td>
                        <td class="pad3 center">36</td>
                        <td class="pad3 center" :contenteditable="thisData.qcmjcbseybby.columnEdit==1" @blur="unfocus('table1','yb','by','qcmjcbse',$event,'qmmjcbse')" v-text="thisData.qcmjcbseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qcmjcbseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','qcmjcbse',$event,'qmmjcbse')" v-text="thisData.qcmjcbseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">本期入库查补税额</td>
                        <td class="pad3 center">37</td>
                        <td class="pad3 center" :contenteditable="thisData.bqrkcbseybby.columnEdit==1" @blur="unfocus('table1','yb','by','bqrkcbse',$event,'qmmjcbse')" v-text="thisData.bqrkcbseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.bqrkcbseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','bqrkcbse',$event,'qmmjcbse')" v-text="thisData.bqrkcbseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">期末未缴查补税额</td>
                        <td class="pad3 center">38=16+22+36-37</td>
                        <td class="pad3 center" :contenteditable="thisData.qmmjcbseybby.columnEdit==1" @blur="unfocus('table1','yb','by','qmmjcbse',$event)" v-text="thisData.qmmjcbseybby.columnValue"></td>
                        <td class="pad3 center" :contenteditable="thisData.qmmjcbseybbnlj.columnEdit==1" @blur="unfocus('table1','yb','lj','qmmjcbse',$event)" v-text="thisData.qmmjcbseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                </table>
                <div class="signBox">
                    <div class="signtitle">授权声明</div>
                    <div class="contentBox">
                        <div>如果你已委托代理人申报，请填写下列资料：</div>
                        <div>为代理一切税务事宜，现授权</div>
                        <div style="margin-left:0">（地址）<span style="margin-left:0.8rem">为本纳税人的代理申报人，任何与本</span></div>
                        <div>申报表有关的往来文件，都可寄予此人。</div><br>
                        <div style="float:right;margin-right:20%">授权人签字：</div>
                    </div>
                    <div class="signtitle" style="padding-top: 13px;height: calc(1.4rem - 13px);">申报人声明</div>
                    <div class="contentBox" style="padding-top: 45px;height: calc(1.4rem - 45px);border-right:1px solid gray">
                        <div>本纳税申报表是根据国家税收法律法规及相关规定填报的，我确定它是真实的、可靠的、完整的。</div>
                        <br>
                        <div style="float:right;margin-right:20%">授权人签字：</div>
                    </div>
                </div>
                <el-form :inline="true" class="demo-form-inline" size="small">
                    <div class="bottomline1">
                        <el-form-item label="主管税务机关：">
                            <el-input v-model="officeName"></el-input>
                        </el-form-item>
                        <el-form-item label="接收人：">
                            <el-input v-model="receiveName"></el-input>
                        </el-form-item>
                        <el-form-item label="接受日期：">
                            <el-input v-model="receiveDate"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div v-if="statusVaule=='一般纳税人附表一'">
                <table border="1 " width="100% " v-if="thisData.bfz13hwjjgxlxplwybjszzsfpxse">
                    <tr>
                        <td colspan="4" rowspan="3" class="center">项目及栏次</td>
                        <td colspan="2" class="center">开具增值税专用发票 </td>
                        <td colspan="2" class="center">开具其他发票 </td>
                        <td colspan="2" class="center">未开具发票</td>
                        <td colspan="2" class="center">纳税检查调整</td>
                        <td colspan="3" class="center">合计</td>
                        <td rowspan="2" class="center" style="width:1rem">服务、不动产和无形资产扣除项目本期实际扣除金额</td>
                        <td colspan="2" class="center">扣除后</td>
                    </tr>
                    <tr>
                        <td class="center">销售额 </td>
                        <td class="center">销项(应纳)税额 </td>
                        <td class="center">销售额 </td>
                        <td class="center">销项(应纳)税额 </td>
                        <td class="center">销售额 </td>
                        <td class="center">销项(应纳)税额 </td>
                        <td class="center">销售额 </td>
                        <td class="center">销项(应纳)税额 </td>
                        <td class="center">销售额 </td>
                        <td class="center">销项(应纳)税额 </td>
                        <td class="center">价税合计</td>
                        <td class="center">含税(免税)销售额</td>
                        <td class="center">销项(应纳)税额 </td>
                    </tr>
                    <tr>
                        <td class="center">1</td>
                        <td class="center">2</td>
                        <td class="center">3</td>
                        <td class="center">4</td>
                        <td class="center">5</td>
                        <td class="center">6</td>
                        <td class="center">7</td>
                        <td class="center">8</td>
                        <td class="center">9=1+3+5+7</td>
                        <td class="center">10=2+4+6+8</td>
                        <td class="center">11=9+10</td>
                        <td class="center">12</td>
                        <td class="center">13=11-12</td>
                        <td class="center" style="width:1rem">14=13÷(100%+税率或征收率)×税率或征收率</td>
                    </tr>
                    <tr>
                        <td rowspan="7" class="center shuli">一、一般计税方法计税</td>
                        <td rowspan="5" class="center">全部征税项目</td>
                        <td class="center">13%税率的货物及加工修理修配劳务</td>
                        <td class="center">1</td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjszzsfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjszzsfpxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjszzsfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjszzsfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjszzsfpxxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjszzsfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjskjqtfpxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjskjqtfpxxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjswkjfpxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjswkjfpxxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjswkjfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjsnsjctzxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjsnsjctzxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjsnsjctzxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjsnsjctzxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjsnsjctzxxse',$event,'hjxse','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjsnsjctzxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjshjxse',$event,'','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13hwjjgxlxplwybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13hwjjgxlxplwybjshjxxse',$event,'','bfz13hwjjgxlxplwybjs')" v-text="this.thisData.bfz13hwjjgxlxplwybjshjxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">13%税率的服务、不动产和无形资产</td>
                        <td class="center">2</td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjszzsfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjszzsfpxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjszzsfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjszzsfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjszzsfpxxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjszzsfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjskjqtfpxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjskjqtfpxxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjswkjfpxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjswkjfpxxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjswkjfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjsnsjctzxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjsnsjctzxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjsnsjctzxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjsnsjctzxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjsnsjctzxxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjsnsjctzxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjshjxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjshjxxse',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjshjjshj.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjshjjshj',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','bfz13fwbdchwxzcybjs',0.13)" v-text="thisData.bfz13fwbdchwxzcybjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz13fwbdchwxzcybjskchhsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz13fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje',$event,'','bfz13fwbdchwxzcybjs')" v-text="thisData.bfz13fwbdchwxzcybjskchhsxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="center">9%税率的货物及加工修理修配劳务</td>
                        <td class="center">3</td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjszzsfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjszzsfpxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjszzsfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjszzsfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjszzsfpxxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjszzsfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjskjqtfpxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjskjqtfpxxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjswkjfpxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjswkjfpxxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjswkjfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjsnsjctzxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjsnsjctzxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjsnsjctzxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjsnsjctzxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjsnsjctzxxse',$event,'hjxse','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjsnsjctzxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjshjxse',$event,'','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9hwjjgxlxplwybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9hwjjgxlxplwybjshjxxse',$event,'','bfz9hwjjgxlxplwybjs')" v-text="thisData.bfz9hwjjgxlxplwybjshjxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">9%税率的服务、不动产和无形资产</td>
                        <td class="center">4</td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjszzsfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjszzsfpxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjszzsfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjszzsfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjszzsfpxxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjszzsfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjskjqtfpxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjskjqtfpxxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjswkjfpxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjswkjfpxxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjswkjfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjsnsjctzxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjsnsjctzxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjsnsjctzxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjsnsjctzxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjsnsjctzxxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjsnsjctzxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjshjxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjshjxxse',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjshjjshj.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjshjjshj',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjskchhsxse',$event,'hjxse','bfz9fwbdchwxzcybjs',0.09)" v-text="thisData.bfz9fwbdchwxzcybjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz9fwbdchwxzcybjskchhsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz9fwbdchwxzcybjskchhsxxse',$event,'','bfz9fwbdchwxzcybjs')" v-text="thisData.bfz9fwbdchwxzcybjskchhsxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="center">6%税率</td>
                        <td class="center">5</td>
                        <td class="center" :contenteditable="thisData.bfz6slybjszzsxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjszzsxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjszzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjszzsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjszzsxxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjszzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjskjqtfpxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjskjqtfpxxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjswkjfpxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjswkjfpxxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjswkjfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjsnsjctzxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjsnsjctzxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjsnsjctzxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjsnsjctzxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjsnsjctzxxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjsnsjctzxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjshjxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjshjxxse',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjshjjshj.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjshjjshj',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjsfubdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjsfubdchwxzckcxmbqsjkcje',$event,'hjxse','bfz6slybjs')" v-text="thisData.bfz6slybjsfubdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjskchhsxse',$event,'hjxse','bfz6slybjs',0.06)" v-text="thisData.bfz6slybjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6slybjskchhsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6slybjskchhsxxse',$event,'','bfz6slybjs')" v-text="thisData.bfz6slybjskchhsxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="center">其中：即征即退项目</td>
                        <td class="center">即征即退货物及加工修理修配劳务</td>
                        <td class="center">6</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.jzjthwjjgxlybhjxse.columnEdit==1" @blur="unfocus('table2','','','jzjthwjjgxlybhjxse',$event,'','')" v-text="thisData.jzjthwjjgxlybhjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjthwjjgxlybhjxse.columnEdit==1" @blur="unfocus('table2','','','jzjthwjjgxlybhjxse',$event,'','')" v-text="thisData.jzjthwjjgxlybhjxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">即征即退服务、不动产和无形资产</td>
                        <td class="center">7</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcybjshjxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcybjshjxse',$event,'hjxse','jzjtfwbdchwxzcybjs')" v-text="thisData.jzjtfwbdchwxzcybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcybjshjxxse',$event,'hjxse','jzjtfwbdchwxzcybjs')" v-text="thisData.jzjtfwbdchwxzcybjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcybjshjjshj.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcybjshjjshj',$event,'hjxse','jzjtfwbdchwxzcybjs')" v-text="thisData.jzjtfwbdchwxzcybjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','jzjtfwbdchwxzcybjs')" v-text="thisData.jzjtfwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcybjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcybjskchhsxse',$event,'','jzjtfwbdchwxzcybjs')" v-text="thisData.jzjtfwbdchwxzcybjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcybjskchhsxxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcybjskchhsxxse',$event,'','jzjtfwbdchwxzcybjs')" v-text="thisData.jzjtfwbdchwxzcybjskchhsxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td rowspan="11" class="center">二、简易计税方法计税</td>
                        <td rowspan="9" class="center">全部征税项目</td>
                        <td class="center">6%征收率</td>
                        <td class="center">8</td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjszzsxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjszzsxse',$event,'hjxse','bfz6zsljyjs')" v-text="thisData.bfz6zsljyjszzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjszzsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjszzsxxse',$event,'hjxse','bfz6zsljyjs')" v-text="thisData.bfz6zsljyjszzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjjskqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjjskqtfpxse',$event,'hjxse','bfz6zsljyjjs')" v-text="thisData.bfz6zsljyjjskqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjjskqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjjskqtfpxxse',$event,'hjxse','bfz6zsljyjjs')" v-text="thisData.bfz6zsljyjjskqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjswkjfpxse',$event,'hjxse','bfz6zsljyjs')" v-text="thisData.bfz6zsljyjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjswkjfpxxse',$event,'hjxse','bfz6zsljyjs')" v-text="thisData.bfz6zsljyjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjshjxse',$event,'','bfz6zsljyjs')" v-text="thisData.bfz6zsljyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz6zsljyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz6zsljyjshjxxse',$event,'','bfz6zsljyjs')" v-text="thisData.bfz6zsljyjshjxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">5%征收率的货物及加工修理修配劳务</td>
                        <td class="center">9a</td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjszzsxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjszzsxse',$event,'hjxse','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjszzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjszzsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjszzsxxse',$event,'hjxse','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjszzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjskjqtfpxse',$event,'hjxse','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjskjqtfpxxse',$event,'hjxse','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjswkjfpxse',$event,'hjxse','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjswkjfpxxse',$event,'hjxse','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjshjxse',$event,'','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5zsljyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5zsljyjshjxxse',$event,'','bfz5zsljyjs')" v-text="thisData.bfz5zsljyjshjxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">5%征收率的服务、不动产和无形资产</td>
                        <td class="center">9b</td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjszzsfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjszzsfpxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjszzsfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjszzsfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjszzsfpxxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjszzsfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjskjqtfpxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjskjqtfpxxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjswkjfpxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjswkjfpxxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjshjxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjshjxxse',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjshjjshj.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjshjjshj',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjskchhsxse',$event,'hjxse','bfz5fwbdchwxzcybjs',0.05)" v-text="thisData.bfz5fwbdchwxzcybjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz5fwbdchwxzcybjskchhsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz5fwbdchwxzcybjskchhsxxse',$event,'','bfz5fwbdchwxzcybjs')" v-text="thisData.bfz5fwbdchwxzcybjskchhsxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="center">4%征收率</td>
                        <td class="center">10</td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjszzsxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjszzsxse',$event,'hjxse','bfz4zsljyjs')" v-text="thisData.bfz4zsljyjszzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjszzsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjszzsxxse',$event,'hjxse','bfz4zsljyjs')" v-text="thisData.bfz4zsljyjszzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjskjqtfpxse',$event,'hjxse','bfz4zsljyjjs')" v-text="thisData.bfz4zsljyjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjskjqtfpxxse',$event,'hjxse','bfz4zsljyjjs')" v-text="thisData.bfz4zsljyjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjswkjfpxse',$event,'hjxse','bfz4zsljyjs')" v-text="thisData.bfz4zsljyjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjswkjfpxxse',$event,'hjxse','bfz4zsljyjs')" v-text="thisData.bfz4zsljyjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjshjxse',$event,'','bfz4zsljyjs')" v-text="thisData.bfz4zsljyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz4zsljyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz4zsljyjshjxxse',$event,'','bfz4zsljyjs')" v-text="thisData.bfz4zsljyjshjxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">3%征收率的货物及加工修理修配劳务</td>
                        <td class="center">11</td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjszzsxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjszzsxse',$event,'hjxse','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjszzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjszzsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjszzsxxse',$event,'hjxse','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjszzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjskjqtfpxse',$event,'hjxse','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjskjqtfpxxse',$event,'hjxse','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjswjjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjswjjfpxse',$event,'hjxse','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjswjjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjswjjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjswjjfpxxse',$event,'hjxse','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjswjjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjshjxse',$event,'','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3hwjjgxljyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3hwjjgxljyjshjxxse',$event,'','bfz3hwjjgxljyjs')" v-text="thisData.bfz3hwjjgxljyjshjxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">3%征收率的服务、不动产和无形资产</td>
                        <td class="center">12</td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjszzsfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjszzsfpxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjszzsfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjszzsfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjszzsfpxxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjszzsfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjskjqtfpxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjskjqtfpxxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjswkjfpxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjswkjfpxxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjshjxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjshjxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjshjxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjshjxxse',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjshjjshj.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjshjjshj',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjskchhsxse',$event,'hjxse','bfz3fwbdchwxzcybjs',0.03)" v-text="thisData.bfz3fwbdchwxzcybjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bfz3fwbdchwxzcybjskchhsxxse.columnEdit==1" @blur="unfocus('table2','','','bfz3fwbdchwxzcybjskchhsxxse',$event,'','bfz3fwbdchwxzcybjs')" v-text="thisData.bfz3fwbdchwxzcybjskchhsxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="center">预征率<span contenteditable @blur="unfocus('table2','','','yll13azsljyjssl',$event,'hjxse','yll13azsljyjs',arate)">{{arate}} </span>%</td>
                        <td class="center">13a</td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjsskzzsxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjsskzzsxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjsskzzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjsskzzsxxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjsskzzsxxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjsskzzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjskjqtfpxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjskjqtfpxxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjswkjfpxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjswkjfpxxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjshjxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjshjxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjshjxxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjshjjshj.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjshjjshj',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjskchhsxse',$event,'hjxse','yll13azsljyjs')" v-text="thisData.yll13azsljyjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13azsljyjskchxxse.columnEdit==1" @blur="unfocus('table2','','','yll13azsljyjskchxxse',$event,'','yll13azsljyjs')" v-text="thisData.yll13azsljyjskchxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="center">预征率<span contenteditable @blur="unfocus('table2','','','yll13bzsljyjssl',$event,'hjxse','yll13bzsljyjs',brate)">{{brate}}</span>%</td>
                        <td class="center">13b</td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjsskzzsxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjsskzzsxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjsskzzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjsskzzsxxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjsskzzsxxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjsskzzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjskjqtfpxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjskjqtfpxxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjswkjfpxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjswkjfpxxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjshjxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjshjxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjshjxxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjshjjshj.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjshjjshj',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjskchhsxse',$event,'hjxse','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13bzsljyjskchxxse.columnEdit==1" @blur="unfocus('table2','','','yll13bzsljyjskchxxse',$event,'','yll13bzsljyjs')" v-text="thisData.yll13bzsljyjskchxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="center">预征率<span contenteditable @blur="unfocus('table2','','','yll13czsljyjssl',$event,'hjxse','yll13czsljyjs',crate)">{{crate}}</span>%</td>
                        <td class="center">13c</td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjsskzzsxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjsskzzsxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjsskzzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjsskzzsxxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjsskzzsxxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjsskzzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjskjqtfpxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjskjqtfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjskjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjskjqtfpxxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjskjqtfpxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjswkjfpxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjswkjfpxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjswkjfpxxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjswkjfpxxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjswkjfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjshjxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjshjxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjshjxxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjshjjshj.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjshjjshj',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjskchhsxse',$event,'hjxse','yll13czsljyjs')" v-text="thisData.yll13czsljyjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.yll13czsljyjskchxxse.columnEdit==1" @blur="unfocus('table2','','','yll13czsljyjskchxxse',$event,'','yll13czsljyjs')" v-text="thisData.yll13czsljyjskchxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="center">其中：即征即退项目</td>
                        <td class="center">即征即退货物及加工修理修配劳务</td>
                        <td class="center">14</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.jzjthwjgjyjshjxse.columnEdit==1" @blur="unfocus('table2','','','jzjthwjgjyjshjxse',$event,'','')" v-text="thisData.jzjthwjgjyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjthwjgjyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','jzjthwjgjyjshjxxse',$event,'','')" v-text="thisData.jzjthwjgjyjshjxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">即征即退服务、不动产和无形资产</td>
                        <td class="center">15</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcjyjshjxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcjyjshjxse',$event,'hjxse','jzjtfwbdchwxzcjyjs')" v-text="thisData.jzjtfwbdchwxzcjyjshjxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcjyjshjxxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcjyjshjxxse',$event,'hjxse','jzjtfwbdchwxzcjyjs')" v-text="thisData.jzjtfwbdchwxzcjyjshjxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcjyjshjjshj.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcjyjshjjshj',$event,'hjxse','jzjtfwbdchwxzcybjs')" v-text="thisData.jzjtfwbdchwxzcjyjshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcjyjsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcjyjsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','jzjtfwbdchwxzcjyjs')" v-text="thisData.jzjtfwbdchwxzcjyjsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcjyjskchhsxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcjyjskchhsxse',$event,'','jzjtfwbdchwxzcjyjs')" v-text="thisData.jzjtfwbdchwxzcjyjskchhsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.jzjtfwbdchwxzcjyjskchhsxxse.columnEdit==1" @blur="unfocus('table2','','','jzjtfwbdchwxzcjyjskchhsxxse',$event,'','jzjtfwbdchwxzcjyjs')" v-text="thisData.jzjtfwbdchwxzcjyjskchhsxxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="center">三、免抵退税</td>
                        <td colspan="2" class="center">货物及加工修理修配劳务</td>
                        <td class="center">16</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmdtskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmdtskjqtfpxse',$event,'hjxse','hwjjgxllwmdts')" v-text="thisData.hwjjgxllwmdtskjqtfpxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmdtswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmdtswkjfpxse',$event,'hjxse','hwjjgxllwmdts')" v-text="thisData.hwjjgxllwmdtswkjfpxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmdtshjxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmdtshjxse',$event,'hjxse','hwjjgxllwmdts')" v-text="thisData.hwjjgxllwmdtshjxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="center">服务、不动产和无形资产</td>
                        <td class="center">17</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmdtskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmdtskjqtfpxse',$event,'hjxse','fwbdchwxzcmdts')" v-text="thisData.fwbdchwxzcmdtskjqtfpxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmdtswkjqtfpxxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmdtswkjqtfpxxse',$event,'hjxse','fwbdchwxzcmdts')" v-text="thisData.fwbdchwxzcmdtswkjqtfpxxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmdtshjxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmdtshjxse',$event,'hjxse','fwbdchwxzcmdts')" v-text="thisData.fwbdchwxzcmdtshjxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmdtshjjshj.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmdtshjjshj',$event,'hjxse','fwbdchwxzcmdts')" v-text="thisData.fwbdchwxzcmdtshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmdtsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmdtsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','fwbdchwxzcmdts')" v-text="thisData.fwbdchwxzcmdtsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmdtskchhsxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmdtskchhsxse',$event,'','fwbdchwxzcmdts')" v-text="thisData.fwbdchwxzcmdtskchhsxse.columnValue"></td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="center">四、免税</td>
                        <td colspan="2" class="center">货物及加工修理修配劳务</td>
                        <td class="center">18</td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmsskzzsxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmsskzzsxse',$event,'hjxse','hwjjgxllwmssk')" v-text="thisData.hwjjgxllwmsskzzsxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmsskzzsxxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmsskzzsxxse',$event,'hjxse','hwjjgxllwmssk')" v-text="thisData.hwjjgxllwmsskzzsxxse.columnValue"></td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmskjqtfpxse',$event,'hjxse','hwjjgxllwmssk')" v-text="thisData.hwjjgxllwmskjqtfpxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmswkjfpxse',$event,'hjxse','hwjjgxllwmssk')" v-text="thisData.hwjjgxllwmswkjfpxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.hwjjgxllwmshjxse.columnEdit==1" @blur="unfocus('table2','','','hwjjgxllwmshjxse',$event,'hjxse','hwjjgxllwmssk')" v-text="thisData.hwjjgxllwmshjxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="center">服务、不动产和无形资产</td>
                        <td class="center">19</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmskjqtfpxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmskjqtfpxse',$event,'hjxse','fwbdchwxzcms')" v-text="thisData.fwbdchwxzcmskjqtfpxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmswkjfpxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmswkjfpxse',$event,'hjxse','fwbdchwxzcms')" v-text="thisData.fwbdchwxzcmswkjfpxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmshjxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmshjxse',$event,'hjxse','fwbdchwxzcms')" v-text="thisData.fwbdchwxzcmshjxse.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmshjjshj.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmshjjshj',$event,'hjxse','fwbdchwxzcms')" v-text="thisData.fwbdchwxzcmshjjshj.columnValue"></td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmsfwbdchwxzckcxmbqsjkcje.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmsfwbdchwxzckcxmbqsjkcje',$event,'hjxse','fwbdchwxzcms')" v-text="thisData.fwbdchwxzcmsfwbdchwxzckcxmbqsjkcje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.fwbdchwxzcmskchhsxse.columnEdit==1" @blur="unfocus('table2','','','fwbdchwxzcmskchhsxse',$event,'','fwbdchwxzcms')" v-text="thisData.fwbdchwxzcmskchhsxse.columnValue"></td>
                        <td class="center">--</td>
                    </tr>
                </table>
            </div>
            <div v-if="statusVaule=='一般纳税人附表二'">
                <table border="1 " width="100% " v-if="thisData.azsfgdbyxdkfs">
                    <tr>
                        <td colspan="5" class="center">一、申报抵扣的进项税额</td>
                    </tr>
                    <tr>
                        <td class="">项目</td>
                        <td class="center" style="width:1.4rem">栏次</td>
                        <td class="center">份数</td>
                        <td class="center">金额</td>
                        <td class="center">税额</td>
                    </tr>
                    <tr>
                        <td>（一）认证相符的增值税专用发票</td>
                        <td class="center">1=2+3</td>
                        <td class="center" :contenteditable="thisData.rzxfzzszyfpsbdkfs.columnEdit==1" @blur="unfocus('table3','','','rzxfzzszyfpsbdkfs',$event,'','')" v-text="thisData.rzxfzzszyfpsbdkfs.columnValue"></td>
                        <td class="center" :contenteditable="thisData.rzxfzzszyfpsbdkje.columnEdit==1" @blur="unfocus('table3','','','rzxfzzszyfpsbdkje',$event,'','')" v-text="thisData.rzxfzzszyfpsbdkje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.rzxfzzszyfpsbdkse.columnEdit==1" @blur="unfocus('table3','','','rzxfzzszyfpsbdkse',$event,'','')" v-text="thisData.rzxfzzszyfpsbdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">其中：本期认证相符且本期申报抵扣</td>
                        <td class="center">2</td>
                        <td class="center" :contenteditable="thisData.bqrzxfqbqsbdkfs.columnEdit==1" @blur="unfocus('table3','fs','','bqrzxfqbqsbdkfs',$event,'rzxfzzszyfpsbdk','')" v-text="thisData.bqrzxfqbqsbdkfs.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bqrzxfqbqsbdkje.columnEdit==1" @blur="unfocus('table3','je','','bqrzxfqbqsbdkje',$event,'rzxfzzszyfpsbdk','')" v-text="thisData.bqrzxfqbqsbdkje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.bqrzxfqbqsbdkse.columnEdit==1" @blur="unfocus('table3','se','','bqrzxfqbqsbdkse',$event,'rzxfzzszyfpsbdk','')" v-text="thisData.bqrzxfqbqsbdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">前期认证相符且本期申报抵扣</td>
                        <td class="center">3</td>
                        <td class="center" :contenteditable="thisData.qqrzxfqbqsbdkfs.columnEdit==1" @blur="unfocus('table3','fs','','qqrzxfqbqsbdkfs',$event,'rzxfzzszyfpsbdk','')" v-text="thisData.qqrzxfqbqsbdkfs.columnValue"></td>
                        <td class="center" :contenteditable="thisData.qqrzxfqbqsbdkje.columnEdit==1" @blur="unfocus('table3','je','','qqrzxfqbqsbdkje',$event,'rzxfzzszyfpsbdk','')" v-text="thisData.qqrzxfqbqsbdkje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.qqrzxfqbqsbdkse.columnEdit==1" @blur="unfocus('table3','se','','qqrzxfqbqsbdkse',$event,'rzxfzzszyfpsbdk','')" v-text="thisData.qqrzxfqbqsbdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>（二）其他扣税凭证</td>
                        <td class="center">4=5+6+7+8a+8b</td>
                        <td class="center" :contenteditable="thisData.qtkspzfs.columnEdit==1" @blur="unfocus('table3','','','qtkspzfs',$event,'','')" v-text="thisData.qtkspzfs.columnValue"></td>
                        <td class="center" :contenteditable="thisData.qtkspzje.columnEdit==1" @blur="unfocus('table3','','','qtkspzje',$event,'','')" v-text="thisData.qtkspzje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.qtkspzse.columnEdit==1" @blur="unfocus('table3','','','qtkspzse',$event,'','')" v-text="thisData.qtkspzse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">其中：海关进口增值税专用缴款书</td>
                        <td class="center">5</td>
                        <td class="center" :contenteditable="thisData.hgjkzzszyjksfs.columnEdit==1" @blur="unfocus('table3','fs','','hgjkzzszyjksfs',$event,'qtkspz','')" v-text="thisData.hgjkzzszyjksfs.columnValue"></td>
                        <td class="center" :contenteditable="thisData.hgjkzzszyjksje.columnEdit==1" @blur="unfocus('table3','je','','hgjkzzszyjksje',$event,'qtkspz','')" v-text="thisData.hgjkzzszyjksje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.hgjkzzszyjksse.columnEdit==1" @blur="unfocus('table3','se','','hgjkzzszyjksse',$event,'qtkspz','')" v-text="thisData.hgjkzzszyjksse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">农产品收购发票或者销售发票</td>
                        <td class="center">6</td>
                        <td class="center" :contenteditable="thisData.ncpsgfphzxsfpfs.columnEdit==1" @blur="unfocus('table3','fs','','ncpsgfphzxsfpfs',$event,'qtkspz','')" v-text="thisData.ncpsgfphzxsfpfs.columnValue"></td>
                        <td class="center" :contenteditable="thisData.ncpsgfphzxsfpje.columnEdit==1" @blur="unfocus('table3','je','','ncpsgfphzxsfpje',$event,'qtkspz','')" v-text="thisData.ncpsgfphzxsfpje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.ncpsgfphzxsfpsbdkse.columnEdit==1" @blur="unfocus('table3','se','','ncpsgfphzxsfpsbdkse',$event,'qtkspz','')" v-text="thisData.ncpsgfphzxsfpsbdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">代扣代缴税收缴款凭证</td>
                        <td class="center">7</td>
                        <td class="center" :contenteditable="thisData.dkdjssjkpzfs.columnEdit==1" @blur="unfocus('table3','fs','','dkdjssjkpzfs',$event,'qtkspz','')" v-text="thisData.dkdjssjkpzfs.columnValue"></td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.dkdjssjkpzse.columnEdit==1" @blur="unfocus('table3','se','','dkdjssjkpzse',$event,'qtkspz','')" v-text="thisData.dkdjssjkpzse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">加计扣除农产品进项税额</td>
                        <td class="center">8a</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" :contenteditable="thisData.jjkcncpjxsese.columnEdit==1" @blur="unfocus('table3','se','','jjkcncpjxsese',$event,'qtkspz','')" v-text="thisData.jjkcncpjxsese.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">其他</td>
                        <td class="center">8b</td>
                        <td class="center" :contenteditable="thisData.sbdkdjxseqtkspzqtfs.columnEdit==1" @blur="unfocus('table3','fs','','sbdkdjxseqtkspzqtfs',$event,'qtkspz','')" v-text="thisData.sbdkdjxseqtkspzqtfs.columnValue"></td>
                        <td class="center" :contenteditable="thisData.sbdkdjxseqtkspzqtje.columnEdit==1" @blur="unfocus('table3','je','','sbdkdjxseqtkspzqtje',$event,'qtkspz','')" v-text="thisData.sbdkdjxseqtkspzqtje.columnValue"></td>
                        <td class="center" :contenteditable="thisData.sbdkdjxseqtkspzqtse.columnEdit==1" @blur="unfocus('table3','se','','sbdkdjxseqtkspzqtse',$event,'qtkspz','')" v-text="thisData.sbdkdjxseqtkspzqtse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>（三）本期用于购建不动产的扣税凭证</td>
                        <td class="center">9</td>
                        <td class="center" v-text="thisData.bqgjbdckspzfs.columnValue"></td>
                        <td class="center" v-text="thisData.bqgjbdckspzje.columnValue"></td>
                        <td class="center" v-text="thisData.bqgjbdckspzse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>（四）本期用于抵扣的旅客运输服务扣税凭证</td>
                        <td class="center">10</td>
                        <td class="center" v-text="thisData.bqyydkdlkysfwkspzfs.columnValue"></td>
                        <td class="center" v-text="thisData.bqyydkdlkysfwkspzje.columnValue"></td>
                        <td class="center" v-text="thisData.bqyydkdlkysfwkspzse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>（五）外贸企业进项税额抵扣证明</td>
                        <td class="center">11</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" v-text="thisData.wmqyjxsdkzmse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>当期申报抵扣进项税额合计</td>
                        <td class="center">12=1+4+11</td>
                        <td class="center" v-text="thisData.dqsbdkjxsehjfs.columnValue"></td>
                        <td class="center" v-text="thisData.dqsbdkjxsehjje.columnValue"></td>
                        <td class="center" v-text="thisData.dqsbdkjxsehjse.columnValue"></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="center">二、进项税额转出额</td>
                    </tr>
                    <tr>
                        <td class="">项目</td>
                        <td class="center">栏次</td>
                        <td colspan="3" class="center">税额</td>
                    </tr>
                    <tr>
                        <td>本期进项税额转出额</td>
                        <td class="center">13=14至23之和</td>
                        <td colspan="3" class="center" v-text="thisData.bqjxszcese.columnValue"></td>
                    </tr>
                    <tr>
                        <td>其中：免税项目用</td>
                        <td class="center">14</td>
                        <td colspan="3" class="center" v-text="thisData.msxmyse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">集体福利、个人消费</td>
                        <td class="center">15</td>
                        <td colspan="3" class="center" v-text="thisData.jtflgrxfse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">非正常损失</td>
                        <td class="center">16</td>
                        <td colspan="3" class="center" v-text="thisData.fzcssse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">简易计税方法征税项目用</td>
                        <td class="center">17</td>
                        <td colspan="3" class="center" v-text="thisData.jyjsbfzsxmyse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">免抵退税办法不得抵扣的进项税额</td>
                        <td class="center">18</td>
                        <td colspan="3" class="center" v-text="thisData.mdtsbfbddkdjxsese.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">纳税检查调减进项税额</td>
                        <td class="center">19</td>
                        <td colspan="3" class="center" v-text="thisData.nsjctjjxsese.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">红字专用发票信息表注明的进项税额</td>
                        <td class="center">20</td>
                        <td colspan="3" class="center" v-text="thisData.hzzyfptzdzmdjxsese.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">上期留抵税额抵减欠税</td>
                        <td class="center">21</td>
                        <td colspan="3" class="center" v-text="thisData.sqldsedjqsse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">上期留抵税额退税</td>
                        <td class="center">22</td>
                        <td colspan="3" class="center" v-text="thisData.sqldsetsse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">其他应作进项税额转出的情形</td>
                        <td class="center">23</td>
                        <td colspan="3" class="center" v-text="thisData.qtyzjxsezcdqxse.columnValue"></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="center">三、待抵扣进项税额</td>
                    </tr>
                    <tr>
                        <td class="">项目</td>
                        <td class="center">栏次</td>
                        <td class="center">份数</td>
                        <td class="center">金额</td>
                        <td class="center">税额</td>
                    </tr>
                    <tr>
                        <td class="">（一）认证相符的增值税专用发票</td>
                        <td class="center">24</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class=" padL">期初已认证相符但未申报抵扣</td>
                        <td class="center">25</td>
                        <td class="center" v-text="thisData.qcyrzxfqbqwsbdkfs.columnValue"></td>
                        <td class="center" v-text="thisData.qcyrzxfqbqwsbdkje.columnValue"></td>
                        <td class="center" v-text="thisData.qcyrzxfqbqwsbdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class=" padL">本期认证相符且本期未申报抵扣</td>
                        <td class="center">26</td>
                        <td class="center" v-text="thisData.bqrzxfqbqwsbdkfs.columnValue"></td>
                        <td class="center" v-text="thisData.bqrzxfqbqwsbdkje.columnValue"></td>
                        <td class="center" v-text="thisData.bqrzxfqbqwsbdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class=" padL">期末已认证相符但未申报抵扣</td>
                        <td class="center">27</td>
                        <td class="center" v-text="thisData.qmyrzxfdwsbdkfs.columnValue"></td>
                        <td class="center" v-text="thisData.qmyrzxfdwsbdkje.columnValue"></td>
                        <td class="center" v-text="thisData.qmyrzxfdwsbdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="padL">其中：按照税法规定不允许抵扣</td>
                        <td class="center">28</td>
                        <td class="center" v-text="thisData.azsfgdbyxdkfs.columnValue"></td>
                        <td class="center" v-text="thisData.azsfgdbyxdkje.columnValue"></td>
                        <td class="center" v-text="thisData.azsfgdbyxdkse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>（二）其他扣税凭证</td>
                        <td class="center">29=30至33之和</td>
                        <td class="center" v-text="thisData.qtkspzddkjxsefs.columnValue"></td>
                        <td class="center" v-text="thisData.qtkspzddkjxseje.columnValue"></td>
                        <td class="center" v-text="thisData.qtkspzddkjxsese.columnValue"></td>
                    </tr>
                    <tr>
                        <td>其中：海关进口增值税专用缴款书</td>
                        <td class="center">30</td>
                        <td class="center" v-text="thisData.hgjkzzszyxsfpfs.columnValue"></td>
                        <td class="center" v-text="thisData.hgjkzzszyxsfpje.columnValue"></td>
                        <td class="center" v-text="thisData.hgjkzzszyxsfpse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>农产品收购发票或者销售发票</td>
                        <td class="center">31</td>
                        <td class="center" v-text="thisData.ncpsgfphzxsfpddkfs.columnValue"></td>
                        <td class="center" v-text="thisData.ncpsgfphzxsfpddkje.columnValue"></td>
                        <td class="center" v-text="thisData.ncpsgfphzxsfpse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>代扣代缴税收缴款凭证</td>
                        <td class="center">32</td>
                        <td class="center" v-text="thisData.ddkdkdjskpzfs.columnValue"></td>
                        <td class="center" v-text="thisData.ddkdkdjskpzse.columnValue"></td>
                        <td class="center" v-text="thisData.ddkjxseqtkkpzqtfs.columnValue"></td>
                    </tr>
                    <tr>
                        <td>其他</td>
                        <td class="center">33</td>
                        <td class="center" v-text="thisData.ddkjxseqtkkpzqtfs.columnValue"></td>
                        <td class="center" v-text="thisData.ddkjxseqtkkpzqtje.columnValue"></td>
                        <td class="center" v-text="thisData.ddkjxseqtkkpzqtse.columnValue"></td>
                    </tr>
                    <tr>
                        <td class=""></td>
                        <td class="center">34</td>
                        <td class="center"></td>
                        <td class="center"></td>
                        <td class="center"></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="center">四、其他</td>
                    </tr>
                    <tr>
                        <td class="">项目</td>
                        <td class="center">栏次</td>
                        <td class="center">份数</td>
                        <td class="center">金额</td>
                        <td class="center">税额</td>
                    </tr>
                    <tr>
                        <td>本期认证相符的增值税专用发票</td>
                        <td class="center">35</td>
                        <td class="center" v-text="thisData.bqrzxfdskzzszyfpfs.columnValue"></td>
                        <td class="center" v-text="thisData.bqrzxfdskzzszyfpje.columnValue"></td>
                        <td class="center" v-text="thisData.bqrzxfdskzzszyfpse.columnValue"></td>
                    </tr>
                    <tr>
                        <td>代扣代缴税额</td>
                        <td class="center">36</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center" v-text="thisData.dkdjsese.columnValue"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "showReport",
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
                    nowDate: "",
                    statusVaule: "一般纳税人主表"
                },
                accountPeriod: "",
                customerId: "",
                statusVaule: "一般纳税人主表",
                uploadData: {
                    shuikuanDate: "",
                    tianbiaoDate: "",
                    taxerNumber: "",
                    trade: "",
                    taxerName: "",
                    legalName: "",
                    registerAddress: "",
                    runAddress: "",
                    bank: "",
                    registerType: "",
                    phone: ""
                },
                lastData: {},
                thisData: {},
                officeName: "",
                receiveName: "",
                receiveDate: "",
                arate: '',
                brate: '',
                crate: '',
            };
        },
        watch: {
        },
        computed: {
        },
        mounted() {
            this.getNowMonth();
            this.getTableData(this.statusVaule);
        },
        methods: {
            getNowMonth() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                month = month < 10 ? "0" + month : month;
                this.searchList.nowDate = year.toString() + "-" + month.toString();
                this.accountPeriod = year.toString() + "-" + month.toString();
            },
            // 获取表格数据
            getTableData(statusVaule) {
                let params = {};
                let url;
                if (statusVaule == "一般纳税人主表") {
                    url = "/api/perTaxToolTwo/e9zReportSb/showReportSb1?taxInfoId=1";
                } else if (statusVaule == "一般纳税人附表一") {
                    url = "/api/perTaxToolTwo/e9zReportSb/showReportSb2?taxInfoId=1";
                } else if (statusVaule == "一般纳税人附表二") {
                    url = "/api/perTaxToolTwo/e9zReportSb/showReportSb3?taxInfoId=1";
                }
                this.axios
                    .post(url, params)
                    .then(res => {
                        console.log("获取表格数据", res);
                        this.loading = false;
                        if (res.data.code == 200) {
                            if (statusVaule == "一般纳税人主表") {
                                this.lastData = res.data.data.lastData;
                                this.thisData = res.data.data.thisData;
                            } else if (statusVaule == "一般纳税人附表一") {
                                this.thisData = res.data.data;
                                this.arate = this.thisData.yll13azsljyjssl.columnValue == 0 ? '' : Math.round((this.thisData.yll13azsljyjssl.columnValue) * 100)
                                this.brate = this.thisData.yll13bzsljyjssl.columnValue == 0 ? '' : Math.round((this.thisData.yll13bzsljyjssl.columnValue) * 100)
                                this.crate = this.thisData.yll13czsljyjssl.columnValue == 0 ? '' : Math.round((this.thisData.yll13czsljyjssl.columnValue) * 100)
                                console.log('this.arate', this.arate)
                                console.log('this.thisData', this.thisData)
                            } else if (statusVaule == "一般纳税人附表二") {
                                this.thisData = res.data.data;
                            }
                        }
                    })
                    .catch(err => {
                        this.$message({
                            message: "获取表格数据失败",
                            type: "error"
                        });
                    });
            },
            // (表格一，一般/即征即收，本月/累计，当前字段名，event,参与计算)
            // (表格二，合计对应名称，当前字段名，event,参与计算)
            unfocus(tableType, projectType, type, dataName, e, calc, preName, rate) {
                if (tableType == "table1") {
                    let keyName, leijiName;
                    // 本月
                    if (type == "by") {
                        if (projectType == "yb") {
                            // 一般项目
                            keyName = dataName + "ybby";
                            leijiName = dataName + "ybbnlj";
                        } else if (projectType == "jz") {
                            // 即征即收项目
                            keyName = dataName + "jzby";
                            leijiName = dataName + "jzbnlj";
                        }
                        if (Number(e.target.innerText) != this.thisData[keyName].columnValue) {
                            this.thisData[keyName].columnValue = Number(e.target.innerText);
                            this.thisData[leijiName].columnValue =
                                Number(e.target.innerText) + Number(this.lastData[leijiName]);
                            // 参与计算的行
                            if (calc == "ydksehj") {
                                // 应抵扣税额合计 本月一般项目，本月即征即收项目 17=12+13-14-15+16
                                this.thisData.ydksehjybby.columnValue =
                                    Number(this.thisData.jxseybby.columnValue) +
                                    Number(this.thisData.sqldseybby.columnValue) -
                                    Number(this.thisData.jxsezcybby.columnValue) -
                                    Number(this.thisData.mdtytseybby.columnValue) +
                                    Number(this.thisData.asysljsnsjcybjseybby.columnValue);
                                this.thisData.ydksehjjzby.columnValue =
                                    Number(this.thisData.jxsejzby.columnValue) +
                                    Number(this.thisData.sqldsejzby.columnValue) -
                                    Number(this.thisData.jxsezcjzby.columnValue);
                                // 期末未缴查补税额 本月一般项目 38=16+22+36-37
                                this.thisData.qmmjcbseybby.columnValue =
                                    Number(this.thisData.asysljsnsjcybjseybby.columnValue) +
                                    Number(this.thisData.ajynsjcybjseybby.columnValue) +
                                    Number(this.thisData.qcmjcbseybby.columnValue) -
                                    Number(this.thisData.bqrkcbseybby.columnValue);
                            } else if (calc == "sjdkse") {
                                // 实际抵扣税额 本月一般项目，本月即征即收项目 18=（如17<11，则为17，否则为11）
                                this.thisData.sjdkseybby.columnValue =
                                    this.thisData.ydksehjybby.columnValue <
                                    this.thisData.xxseybby.columnValue ?
                                    Number(this.thisData.ydksehjybby.columnValue) :
                                    Number(this.thisData.xxseybby.columnValue);
                                this.thisData.sjdksejzby.columnValue =
                                    this.thisData.ydksehjjzby.columnValue <
                                    this.thisData.xxsejzby.columnValue ?
                                    Number(this.thisData.ydksehjjzby.columnValue) :
                                    Number(this.thisData.xxsejzby.columnValue);
                                // 应纳税额 本月一般项目，本月即征即收项目 19=if(（11-18）>0,(11-18-附表4G16),(11-18))
                                this.thisData.ynseybby.columnValue =
                                    this.thisData.xxseybby.columnValue >
                                    this.thisData.sjdkseybby.columnValue ?
                                    Number(this.thisData.xxseybby.columnValue) -
                                    Number(this.thisData.sjdkseybby.columnValue) -
                                    Number(this.thisData.ybxmjjdjejsbqsjdje.columnValue) :
                                    Number(this.thisData.xxseybby.columnValue) -
                                    Number(this.thisData.sjdkseybby.columnValue);
                                this.thisData.ynsejzby.columnValue =
                                    this.thisData.xxsejzby.columnValue >
                                    this.thisData.sjdksejzby.columnValue ?
                                    Number(this.thisData.xxsejzby.columnValue) -
                                    Number(this.thisData.sjdksejzby.columnValue) -
                                    Number(this.thisData.jzjtxmjjdjejsbqsjdje.columnValue) :
                                    Number(this.thisData.xxsejzby.columnValue) -
                                    Number(this.thisData.sjdksejzby.columnValue);
                                // 期末留抵税额 本月一般项目，本月即征即收项目 10=17-18
                                this.thisData.qmldseybby.columnValue =
                                    Number(this.thisData.ydksehjybby.columnValue) -
                                    Number(this.thisData.sjdkseybby.columnValue);
                                this.thisData.qmldsejzby.columnValue =
                                    Number(this.thisData.ydksehjjzby.columnValue) -
                                    Number(this.thisData.sjdksejzby.columnValue);
                            } else if (calc == "ynsehj") {
                                // 应纳税额合计 本月一般项目，本月即征即收项目 24=19+21-23
                                this.thisData.ynsehjybby.columnValue =
                                    Number(this.thisData.ynseybby.columnValue) +
                                    Number(this.thisData.jyjsynseybby.columnValue) -
                                    Number(this.thisData.ynsejzeybby.columnValue);
                                this.thisData.ynsehjjzby.columnValue =
                                    Number(this.thisData.ynsejzby.columnValue) +
                                    Number(this.thisData.jyjsynsejzby.columnValue) -
                                    Number(this.thisData.ynsejzejzby.columnValue);
                            } else if (calc == "bqyjse") {
                                // 本期已缴税额 本月一般项目，本月即征即收项目 27=28+29+30+31
                                this.thisData.bqyjseybby.columnValue =
                                    Number(this.thisData.cyjseybby.columnValue) +
                                    Number(this.thisData.ckkjzyjksyjseybby.columnValue) +
                                    Number(this.thisData.jqjnsqynseybby.columnValue) +
                                    Number(this.thisData.bqjnqjseybby.columnValue);
                                this.thisData.bqyjsejzby.columnValue =
                                    Number(this.thisData.cyjsejzby.columnValue) +
                                    Number(this.thisData.jqjnsqynsejzby.columnValue) +
                                    Number(this.thisData.bqjnqjsejzby.columnValue);
                                // 本期应补(退)税额 本月一般项目，本月即征即收项目 34＝24-28-29
                                this.thisData.bqybtseybby.columnValue =
                                    Number(this.thisData.ynsehjybby.columnValue) -
                                    Number(this.thisData.cyjseybby.columnValue) -
                                    Number(this.thisData.ckkjzyjksyjseybby.columnValue);
                                this.thisData.bqybtsejzby.columnValue =
                                    Number(this.thisData.ynsehjjzby.columnValue) -
                                    Number(this.thisData.cyjsejzby.columnValue);
                            } else if (calc == "qmwjse") {
                                // 期末未缴税额（多缴为负数）本月一般项目，本月即征即收项目 32=24+25+26-27
                                this.thisData.qmwjseybby.columnValue =
                                    Number(this.thisData.ynsehjybby.columnValue) +
                                    Number(this.thisData.qcmjseybby.columnValue) +
                                    Number(this.thisData.ssckkjzyjkstkeybby.columnValue) -
                                    Number(this.thisData.bqyjseybby.columnValue);
                                this.thisData.qmwjsejzby.columnValue =
                                    Number(this.thisData.ynsehjjzby.columnValue) +
                                    Number(this.thisData.qcmjsejzby.columnValue) -
                                    Number(this.thisData.bqyjsejzby.columnValue);
                                // 其中：欠缴税额（≥0）本月一般项目，本月即征即收项目 33=25+26-27
                                this.thisData.qzqjseybby.columnValue =
                                    Number(this.thisData.qcmjseybby.columnValue) +
                                    Number(this.thisData.ssckkjzyjkstkeybby.columnValue) -
                                    Number(this.thisData.bqyjseybby.columnValue);
                                this.thisData.qzqjsejzby.columnValue =
                                    Number(this.thisData.qcmjsejzby.columnValue) -
                                    Number(this.thisData.bqyjsejzby.columnValue);
                            } else if (calc == "qmmjcbse") {
                                // 期末未缴查补税额 本月一般项目 38=16+22+36-37
                                this.thisData.qmmjcbseybby.columnValue =
                                    Number(this.thisData.asysljsnsjcybjseybby.columnValue) +
                                    Number(this.thisData.ajynsjcybjseybby.columnValue) +
                                    Number(this.thisData.qcmjcbseybby.columnValue) -
                                    Number(this.thisData.bqrkcbseybby.columnValue);
                            }
                            console.log(111333, this.thisData);
                            this.submitEdit();
                        }
                    } else if (type == "lj") {
                        // 累计
                        if (projectType == "yb") {
                            // 一般项目
                            keyName = dataName + "ybbnlj";
                        } else if (projectType == "jz") {
                            // 即征即收项目
                            keyName = dataName + "jzbnlj";
                        }
                        if (
                            Number(e.target.innerText) != this.thisData[keyName].columnValue
                        ) {
                            this.thisData[keyName].columnValue = Number(e.target.innerText);
                            console.log(111, this.thisData);
                            this.submitEdit();
                        }
                    }
                } else if (tableType == "table2") {
                    console.log('dataName', dataName);
                    if (Number(e.target.innerText) != this.thisData[dataName].columnValue) {
                        if (dataName == 'yll13azsljyjssl' || dataName == 'yll13bzsljyjssl' || dataName == 'yll13czsljyjssl') {
                            this.thisData[dataName].columnValue = Number(e.target.innerText) / 100;
                        } else {
                            this.thisData[dataName].columnValue = Number(e.target.innerText);
                        }
                        // 参与计算
                        if (calc == 'hjxse') {
                            //合计销售额 9=1+3+5+7
                            let key1, key3, key5;
                            if (preName == 'yll13azsljyjs' || preName == 'yll13bzsljyjs' || preName == 'yll13czsljyjs') {
                                key1 = preName + 'skzzsxse';
                            } else if (preName == 'bfz13hwjjgxlxplwybjs' || preName == 'bfz13fwbdchwxzcybjs' || preName == 'bfz9hwjjgxlxplwybjs' || preName == 'bfz9fwbdchwxzcybjs' || preName == 'bfz5fwbdchwxzcybjs' || preName == 'bfz3fwbdchwxzcybjs') {
                                key1 = preName + 'zzsfpxse';
                            } else if (preName == 'bfz6zsljyjjs') {
                                key1 = 'bfz6zsljyjszzsxse';
                            } else {
                                key1 = preName + 'zzsxse';
                            }
                            console.log('key1', key1)
                            console.log('123', Number(this.thisData[key1].columnValue))
                            if (preName == 'bfz6zsljyjs' || preName == 'bfz6zsljyjjs') {
                                key3 = 'bfz6zsljyjjskqtfpxse';
                            } else {
                                key3 = preName + 'kjqtfpxse';
                            }
                            if (preName == 'fwbdchwxzcmdts') {
                                key5 = preName + 'wkjqtfpxxse';
                            } else if (preName == 'bfz6zsljyjjs') {
                                key5 = 'bfz6zsljyjswkjfpxse';
                            } else {
                                key5 = preName + 'wkjfpxse';
                            }
                            let key7 = preName + 'nsjctzxse';
                            if (preName == 'bfz6zsljyjjs') {
                                key7 = 'bfz6zsljyjsnsjctzxse';
                            }
                            let key9 = preName + 'hjxse';
                            if (preName == 'bfz6zsljyjjs') {
                                key9 = 'bfz6zsljyjshjxse';
                            }
                            console.log(111, this.thisData.bfz6zsljyjjskqtfpxse.columnValue)
                            console.log('key3', key3)
                            console.log('121', this.thisData[key3].columnValue)
                            let value1, value3, value5, value7;
                            value1 = this.thisData[key1] ? Number(this.thisData[key1].columnValue) : 0;
                            value3 = this.thisData[key3] ? Number(this.thisData[key3].columnValue) : 0;
                            value5 = this.thisData[key5] ? Number(this.thisData[key5].columnValue) : 0;
                            value7 = this.thisData[key7] ? Number(this.thisData[key7].columnValue) : 0;
                            this.thisData[key9].columnValue = value1 + value3 + value5 + value7;
                            console.log('key9', this.thisData[key9].columnValue)
                            // 销项(应纳)税额 10=2+4+6+8
                            let key2, key4, key6;
                            if (preName == 'yll13azsljyjs' || preName == 'yll13bzsljyjs' || preName == 'yll13czsljyjs') {
                                key2 = preName + 'skzzsxxse';
                            } else if (preName == 'bfz13hwjjgxlxplwybjs' || preName == 'bfz13fwbdchwxzcybjs' || preName == 'bfz9hwjjgxlxplwybjs' || preName == 'bfz9fwbdchwxzcybjs' || preName == 'bfz5fwbdchwxzcybjs' || preName == 'bfz3fwbdchwxzcybjs') {
                                key2 = preName + 'zzsfpxxse';
                            } else if (preName == 'bfz6zsljyjjs') {
                                key2 = 'bfz6zsljyjszzsxxse';
                            } else {
                                key2 = preName + 'zzsxxse';
                            }
                            if (preName == 'bfz6zsljyjs' || preName == 'bfz6zsljyjjs') {
                                key4 = 'bfz6zsljyjjskqtfpxxse';
                            } else {
                                key4 = preName + 'kjqtfpxxse';
                            }
                            if (preName == 'bfz3hwjjgxljyjs') {
                                key6 = preName + 'wjjfpxxse';
                            } else if (preName == 'bfz6zsljyjjs') {
                                key6 = 'bfz6zsljyjswkjfpxxse';
                            } else {
                                key6 = preName + 'wkjfpxxse';
                            }
                            let key8 = preName + 'nsjctzxxse';
                            if (preName == 'bfz6zsljyjjs') {
                                key8 = 'bfz6zsljyjsnsjctzxxse';
                            }
                            let key10 = preName + 'hjxxse';
                            if (preName == 'bfz6zsljyjjs') {
                                key10 = 'bfz6zsljyjshjxxse';
                            }
                            let value2, value4, value6, value8;
                            value2 = this.thisData[key2] ? Number(this.thisData[key2].columnValue) : 0;
                            value4 = this.thisData[key4] ? Number(this.thisData[key4].columnValue) : 0;
                            value6 = this.thisData[key6] ? Number(this.thisData[key6].columnValue) : 0;
                            value8 = this.thisData[key8] ? Number(this.thisData[key8].columnValue) : 0;
                            this.thisData[key10].columnValue = value2 + value4 + value6 + value8;
                            console.log('key10', this.thisData[key10].columnValue)
                            // 价税合计 11=9+10  扣除后含税(免税)销售额 13=11-12
                            let key11 = preName + 'hjjshj';
                            if (preName == 'bfz6zsljyjjs') {
                                key11 = 'bfz6zsljyjshjjshj';
                            }
                            let key12;
                            if (preName == 'bfz6slybjs') {
                                key12 = preName + 'fubdchwxzckcxmbqsjkcje';
                            } else if (preName == 'bfz6zsljyjjs') {
                                key12 = 'bfz6zsljyjsfwbdchwxzckcxmbqsjkcje';
                            } else {
                                key12 = preName + 'fwbdchwxzckcxmbqsjkcje';
                            }
                            let key13 = preName + 'kchhsxse';
                            if (preName == 'bfz6zsljyjjs') {
                                key13 = 'bfz6zsljyjskchhsxse';
                            }
                            let key14;
                            if (preName == 'yll13azsljyjs' || preName == 'yll13bzsljyjs' || preName == 'yll13czsljyjs') {
                                key14 = preName + 'kchxxse';
                            } else if (preName == 'bfz6zsljyjjs') {
                                key12 = 'bfz6zsljyjskchhsxxse';
                            } else {
                                key14 = preName + 'kchhsxxse';
                            }
                            let value9, value10, value11, value12, value13;
                            value9 = this.thisData[key9] ? Number(this.thisData[key9].columnValue) : 0;
                            value10 = this.thisData[key10] ? Number(this.thisData[key10].columnValue) : 0;
                            value11 = this.thisData[key11] ? Number(this.thisData[key11].columnValue) : 0;
                            value12 = this.thisData[key12] ? Number(this.thisData[key12].columnValue) : 0;
                            if (this.thisData[key11]) {
                                this.thisData[key11].columnValue = value9 + value10;
                            }
                            if (this.thisData[key13]) {
                                this.thisData[key13].columnValue = value11 - value12;
                            }
                            if (dataName == 'yll13azsljyjssl' || dataName == 'yll13bzsljyjssl' || dataName == 'yll13czsljyjssl') {
                                rate = this.thisData[dataName].columnValue;
                            }
                            console.log('rate', rate)
                            if (this.thisData[key13]) {
                                this.thisData[key14].columnValue = this.thisData[key13].columnValue / (1 + rate) * rate;
                            }
                        }
                        this.submitEdit();
                    }
                } else if (tableType == "table3") {
                    if (Number(e.target.innerText) != this.thisData[dataName].columnValue) {
                        this.thisData[dataName].columnValue = Number(e.target.innerText);
                    }
                    console.log('当前值',this.thisData[dataName].columnValue)
                    // 参与计算
                    // 1=2+3
                    if (calc == 'rzxfzzszyfpsbdk') {
                        let key1,key2,key3;
                        key1='rzxfzzszyfpsbdk' + projectType
                        key2='bqrzxfqbqsbdk'+projectType
                        key3='qqrzxfqbqsbdk'+projectType
                        this.thisData[key1].columnValue=Number(this.thisData[key2].columnValue)+Number(this.thisData[key3].columnValue)
                        console.log('key',key1)
                        console.log('valu1',this.thisData[key1].columnValue)
                    }else if(calc=='qtkspz'){
                        // 4=5+6+7+8a+8b
                        let key4,key5,key6,key7,key8a,key8b;
                        key4='qtkspz'+projectType;
                        key5='hgjkzzszyjks' + projectType;
                        key6='ncpsgfphzxsfp'+projectType;
                        key7='dkdjssjkpz'+projectType;
                        key8a='jjkcncpjxse'+projectType;
                        key8b='sbdkdjxseqtkspzqt'+projectType;
                        let value7=0,value8a=0;
                        console.log('key5',key5)
                        // console.log('key6',this.thisData[key6].columnValue)
                        // console.log('key5',this.thisData[key5].columnValue)
                        // console.log('key5',this.thisData[key5].columnValue)
                        // console.log('key5',this.thisData[key5].columnValue)
                        if(this.thisData[key7]){
                            value7=Number(this.thisData[key7].columnValue)
                        }
                        if(this.thisData[key8a]){
                            value8a=this.thisData[key8a].columnValue
                        }
                        this.thisData[key4].columnValue=Number(this.thisData[key5].columnValue)+Number(this.thisData[key6].columnValue)+value7+value8a+Number(this.thisData[key8b].columnValue)
                    }
                }
            },
            // 提交修改
            submitEdit() {
                let param = {};
                for (let key in this.thisData) {
                    param[key] = this.thisData[key].columnValue;
                }
                console.log("www", param);
                let url;
                if (this.statusVaule == '一般纳税人主表') {
                    url = "/api/perTaxToolTwo/e9zReportSb/updateReportSb1";
                } else if (this.statusVaule == '一般纳税人附表一') {
                    url = "/api/perTaxToolTwo/e9zReportSb/updateReportSb2";
                } else if (this.statusVaule == '一般纳税人附表二') {
                    url = "/api/perTaxToolTwo/e9zReportSb/updateReportSb3";
                }
                this.axios
                    .post(url, param)
                    .then(res => {
                        console.log("修改数据", res);
                        if (res.data.code == 200) {
                            this.getTableData(this.statusVaule);
                        }
                    })
                    .catch(err => {
                        this.$message({
                            message: "修改数据失败",
                            type: "error"
                        });
                    });
            },
            search() {
                this.accountPeriod = this.searchList.nowDate;
                this.customerId = this.searchList.value;
                this.statusVaule = this.searchList.statusVaule;
                this.getTableData(this.statusVaule);
            },
            clear() {
                this.searchList.statusVaule = "1";
                this.searchList.nowDate = "";
            },
            exportExcel() {
                window.location.href =
                    "/perTaxToolTwo/api/excel/exportExcel.do?customerId=" +
                    this.customerId +
                    "&accountPeriod=" +
                    this.accountPeriod +
                    "&submitStatus=" +
                    this.statusVaule;
            }
        }
    };
</script>

<style scoped lang="less">
    .showReport {
        padding: 20px;
    }
    .search {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: #fff;
        padding: 20px 20px;
    }
    .title {
        font-size: 16px;
        margin-bottom: 15px;
    }
    div.search_contain {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
    .row2,
    .row3,
    .searchButton,
    .importButton {
        margin-left: 20px;
    }
    .content {
        background: #fff;
        padding: 10px 20px; // margin-top: 20px;
    }
    .titleBox {
        background: #fff;
        margin-top: 10px;
    }
    .title .line1 {
        text-align: center;
        padding: 10px 0;
        font-weight: bold;
    }
    .title .line2 {
        text-align: center;
        font-weight: bold;
    }
    .title .line3 {
        text-align: center;
        padding: 5px 0;
        font-size: 0.12rem;
    }
    .Infobox .line1,
    .Infobox .line2,
    .Infobox .line3,
    .Infobox .line4 {
        height: 40px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .inlineInput {
        display: flex;
        align-items: center;
    }
    td {
        //
        font-size: 0.14rem;
    }
    .center {
        text-align: center;
    }
    .pad3 {
        padding: 0.03rem 0;
    }
    .padL {
        padding-left: 0.4rem;
    }
    .shuli {
        margin: 0 auto;
        width: 16px;
        padding: 0 5px;
        line-height: 24px;
    }
    .signBox {
        display: flex;
        height: 1.4rem; // align-items: center;
    }
    .signBox .signtitle {
        width: 16px;
        height: calc(1.4rem - 20px);
        padding: 0 15px;
        line-height: 24px;
        /* margin: 0 10px; */
        border-left: 1px gray solid;
        border-bottom: 1px gray solid;
        border-right: 1px gray solid;
        font-size: 0.14rem;
        padding-top: 20px;
    }
    .signBox .contentBox {
        width: calc(50% - 16px);
        /* margin: 10px; */
        padding: 0px 5px;
        border-bottom: 1px gray solid;
        height: calc(1.4rem - 15px);
        padding-top: 15px;
    }
    .signBox .contentBox div {
        font-size: 0.14rem;
        margin-left: 20px;
    }
    .bottomline1 {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }
</style>

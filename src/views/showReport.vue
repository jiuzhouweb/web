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
        <div class="titleBox" v-if="statusVaule=='一般纳税人附表一'">
            <div class="title">
                <p class="line1">增值税纳税申报表附列资料（一）</p>
                <p class="line2">（本期销售情况明细）</p>
            </div>
            <div class="Infobox">
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
                <table border="1 " width="100% " v-if="thisData">
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
                        <td class="pad3 center" :contenteditable="thisData.asysljsxseybby.columnEdit==1" @blur="unfocus('yb','by','asysljsxse',$event)" v-text="thisData.asysljsxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','asysljsxse',$event)" v-text="thisData.asysljsxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','asysljsxse',$event)" v-text="thisData.asysljsxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','asysljsxse',$event)" v-text="thisData.asysljsxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：应税货物销售额</td>
                        <td class="pad3 center">2</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','yshwxse',$event)" v-text="thisData.yshwxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','yshwxse',$event)" v-text="thisData.yshwxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','yshwxse',$event)" v-text="thisData.yshwxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','yshwxse',$event)" v-text="thisData.yshwxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3 padL">应税劳务销售额</td>
                        <td class="pad3 center">3</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','yslwxse',$event)" v-text="thisData.yslwxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','yslwxse',$event)" v-text="thisData.yslwxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','yb','yslwxse',$event)" v-text="thisData.yslwxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','yslwxse',$event)" v-text="thisData.yslwxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3 padL">纳税检查调整的销售额</td>
                        <td class="pad3 center">4</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','nsjcdzxse',$event)" v-text="thisData.nsjcdzxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','nsjcdzxse',$event)" v-text="thisData.nsjcdzxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','yb','nsjcdzxse',$event)" v-text="thisData.nsjcdzxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','nsjcdzxse',$event)" v-text="thisData.nsjcdzxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">（二）按简易办法计税销售额</td>
                        <td class="pad3 center">5</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','ajyfsjsxse',$event)" v-text="thisData.ajyfsjsxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：纳税检查调整的销售额</td>
                        <td class="pad3 center">6</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','nsjctzxse',$event)" v-text="thisData.nsjctzxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','nsjctzxse',$event)" v-text="thisData.nsjctzxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','nsjctzxse',$event)" v-text="thisData.nsjctzxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','nsjctzxse',$event)" v-text="thisData.nsjctzxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">（三）免、抵、退办法出口销售额</td>
                        <td class="pad3 center">7</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','mdtbfckxse',$event)" v-text="thisData.mdtbfckxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','mdtbfckxse',$event)" v-text="thisData.mdtbfckxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">（四）免税销售额</td>
                        <td class="pad3 center">8</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','msxse',$event)" v-text="thisData.msxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','msxse',$event)" v-text="thisData.msxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：免税货物销售额</td>
                        <td class="pad3 center">9</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','mshwxse',$event)" v-text="thisData.mshwxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','mshwxse',$event)" v-text="thisData.mshwxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3 padL">免税劳务销售额</td>
                        <td class="pad3 center">10</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','mslwxse',$event)" v-text="thisData.mslwxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','mslwxse',$event)" v-text="thisData.mslwxseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td rowspan="14" class="shuli">税款计算</td>
                        <td class="pad3">销项税额</td>
                        <td class="pad3 center">11</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','xxse',$event,'sjdkse')" v-text="thisData.xxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','xxse',$event,'sjdkse')" v-text="thisData.xxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','xxse',$event,'sjdkse')" v-text="thisData.xxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','xxse',$event,'sjdkse')" v-text="thisData.xxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">进项税额</td>
                        <td class="pad3 center">12</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','jxse',$event,'ydksehj')" v-text="thisData.jxseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','jxse',$event,'ydksehj')" v-text="thisData.jxseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','jxse',$event,'ydksehj')" v-text="thisData.jxsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','jxse',$event,'ydksehj')" v-text="thisData.jxsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">上期留抵税额</td>
                        <td class="pad3 center">13</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','sqldse',$event,'ydksehj')" v-text="thisData.sqldseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','sqldse',$event,'ydksehj')" v-text="thisData.sqldseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','sqldse',$event,'ydksehj')" v-text="thisData.sqldsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">进项税额转出</td>
                        <td class="pad3 center">14</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcjzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','jxsezc',$event,'ydksehj')" v-text="thisData.jxsezcjzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">免、抵、退应退税额</td>
                        <td class="pad3 center">15</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','mdtytse',$event,'ydksehj')" v-text="thisData.mdtytseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','mdtytse',$event,'ydksehj')" v-text="thisData.mdtytseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">按适用税率计算的纳税检查应补缴税额</td>
                        <td class="pad3 center">16</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','asysljsnsjcybjse',$event,'ydksehj')" v-text="thisData.asysljsnsjcybjseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','asysljsnsjcybjse',$event,'ydksehj')" v-text="thisData.asysljsnsjcybjseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">应抵扣税额合计</td>
                        <td class="pad3 center">17=12+13-14-15+16</td>
                        <td class="pad3 center" v-text="thisData.ydksehjybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" v-text="thisData.ydksehjjzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">实际抵扣税额</td>
                        <td class="pad3 center">18（如17<11，则为17，否则为11）</td>
                        <td class="pad3 center" v-text="thisData.sjdkseybby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.sjdkseybbnlj.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.sjdksejzby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.sjdksejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">应纳税额</td>
                        <td class="pad3 center">19=if(（11-18）>0,(11-18-附表4G16),(11-18))</td>
                        <td class="pad3 center" v-text="thisData.ynseybby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.ynseybbnlj.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.ynsejzby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.ynsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">期末留抵税额</td>
                        <td class="pad3 center">20=17-18</td>
                        <td class="pad3 center" v-text="thisData.qmldseybby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.qmldseybbnlj.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.qmldsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">简易计税办法计算的应纳税额</td>
                        <td class="pad3 center">21</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','jyjsynse',$event,'ynsehj')" v-text="thisData.jyjsynsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">按简易计税办法计算的纳税检查应补缴税额</td>
                        <td class="pad3 center">22</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','ajynsjcybjse',$event,'qmmjcbse')" v-text="thisData.ajynsjcybjseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','ajynsjcybjse',$event,'qmmjcbse')" v-text="thisData.ajynsjcybjseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">应纳税额减征额</td>
                        <td class="pad3 center">23</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzeybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzeybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','ynsejze',$event,'ynsehj')" v-text="thisData.ynsejzejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">应纳税额合计</td>
                        <td class="pad3 center">24=19+21-23</td>
                        <td class="pad3 center" v-text="thisData.ynsehjybby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.ynsehjybbnlj.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.ynsehjjzby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.ynsehjjzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td rowspan="14" class="shuli">税款缴纳</td>
                        <td class="pad3">期初未缴税额（多缴为负数）</td>
                        <td class="pad3 center">25</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','qcmjse',$event,'qmwjse')" v-text="thisData.qcmjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">实收出口开具专用缴款书退税额</td>
                        <td class="pad3 center">26</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','ssckkjzyjkstke',$event,'qmwjse')" v-text="thisData.ssckkjzyjkstkeybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','ssckkjzyjkstke',$event,'qmwjse')" v-text="thisData.ssckkjzyjkstkeybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">本期已缴税额</td>
                        <td class="pad3 center">27=28+29+30+31</td>
                        <td class="pad3 center" v-text="thisData.bqyjseybby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.bqyjseybbnlj.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.bqyjsejzby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.bqyjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">①分次预缴税额</td>
                        <td class="pad3 center">28</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','cyjse',$event,'bqyjse')" v-text="thisData.cyjseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','cyjse',$event,'bqyjse')" v-text="thisData.cyjsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">②出口开具专用缴款书预缴税额</td>
                        <td class="pad3 center">29</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','cyjse',$event,'bqyjse')" v-text="thisData.ckkjzyjksyjseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">③本期缴纳上期应纳税额</td>
                        <td class="pad3 center">30</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','cyjse',$event,'bqyjse')" v-text="thisData.jqjnsqynsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">④本期缴纳欠缴税额</td>
                        <td class="pad3 center">31</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjseybbnlj.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','bqjnqjse',$event,'bqyjse')" v-text="thisData.bqjnqjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">期末未缴税额（多缴为负数）</td>
                        <td class="pad3 center">32=24+25+26-27</td>
                        <td class="pad3 center" v-text="thisData.qmwjseybby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.qmwjseybbnlj.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.qmwjsejzby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.qmwjsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">其中：欠缴税额（≥0）</td>
                        <td class="pad3 center">33=25+26-27</td>
                        <td class="pad3 center" v-text="thisData.qzqjseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" v-text="thisData.qzqjsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">本期应补(退)税额</td>
                        <td class="pad3 center">34＝24-28-29</td>
                        <td class="pad3 center" v-text="thisData.bqybtseybby.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" v-text="thisData.bqybtsejzby.columnValue"></td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">即征即退实际退税额</td>
                        <td class="pad3 center">35</td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','by','jzjtsjtse',$event)" v-text="thisData.jzjtsjtsejzby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('jz','lj','jzjtsjtse',$event)" v-text="thisData.jzjtsjtsejzbnlj.columnValue"></td>
                    </tr>
                    <tr>
                        <td class="pad3">期初未缴查补税额</td>
                        <td class="pad3 center">36</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','qcmjcbse',$event,'qmmjcbse')" v-text="thisData.qcmjcbseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','qcmjcbse',$event,'qmmjcbse')" v-text="thisData.qcmjcbseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">本期入库查补税额</td>
                        <td class="pad3 center">37</td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','by','bqrkcbse',$event,'qmmjcbse')" v-text="thisData.bqrkcbseybby.columnValue"></td>
                        <td class="pad3 center" contenteditable @blur="unfocus('yb','lj','bqrkcbse',$event,'qmmjcbse')" v-text="thisData.bqrkcbseybbnlj.columnValue"></td>
                        <td class="pad3 center">--</td>
                        <td class="pad3 center">--</td>
                    </tr>
                    <tr>
                        <td class="pad3">期末未缴查补税额</td>
                        <td class="pad3 center">38=16+22+36-37</td>
                        <td class="pad3 center" v-text="thisData.qmmjcbseybby.columnValue"></td>
                        <td class="pad3 center" v-text="thisData.qmmjcbseybbnlj.columnValue"></td>
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
                <table border="1 " width="100% ">
                    <tr>
                        <td colspan="4" rowspan="3" class="center">项目及栏次</td>
                        <td colspan="2" class="center">开具增值税专用发票 </td>
                        <td colspan="2" class="center">开具其他发票 </td>
                        <td colspan="2" class="center">未开具发票</td>
                        <td colspan="2" class="center">纳税检查调整</td>
                        <td colspan="3" class="center">合计</td>
                        <td rowspan="2" class="center">服务、不动产和无形资产扣除项目本期实际扣除金额</td>
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
                        <td class="center">14=13÷(100%+税率或征收率)×税率或征收率</td>
                    </tr>
                    <tr>
                        <td rowspan="7" class="center">一、一般计税方法计税</td>
                        <td rowspan="5" class="center">全部征税项目</td>
                        <td class="center">13%税率的货物及加工修理修配劳务</td>
                        <td class="center">1</td>
                        <td class="center" v-text="this.thisData.bfz13hwjjgxlxplwybjszzsfpxse"></td>
                        <td class="center">2</td>
                        <td class="center">3</td>
                        <td class="center">4</td>
                        <td class="center">5</td>
                        <td class="center">6</td>
                        <td class="center">7</td>
                        <td class="center">8</td>
                        <td class="center">9</td>
                        <td class="center">10</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                        <td class="center">--</td>
                    </tr>
                    <tr>
                        <td class="center">13%税率的服务、不动产和无形资产</td>
                        <td class="center">2</td>
                        <td class="center">1</td>
                        <td class="center">2</td>
                        <td class="center">3</td>
                        <td class="center">4</td>
                        <td class="center">5</td>
                        <td class="center">6</td>
                        <td class="center">7</td>
                        <td class="center">8</td>
                        <td class="center">9</td>
                        <td class="center">10</td>
                        <td class="center">11</td>
                        <td class="center">12</td>
                        <td class="center">13</td>
                        <td class="center">14</td>
                    </tr>
                    <tr>
                        <td class="center">9%税率的货物及加工修理修配劳务</td>
                        <td class="center">3</td>
                        <td class="center">1</td>
                        <td class="center">2</td>
                        <td class="center">3</td>
                        <td class="center">4</td>
                        <td class="center">5</td>
                        <td class="center">6</td>
                        <td class="center">7</td>
                        <td class="center">8</td>
                        <td class="center">9</td>
                        <td class="center">10</td>
                        <td class="center">11</td>
                        <td class="center">12</td>
                        <td class="center">13</td>
                        <td class="center">14</td>
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
        options: [
          {
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
      receiveDate: ""
    };
  },
  watch: {
    "thisData.sjdkseybby.columnValue": {
      handler: function(val) {
        this.thisData.sjdkseybby.columnValue = val;
        this.thisData.sjdkseybbnlj.columnValue =
          Number(this.thisData.sjdkseybby.columnValue) +
          Number(this.lastData.sjdkseybbnlj);
        this.thisData.qmldseybby.columnValue =
          Number(this.thisData.ydksehjybby.columnValue) +
          Number(this.lastData.sjdkseybby);
      },
      deep: true
    }
    //   sjdkseybby(val){
    //       this.thisData.sjdkseybby.columnValue=val;
    //       this.thisData.sjdkseybbnlj.columnValue=Number(this.thisData.sjdkseybby.columnValue)+Number(this.lastData.sjdkseybbnlj)
    //       this.thisData.qmldseybby.columnValue=Number(this.thisData.ydksehjybby.columnValue)+Number(this.lastData.sjdkseybby)
    //   },
    //   sjdksejzby(val){
    //       this.thisData.sjdksejzby.columnValue=val;
    //       this.thisData.sjdksejzbnlj.columnValue=Number(this.thisData.sjdksejzby.columnValue)+Number(this.lastData.sjdksejzbnlj)
    //       this.thisData.qmldsejzby.columnValue=Number(this.thisData.ydksehjjzby.columnValue)+Number(this.lastData.sjdksejzby)
    //   },
    //   ynseybby(val){
    //       this.thisData.ynseybby.columnValue=val;
    //       this.thisData.ynseybbnlj.columnValue=Number(this.thisData.ynseybby.columnValue)+Number(this.lastData.ynseybbnlj)
    //       this.thisData.ynseybby.columnValue=this.thisData.xxseybby.columnValue>this.thisData.sjdkseybby.columnValue?Number(this.thisData.xxseybby.columnValue)-Number(this.thisData.sjdkseybby.columnValue)-Number(this.thisData.ybxmjjdjejsbqsjdje.columnValue):Number(this.thisData.xxseybby.columnValue)-Number(this.thisData.sjdkseybby).columnValue;
    //   },
    //   ynsejzby(val){
    //       this.thisData.ynsejzby.columnValue=val;
    //       this.thisData.ynsejzbnlj.columnValue=Number(this.thisData.ynsejzby.columnValue)+Number(this.lastData.ynsejzbnlj.columnValue)
    //       this.thisData.ynsehjjzby.columnValue=Number(this.thisData.ynsejzby.columnValue)+Number(this.thisData.jyjsynsejzby.columnValue)-Number(this.thisData.ynsejzejzby.columnValue);
    //   },
    //   ydksehjybby(val){
    //       this.thisData.ydksehjybby.columnValue=val;
    //       this.thisData.qmldseybby.columnValue=Number(this.thisData.ydksehjybby.columnValue)+Number(this.lastData.sjdkseybby)
    //   },
    //   ydksehjjzby(val){
    //       this.thisData.ydksehjjzby.columnValue=val;
    //       this.thisData.qmldsejzby.columnValue=Number(this.thisData.ydksehjjzby.columnValue)+Number(this.lastData.sjdksejzby)
    //   },
    //   qmldseybby(val){
    //       this.thisData.qmldseybby.columnValue=val;
    //       this.thisData.qmldseybbnlj.columnValue=Number(this.thisData.qmldseybby.columnValue)+Number(this.lastData.qmldseybbnlj);
    //   },
    //   bqyjseybby(val){
    //       this.thisData.bqyjseybby.columnValue=val;
    //       this.thisData.bqyjseybbnlj.columnValue=Number(this.thisData.bqyjseybby.columnValue)+Number(this.lastData.bqyjseybbnlj);
    //       this.thisData.qzqjseybby.columnValue=Number(this.thisData.qcmjseybby.columnValue)+Number(this.thisData.ssckkjzyjkstkeybby.columnValue)-Number(this.thisData.bqyjseybby.columnValue);
    //   },
    //   bqyjsejzby(val){
    //       this.thisData.bqyjsejzby.columnValue=val;
    //       this.thisData.bqyjsejzbnlj.columnValue=Number(this.thisData.bqyjsejzby.columnValue)+Number(this.lastData.bqyjsejzbnlj);
    //       this.thisData.qzqjsejzby.columnValue=Number(this.thisData.qcmjsejzby.columnValue)-Number(this.thisData.bqyjsejzby.columnValue);
    //   },
    //   qmwjseybby(val){
    //       this.thisData.qmwjseybby.columnValue=val;
    //       this.thisData.qmwjseybbnlj.columnValue=Number(this.thisData.qmwjseybby.columnValue)+Number(this.lastData.qmwjseybbnlj);
    //   },
    //   qmwjsejzby(val){
    //       this.thisData.qmwjsejzby.columnValue=val;
    //       this.thisData.qmwjsejzbnlj.columnValue=Number(this.thisData.qmwjsejzby.columnValue)+Number(this.lastData.qmwjsejzbnlj);
    //   },
    //   ynsehjybby(val){
    //       this.thisData.ynsehjybby.columnValue=val;
    //       this.thisData.bqybtseybby.columnValue=Number(this.thisData.ynsehjybby.columnValue)-Number(this.thisData.cyjseybby.columnValue)-Number(this.thisData.ckkjzyjksyjseybby.columnValue);
    //   },
    //   ynsehjjzby(val){
    //       this.thisData.ynsehjjzby.columnValue=val;
    //       this.thisData.bqybtsejzby.columnValue=Number(this.thisData.ynsehjjzby.columnValue)-Number(this.thisData.cyjsejzby.columnValue);
    //   },
    //   qmmjcbseybby(val){
    //       this.thisData.qmmjcbseybby.columnValue=val;
    //       this.thisData.qmmjcbseybbnlj.columnValue=Number(this.thisData.qmmjcbseybby.columnValue)+Number(this.lastData.qmmjcbseybbnlj.columnValue);
    //   },
  },
  computed: {
    //   sjdkseybby(){
    //       console.log(111333333334,this.thisData.sjdkseybby.columnValue)
    //       return this.thisData.sjdkseybby.columnValue;
    //   },
    //   sjdksejzby(){
    //       return this.thisData.sjdksejzby.columnValue;
    //   },
    //   ynseybby(){
    //       return this.thisData.ynseybby.columnValue;
    //   },
    //   ynsejzby(){
    //       return this.thisData.ynsejzby.columnValue;
    //   },
    //   ydksehjybby(){
    //       return this.thisData.ydksehjybby.columnValue;
    //   },
    //   ydksehjjzby(){
    //       return this.thisData.ydksehjjzby.columnValue;
    //   },
    //   qmldseybby(){
    //       return this.thisData.qmldseybby.columnValue;
    //   },
    //   bqyjseybby(){
    //       return this.thisData.bqyjseybby.columnValue;
    //   },
    //   bqyjsejzby(){
    //       return this.thisData.bqyjsejzby.columnValue;
    //   },
    //   qmwjseybby(){
    //       return this.thisData.qmwjseybby.columnValue;
    //   },
    //   qmwjsejzby(){
    //       return this.thisData.qmwjsejzby.columnValue;
    //   },
    //   ynsehjybby(){
    //       return this.thisData.ynsehjybby.columnValue;
    //   },
    //   ynsehjjzby(){
    //       return this.thisData.ynsehjjzby.columnValue;
    //   },
    //   qmmjcbseybby(){
    //       return this.thisData.qmmjcbseybby.columnValue;
    //   },
  },
  mounted() {
    this.getNowMonth();
    this.getTableData(this.statusVaule);
    console.log('thisData.asysljsxseybby.columnEdit',thisData.asysljsxseybby.columnEdit)
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
    // (一般/即征即收，本月/累计，当前字段名，event)
    unfocus(projectType, type, dataName, e, calc) {
      console.log("name", dataName);
      console.log(e);
      //   console.log(1222,this.thisData.ydksehjybby.columnValue)

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
        console.log(
          "this.thisData[keyName][columnValue]",
          this.thisData[keyName].columnValue
        );
        this.thisData[keyName].columnValue = e.target.innerText;
        this.thisData[leijiName].columnValue =
          Number(e.target.innerText) + Number(this.lastData[leijiName]);
        // 参与计算的行
        // 应抵扣税额合计
        if (calc == "ydksehj") {
          // 本月一般项目，本月即征即收项目 17=12+13-14-15+16
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
        } else if (calc == "sjdkse") {
          // 实际抵扣税额 本月一般项目，本月即征即收项目 18=（如17<11，则为17，否则为11）
          this.thisData.sjdkseybby.columnValue =
            this.thisData.ydksehjybby.columnValue <
            this.thisData.xxseybby.columnValue
              ? Number(this.thisData.ydksehjybby.columnValue)
              : Number(this.thisData.xxseybby.columnValue);
          this.thisData.sjdksejzby.columnValue =
            this.thisData.ydksehjjzby.columnValue <
            this.thisData.xxsejzby.columnValue
              ? Number(this.thisData.ydksehjjzby.columnValue)
              : Number(this.thisData.xxsejzby.columnValue);
          console.log("this.thisData.sjdksejzby", this.thisData.sjdksejzby);
          // 应纳税额 本月一般项目，本月即征即收项目 19=if(（11-18）>0,(11-18-附表4G16),(11-18))
          this.thisData.ynseybby.columnValue =
            this.thisData.xxseybby.columnValue >
            this.thisData.sjdkseybby.columnValue
              ? Number(this.thisData.xxseybby.columnValue) -
                Number(this.thisData.sjdkseybby.columnValue) -
                Number(this.thisData.ybxmjjdjejsbqsjdje.columnValue)
              : Number(this.thisData.xxseybby.columnValue) -
                Number(this.thisData.sjdkseybby.columnValue);
          this.thisData.ynsejzby.columnValue =
            this.thisData.xxsejzby.columnValue >
            this.thisData.sjdksejzby.columnValue
              ? Number(this.thisData.xxsejzby.columnValue) -
                Number(this.thisData.sjdksejzby.columnValue) -
                Number(this.thisData.jzjtxmjjdjejsbqsjdje.columnValue)
              : Number(this.thisData.xxsejzby.columnValue) -
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
      } else if (type == "lj") {
        // 累计
        if (projectType == "yb") {
          // 一般项目
          keyName = dataName + "ybbnlj";
        } else if (projectType == "jz") {
          // 即征即收项目
          keyName = dataName + "jzbnlj";
        }
        this.thisData[keyName].columnValue = e.target.innerText;
        console.log(111, this.thisData);
      }
      this.submitEdit();
    },
    // 提交修改
    submitEdit() {
      let param = {};
      for (let key in this.thisData) {
        // param[key]=key;
        param[key] = this.thisData[key].columnValue;
      }
      console.log("www", param);
      let url;
      url = "/api/perTaxToolTwo/e9zReportSb/updateReportSb1";
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
  padding: 10px 20px;
  // margin-top: 20px;
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
  height: 1.4rem;
  // align-items: center;
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

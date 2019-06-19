<template>
  <div class='main clearfix'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工资表导入</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='search_contain'>
      <div class='info'>
        <span>工资表上传 单企业单月导入</span>
        <a href="月度工资表模板.xlsx" download="月度工资表模板">点击下载工资表模板</a>
      </div>
      <div>
        <el-form :inline="true" :model="uploadData" class="demo-form-inline">
          <el-form-item label="账期">
            <el-date-picker v-model="uploadData.accountPeriod" type="month" format="yyyy-MM " value-format="yyyy-MM" placeholder="选择月" clearable>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公司">
            <el-select v-model="uploadData.customerId" placeholder="请选择公司名称" clearable>
              <el-option v-for="(item,index) in customerList" :key="index" :label="item.customerName" :value='item.customerId'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号导入">
            <el-switch v-model="switchvalue"></el-switch>
          </el-form-item>
          
          <el-button type="primary" @click='selectExcel'>选择Excel</el-button>
          <el-button type="primary" @click='continueExcel'>沿用上月</el-button>
        </el-form>
      </div>
    </div>
    <div class='main_contain'>
      <h5>月度录入表</h5>
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="公司">
            <el-select v-model="customerId" placeholder="请选择公司名称" clearable>
              <el-option v-for="(item,index) in customerList" :key="index" :label="item.customerName" :value='item.customerId'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账期">
            <el-date-picker v-model="accountPeriod" type="month" format="yyyy-MM " value-format="yyyy-MM" placeholder="选择月" clearable>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="statusVaule" placeholder="请选择状态" clearable>
              <el-option label="已提交" value="1"></el-option>
              <el-option label="未提交" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click='search'>搜索</el-button>
          <el-button type="primary" @click='addUser' v-if="calcFlag">新增员工</el-button>
          <!-- <el-button type="primary" @click='selectExcel'>重置</el-button> -->
        </el-form>
      </div>
      <el-button type="primary" size='mini' @click='calc' v-if="calcFlag">计算</el-button>
      <el-button class='muldel' type="danger" size='mini' icon="el-icon-delete" :disabled="canDel" @click='showDelDialog' v-if="tableData1.length>0">批量删除</el-button>
      <el-table class="table1" :data="tableData1" stripe style="width: 100%;margin-top:20px" @selection-change="handleSelectionChange">
        
        <el-table-column type="expand">
          <template slot-scope="props">
    						<el-form label-position="left" inline class="demo-table-expand">
    							<el-form-item label="基本养老保险费">
    								<span>{{ props.row.pensionInsurance }}</span>
    							</el-form-item>
    							<el-form-item label="基本医疗保险费">
    								<span>{{ props.row.medicalInsurance }}</span>
    							</el-form-item>
    							<el-form-item label="失业保险费">
    								<span>{{ props.row.unemploymentInsurance }}</span>
    							</el-form-item>
    							<el-form-item label="住房公积金">
    								<span>{{ props.row.housingFund }}</span>
    							</el-form-item>
    							<el-form-item label="本月计子女教育">
    								<span>{{ props.row.childEducation }}</span>
    							</el-form-item>
    							<el-form-item label="本月继续教育">
    								<span>{{ props.row.continuingEducation }}</span>
    							</el-form-item>
    							<el-form-item label="本月住房贷款利息">
    								<span>{{ props.row.homeLoan }}</span>
    							</el-form-item>
    							<el-form-item label="本月住房租金">
    								<span>{{ props.row.housingRent }}</span>
    							</el-form-item>
    							<el-form-item label="本月赡养老人">
    								<span>{{ props.row.elderly }}</span>
    							</el-form-item>
    							<el-form-item label="企业(职业)年金">
    								<span>{{ props.row.companyAnnuity }}</span>
    							</el-form-item>
    							<el-form-item label="商业健康保险">
    								<span>{{ props.row.healthInsurance }}</span>
    							</el-form-item>
    							<el-form-item label="税延养老保险">
    								<span>{{ props.row.pension }}</span>
    							</el-form-item>
    							<el-form-item label="准予扣除的捐赠额">
    								<span>{{ props.row.deductedDonation }}</span>
    							</el-form-item>
    							<el-form-item label="是否残疾烈属孤老">
    								<span>{{ props.row.isSolitary }}</span>
    							</el-form-item>
    							<el-form-item label="允许扣除的税费">
    								<span>{{ props.row.deductedTaxes }}</span>
    							</el-form-item>
    							<el-form-item label="其他税前扣除项目">
    								<span>{{ props.row.preTaxDeduction }}</span>
    							</el-form-item>
    							<el-form-item label="年终奖">
    								<span>{{ props.row.yearAwards }}</span>
    							</el-form-item>
    							<el-form-item label="减免税额">
    								<span>{{ props.row.deductTax }}</span>
    							</el-form-item>
    						</el-form>
          </template>
				</el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" type='index' width="50"></el-table-column>
				<el-table-column prop="employeeName" label="姓名" width="120"></el-table-column>
				<el-table-column prop="cardType" label="证件类型"></el-table-column>
				<el-table-column prop="cardNum" label="证件号码"></el-table-column>
				<el-table-column prop="employmentDate" label="任职受雇日期"></el-table-column>
				<el-table-column prop="projectCode" label="所得项目名称"></el-table-column>
				<el-table-column prop="incomeAmount" label="收入额"></el-table-column>
				<el-table-column prop="reportedIncome" label="已申报收入"></el-table-column>
				<el-table-column prop="taxFreeIncome" label="免税所得"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click='edit(scope.row)'>编辑</el-button>
            <el-button type="text" size="small" @click='del(scope.row)'>删除</el-button>
          </template>
				</el-table-column>
			</el-table>
			<el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '1')})" :current-page="currentPage1"  :page-size="pageSize1" layout="total, prev, pager, next, jumper" :total="total1">
      </el-pagination>
		</div>

    <div class='main_contain bottomTable'>
      <span class="title">累计工资薪金汇算表【不包括劳务报酬、稿酬及其他非工资薪金，如需查看请点击</span><span class="title reportFrom">报表查看</span><span class="title"> 】</span>			
      <div>
        <el-button type="primary" @click='submitAll' v-if="calcFlag">提交</el-button>
      </div>
			<el-table :data="tableData2" style="width: 100%;margin-top:20px;" stripe border>
				<el-table-column label="序号" type='index' width="50" :resizable="false"></el-table-column>
				<el-table-column label="姓名" prop="employeeName" :resizable="false"></el-table-column>
				<el-table-column label="证件号码" prop="cardNum" :resizable="false"></el-table-column>
        <el-table-column label="任职受雇日期" prop="employmentDate" width="120" :resizable="false"></el-table-column>
        <el-table-column label="收入额" prop="incomeAmount" width="80" :resizable="false"></el-table-column>
        <el-table-column label="年终奖" prop="yearAwards" width="90" :resizable="false"></el-table-column>
        <el-table-column label="五险一金" prop="insurance" width="90" :resizable="false"></el-table-column>
        <el-table-column label="专项附加扣除" prop="specialDeduction" width="120" :resizable="false"></el-table-column>
        <el-table-column label="其他扣除项" prop="otherDeduction" width="110" :resizable="false"></el-table-column>
        <el-table-column label="应纳税所得额" prop="taxableIncome" width="120" :resizable="false"></el-table-column>
        <el-table-column label="应纳税额" prop="payableTax" width="90" :resizable="false"></el-table-column>
        <el-table-column label="已缴税额" prop="withholdTax" width="90" :resizable="false"></el-table-column>
        <el-table-column label="应补（退）税额" prop="taxation" width="130" :resizable="false"></el-table-column>
        <el-table-column label="操作" :resizable="false">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详细</el-button>
          </template>
        </el-table-column>
			</el-table>
			<el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '2')})" :current-page="currentPage2" :page-size="pageSize2" layout="total, prev, pager, next, jumper" :total="total2">
      </el-pagination>
		</div>

    <div v-if="tableData3.length>0" class='main_contain bottomTable' style="margin-bottom:20px">
      <span class="title">年终奖工资表</span>
      <el-table :data="tableData3" style="width: 100%" stripe border>
        <el-table-column label="序号" type='index' width="50" :resizable="false"></el-table-column>
        <el-table-column label="姓名" prop="employeeName" :resizable="false"></el-table-column>
        <el-table-column label="证件号码" prop="cardNum" :resizable="false"></el-table-column>
        <el-table-column label="任职受雇日期" prop="employmentDate" :resizable="false"></el-table-column>
        <el-table-column label="收入额" prop="incomeAmount" :resizable="false"></el-table-column>
        <el-table-column label="应纳税所得额" prop="taxableIncome" :resizable="false"></el-table-column>
        <el-table-column label="应纳税额" prop="preWithholdTax" :resizable="false"></el-table-column>
        <el-table-column label="已缴税额" prop="prepaidTax" :resizable="false"></el-table-column>
        <el-table-column label="应补（退）税额" prop="taxation" :resizable="false"></el-table-column>
      </el-table>
			<el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '3')})" :current-page="currentPage3" :page-size="pageSize3" layout="total, prev, pager, next, jumper" :total="total3">
      </el-pagination>
		</div>
    <div v-if="tableData3.length==0" class="tips">
      <p>【提示】因本次选择年终奖筹划中的推荐方案（实际也是合并方案的情况）/合并方案，故此表包含年终奖个税</p>
    </div>

    <el-dialog :title="addFlag?'新增':'编辑'" :visible.sync="dialogVisibleAdd" width="90%" class="dialogAdd">
		  <el-form :inline="true" :ref="item" :model="item" class="demo-form-inline" label-width="180px" :rules='rules'>
        <el-form-item label="姓名" prop="employeeName">
          <el-input v-model="item.employeeName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="cardType">
          <el-select v-model="item.cardType" placeholder="请选择" clearable>
            <el-option label="居民身份证" value="居民身份证"></el-option>
            <el-option label="中国护照" value="中国护照"></el-option>
            <el-option label="港澳居民来往内地通行证" value="港澳居民来往内地通行证"></el-option>
            <el-option label="港澳居民居住证" value="港澳居民居住证"></el-option>
            <el-option label="台湾居民来往大陆通行证" value="台湾居民来往大陆通行证"></el-option>
            <el-option label="台湾居民居住证" value="台湾居民居住证"></el-option>
            <el-option label="外国护照" value="外国护照"></el-option>
            <el-option label="外国人永久居留身份证" value="外国人永久居留身份证"></el-option>
            <el-option label="外国人工作许可证（A类）" value="外国人工作许可证（A类）"></el-option>
            <el-option label="外国人工作许可证（B类）" value="外国人工作许可证（B类）"></el-option>
            <el-option label="外国人工作许可证（C类）" value="外国人工作许可证（C类）"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="cardNum">
          <el-input v-model="item.cardNum" placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="任职受雇日期" prop="employmentDate">
          <el-date-picker v-model="item.employmentDate" type="date" format="yyyy-MM-dd " value-format="yyyy-MM-dd" placeholder="请选择任职受雇日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="所得项目名称" prop="projectCode">
          <el-input v-model="item.projectCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="收入额" prop="incomeAmount">
          <el-input v-model="item.incomeAmount" placeholder="请输入收入额"></el-input>
        </el-form-item>
        <el-form-item label="已申报收入" prop="reportedIncome">
          <el-input v-model="item.reportedIncome" placeholder="请输入已申报收入"></el-input>
        </el-form-item>
        <el-form-item label="免税所得" prop="taxFreeIncome">
          <el-input v-model="item.taxFreeIncome" placeholder="请输入免税所得"></el-input>
        </el-form-item>
        <el-form-item label="基本养老保险费" prop="pensionInsurance">
          <el-input v-model="item.pensionInsurance" placeholder="请输入基本养老保险费"></el-input>
        </el-form-item>
        <el-form-item label="基本医疗保险费" prop="medicalInsurance">
          <el-input v-model="item.medicalInsurance" placeholder="请输入基本医疗保险费"></el-input>
        </el-form-item>
        <el-form-item label="失业保险费" prop="unemploymentInsurance">
          <el-input v-model="item.unemploymentInsurance" placeholder="请输入失业保险费"></el-input>
        </el-form-item>
        <el-form-item label="住房公积金" prop="housingFund">
          <el-input v-model="item.housingFund" placeholder="请输入住房公积金"></el-input>
        </el-form-item>
        <el-form-item label="本月计子女教育" prop="childEducation">
          <el-input v-model="item.childEducation" placeholder="请输入本月计子女教育"></el-input>
        </el-form-item>
        <el-form-item label="本月继续教育" prop="continuingEducation">
          <el-input v-model="item.continuingEducation" placeholder="请输入本月继续教育"></el-input>
        </el-form-item>
        <el-form-item label="本月住房贷款利息" prop="homeLoan">
          <el-input v-model="item.homeLoan" placeholder="请输入本月住房贷款利息"></el-input>
        </el-form-item>
        <el-form-item label="本月住房租金" prop="housingRent">
          <el-input v-model="item.housingRent" placeholder="请输入本月住房租金"></el-input>
        </el-form-item>
        <el-form-item label="本月赡养老人" prop="elderly">
          <el-input v-model="item.elderly" placeholder="请输入赡养老人"></el-input>
        </el-form-item>
        <el-form-item label="企业(职业)年金" prop="companyAnnuity">
          <el-input v-model="item.companyAnnuity" placeholder="请输入企业(职业)年金"></el-input>
        </el-form-item>
        <el-form-item label="商业健康保险" prop="healthInsurance">
          <el-input v-model="item.healthInsurance" placeholder="请输入商业健康保险"></el-input>
        </el-form-item>
        <el-form-item label="税延养老保险" prop="pension">
          <el-input v-model="item.pension" placeholder="请输入税延养老保险"></el-input>
        </el-form-item>
        <el-form-item label="准予扣除的捐赠额" prop="deductedDonation">
          <el-input v-model="item.deductedDonation" placeholder="请输入准予扣除的捐赠额"></el-input>
        </el-form-item>
        <el-form-item label="是否残疾烈属孤老" prop="isSolitary">
          <el-select v-model="item.isSolitary" placeholder="请选择" clearable>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="允许扣除的税费" prop="deductedTaxes">
          <el-input v-model="item.deductedTaxes" placeholder="请输入允许扣除的税费"></el-input>
        </el-form-item>
        <el-form-item label="其他税前扣除项目" prop="preTaxDeduction">
          <el-input v-model="item.preTaxDeduction" placeholder="请输入其他税前扣除项目"></el-input>
        </el-form-item>
        <el-form-item label="财产原值" prop="propertyOrigin" v-if="addFlag">
          <el-input v-model="item.propertyOrigin" placeholder="请输入财产原值"></el-input>
        </el-form-item>
        <el-form-item label="是否雇员" prop="isEmployment" v-if="addFlag">
          <el-select v-model="item.isEmployment" placeholder="请选择" clearable>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年终奖" prop="yearAwards">
          <el-input v-model="item.yearAwards" placeholder="请输入年终奖"></el-input>
        </el-form-item>
        <el-form-item label="减免税额" prop="deductTax">
          <el-input v-model="item.deductTax" placeholder="请输入减免税额"></el-input>
        </el-form-item>
        <el-form-item label="国家或地区代码" prop="areaCode" v-if="addFlag">
          <el-select v-model="item.areaCode" placeholder="请选择" clearable>
            <el-option label="中国" value="1"></el-option>
            <el-option label="外国" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电子邮件" prop="email" v-if="addFlag">
          <el-input v-model="item.email" placeholder="请输入电子邮件"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" v-if="addFlag">
          <el-input v-model="item.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
			</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" v-if="addFlag" @click="continueAdd">继续新增员工基础信息</el-button>
        <el-button type="primary" v-if="addFlag" @click="save(item)">保存员工工资信息</el-button>
        <el-button type="primary" v-if="!addFlag" @click="save(item)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="月度工资表详细" :visible.sync="dialogVisibleDetail" width="50%" style="margin-top:15vh">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.title" :name="item.name" v-for="(item,index) in tableTabs" :key="index">
          <el-table :data="tableDataDetail" border style="width: 100%">
            <el-table-column label="月份" prop="accountPeriod"></el-table-column>
            <el-table-column v-if="item.name==1" label="本月收入" prop="monIncome"></el-table-column>
            <el-table-column v-if="item.name==2" label="累计收入" prop="sumIncome"></el-table-column>
            <el-table-column v-if="item.name==2" label="费用扣除标准" prop="sumDeductStandard"></el-table-column>
            <el-table-column label="五险一金" v-if="item.name==1||item.name==2" :prop="item.name==1?'monInsurance':'sumInsurance'"></el-table-column>
            <el-table-column label="专项附加扣除" v-if="item.name==1||item.name==2" :prop="item.name==1?'monAddDeduct':'sumAddDeduct'"></el-table-column>
            <el-table-column label="其他扣除项" v-if="item.name==1||item.name==2" :prop="item.name==1?'monOthDeduct':'sumOthDeduct'"></el-table-column>
            <el-table-column v-if="item.name==3" label="预交应纳税所得" prop="calQuickDeduction"></el-table-column>
            <el-table-column v-if="item.name==3" label="税率" prop="calRate"></el-table-column>
            <el-table-column v-if="item.name==3" label="速算扣除数" prop="calQuickDeduction"></el-table-column>
            <el-table-column v-if="item.name==3" label="应纳税额" prop="calQuickDeduction"></el-table-column>
            <el-table-column v-if="item.name==3" label="已缴税额" prop="calQuickDeduction"></el-table-column>
            <el-table-column v-if="item.name==3" label="应补（退）税额" prop="calQuickDeduction"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog title="易点个税年终奖筹划方案" class="dialogCalc" :visible.sync="dialogVisibleCalc" width="60%" style="margin-top:15vh">
      <span class="title">个税合计：【分开核算】{{calcData.sepTaxation}}【合并核算】{{calcData.comTaxation}}</span><span class="title reportFrom">【推荐核算】</span><span class="title"> {{calcData.suggestTaxation}}</span>
      <div class="buttons">
        <el-button icon="el-icon-collection" size='mini' @click="saveCalc('1')">保存年终筹划</el-button>
        <el-button icon="el-icon-collection" size='mini' @click="saveCalc('2')">年终筹划默认全是分开核算</el-button>
        <el-button icon="el-icon-collection" size='mini' @click="saveCalc('3')">年终筹划默认全是合并核算</el-button>
        <el-button icon="el-icon-collection" type="primary" size='mini' @click="saveCalc('4')">年终筹划默认全是推荐核算</el-button>
      </div>
            
      <el-table :data="tableData4" style="width: 100%;margin-top:20px" stripe border>
        <el-table-column label="姓名" prop="employeeName" :resizable="false"></el-table-column>
        <el-table-column label="收入额" prop="incomeAmount" width="100" :resizable="false"></el-table-column>
        <el-table-column label="年终奖" prop="yearAwards" width="100" :resizable="false"></el-table-column>
        <el-table-column label="分开核算个税" prop="sepTaxation" width="120" :resizable="false"></el-table-column>
        <el-table-column label="合并核算个税" prop="comTaxation" width="120" :resizable="false"></el-table-column>
        <el-table-column label="推荐方案" prop="suggestType" width="120" :resizable="false"></el-table-column>
        <el-table-column label="操作" :resizable="false">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.radio" size="small">
              <el-radio-button label="分开核算"></el-radio-button>
              <el-radio-button label="合并核算"></el-radio-button>
              <el-radio-button label="推荐核算"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background style="margin-top:10px;" @current-change="((val)=>{handleCurrentChange(val, '4')})" :current-page="currentPage4" :page-size="pageSize4" layout="total, prev, pager, next" :total="total4">
      </el-pagination>
    </el-dialog>

    <el-dialog title="选择Excel" :visible.sync="dialogVisible" width="30%">
			<el-upload class="upload-demo" action="/perTaxToolTwo/api/excel/monthlyUpload.do" :on-preview="handlePreview" ref='upload'
			 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="10" :on-exceed="handleExceed" :file-list="fileList"
			 :on-success="handleSuccess" :on-error="handleError" 
			 :auto-upload="false" :data='uploadData' accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
				<el-button size="small" type="primary" slot="trigger">选择Excel</el-button>

			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitUpload">上传</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
  name: "paySheet",
  data() {
    var validateInt = (rule, value, callback) => {
      var reg = /^[0-9]+(\.\d+)?$/;
      if (value === "") {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("必须大于等于0"));
      } else {
        callback();
      }
    };
    var validateMax60 = (rule, value, callback) => {
      var reg = /^6000$|^(\d|[1-9]\d)(\.\d+)*$/;
      if (value === "") {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("必须大于等于0小于等于6000"));
      } else {
        callback();
      }
    };
    var validateMax48 = (rule, value, callback) => {
      var reg = /^4800$|^(\d|[1-9]\d)(\.\d+)*$/;
      if (value === "") {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("必须大于等于0小于等于4800"));
      } else {
        callback();
      }
    };
    var validateMax10 = (rule, value, callback) => {
      var reg = /^1000$|^(\d|[1-9]\d)(\.\d+)*$/;
      if (value === "") {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("必须大于等于0小于等于1000"));
      } else {
        callback();
      }
    };
    var validateMax15 = (rule, value, callback) => {
      var reg = /^1500$|^(\d|[1-9]\d)(\.\d+)*$/;
      if (value === "") {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("必须大于等于0小于等于1500"));
      } else {
        callback();
      }
    };
    var validateMax800 = (rule, value, callback) => {
      var reg = /^80000$|^(\d|[1-9]\d)(\.\d+)*$/;
      if (value === "") {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("必须大于等于0小于等于80000"));
      } else {
        callback();
      }
    };

    return {
      dialogVisible: false,
      uploadData: {
        accountPeriod: "",
        customerId: "",
        inputType: ""
      },
      switchvalue: false,
      accountPeriod: "",
      customerId: "",
      statusVaule: "0",
      fileList: [],
      tableData1: [],
      currentPage1: 1,
      pageSize1: 10,
      pageNum1: 1,
      total1: 0,
      tableData2: [],
      currentPage2: 1,
      pageSize2: 10,
      pageNum2: 1,
      total2: 0,
      tableData3: [],
      currentPage3: 1,
      pageSize3: 10,
      pageNum3: 1,
      total3: 0,
      tableData4: [],
      currentPage4: 1,
      pageSize4: 10,
      pageNum4: 1,
      total4: 0,
      dialogVisibleDetail: false,
      activeName: "1", //月度工资表详细Tab
      tableTabs: [
        {
          title: "本月数据",
          name: "1"
        },
        {
          title: "累计情况",
          name: "2"
        },
        {
          title: "税款计算",
          name: "3"
        }
      ], //月度工资表详细Tab
      tableDataDetail: [], //月度工资表详细数据
      canDel: true, //批量删除按钮状态
      multipleSelection: [], //多选
      item: {
        employeeName: "",
        cardType: "",
        cardNum: "",
        employmentDate: "",
        projectCode: "",
        incomeAmount: "0",
        reportedIncome: "0",
        taxFreeIncome: "0",
        pensionInsurance: "0",
        medicalInsurance: "0",
        unemploymentInsurance: "0",
        housingFund: "0",
        childEducation: "0",
        continuingEducation: "0",
        homeLoan: "0",
        housingRent: "0",
        elderly: "0",
        companyAnnuity: "0",
        healthInsurance: "0",
        pension: "0",
        deductedDonation: "0",
        isSolitary: "0",
        deductedTaxes: "0",
        preTaxDeduction: "0",
        propertyOrigin: "0",
        isEmployment: "1",
        yearAwards: "0",
        deductTax: "0",
        areaCode: "0",
        email: "0",
        phone: "0"
      },
      dialogVisibleAdd: false,
      rules: {
        employeeName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        cardType: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "change"
          }
        ],
        cardNum: [
          {
            required: true,
            message: "请输入证件号码",
            trigger: "blur"
          }
        ],
        employmentDate: [
          {
            type: "string",
            required: true,
            message: "请选择任职受雇日期日期",
            trigger: "change"
          }
        ],
        projectCode: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        incomeAmount: [
          {
            required: true,
            message: "请输入收入额",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        reportedIncome: [
          {
            required: true,
            message: "请输入已申报收入",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        taxFreeIncome: [
          {
            required: true,
            message: "请输入免税所得",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        pensionInsurance: [
          {
            required: true,
            message: "请输入基本养老保险费",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        medicalInsurance: [
          {
            required: true,
            message: "请输入基本医疗保险费",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        unemploymentInsurance: [
          {
            required: true,
            message: "请输入失业保险费",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        housingFund: [
          {
            required: true,
            message: "请输入住房公积金",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        childEducation: [
          {
            required: true,
            message: "请输入本月计子女教育",
            trigger: "blur"
          },
          {
            validator: validateMax60,
            trigger: "blur"
          }
        ],
        continuingEducation: [
          {
            required: true,
            message: "请输入本月继续教育",
            trigger: "blur"
          },
          {
            validator: validateMax48,
            trigger: "blur"
          }
        ],
        homeLoan: [
          {
            required: true,
            message: "请输入住房贷款利息",
            trigger: "blur"
          },
          {
            validator: validateMax10,
            trigger: "blur"
          }
        ],
        housingRent: [
          {
            required: true,
            message: "请输入本月住房租金",
            trigger: "blur"
          },
          {
            validator: validateMax15,
            trigger: "blur"
          }
        ],
        elderly: [
          {
            required: true,
            message: "请输入本月赡养老人",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        companyAnnuity: [
          {
            required: true,
            message: "请输入企业(职业)年金",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        healthInsurance: [
          {
            required: true,
            message: "请输入商业健康保险",
            trigger: "blur"
          },
          {
            validator: validateMax800,
            trigger: "blur"
          }
        ],
        pension: [
          {
            required: true,
            message: "请输入税延养老保险",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        deductedDonation: [
          {
            required: true,
            message: "请输入准予扣除的捐赠额",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        isSolitary: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        deductedTaxes: [
          {
            required: true,
            message: "请输入允许扣除的税费",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        preTaxDeduction: [
          {
            required: true,
            message: "请输入其他税前扣除项目",
            trigger: "blur"
          }
        ],
        yearAwards: [
          {
            required: true,
            message: "请输入年终奖",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        deductTax: [
          {
            required: true,
            message: "请输入减免税额",
            trigger: "blur"
          },
          {
            validator: validateInt,
            trigger: "blur"
          }
        ],
        areaCode: [
          {
            required: true,
            message: "请选择国家",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入电子邮件",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur"
          }
        ]
      },
      dialogVisibleCalc: false,
      calcData: {},
      addFlag: false,
      operateId: "",
      customerList: [],
      calcFlag: false
    };
  },
  watch: {
    multipleSelection(val) {
      if (val.length == 0) {
        this.canDel = true;
      } else {
        this.canDel = false;
      }
    },
    switchvalue(val) {
      if (val) {
        this.uploadData.inputType = 1;
      } else {
        this.uploadData.inputType = "";
      }
      console.log("this.uploadData.inputType", this.uploadData.inputType);
    }
  },
  components: {},
  methods: {
    // 1.8 操作表id接口
    getOperatorId() {
      let params = {
        row: this.pageSize1,
        page: this.pageNum1,
        data: {
          accountPeriod: this.accountPeriod,
          customerId: this.customerId,
          submitStatus: this.statusVaule
        }
      };
      this.axios
        .post("/perTaxToolTwo/initialMonCom/queryPage", params)
        .then(res => {
          if (res.data.code == 200) {
            this.operateId = res.data.data[0].operateId;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "获取操作表id失败",
            type: "error"
          });
        });
    },
    // 1.3 搜索接口(导入员工信息展示)
    getTableData1() {
      let params = {
        row: this.pageSize1,
        page: this.pageNum1,
        data: {
          accountPeriod: this.accountPeriod,
          customerId: this.customerId,
          submitStatus: this.statusVaule
        }
      };
      this.axios
        .post("/test/tableData1", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData1 = res.data.data;
            this.total1 = res.data.count;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "获取月度录入表失败",
            type: "error"
          });
        });
    },
    // 1.4 搜索接口(计算累计汇算表展示)
    getTableData2() {
      let params = {
        row: this.pageSize2,
        page: this.pageNum2,
        data: {
          accountPeriod: this.accountPeriod,
          customerId: this.customerId,
          employeeName: "",
          submitStatus: this.statusVaule
        }
      };
      this.axios
        .post("/test/tableData2", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData2 = res.data.data;
            this.total2 = res.data.count;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "获取累计工资薪金汇算表失败",
            type: "error"
          });
        });
    },
    // 1.5 搜索接口（选择年终统筹展示）
    getTableData3() {
      let params = {
        row: this.pageSize3,
        page: this.pageNum3,
        data: {
          accountPeriod: this.accountPeriod,
          customerId: this.customerId,
          employeeName: "",
          submitStatus: this.statusVaule
        }
      };
      this.axios
        .post("/test/tableData3", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData3 = res.data.data;
            this.total3 = res.data.count;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "获取年终奖工资表失败",
            type: "error"
          });
        });
    },
    // 获取月度工资表详细数据  /perTaxToolTwo/monDetail/queryList
    getMonthDetail(cardNum) {
      let params = {
        cardNum: cardNum,
        operateId: this.operateId
      };
      this.axios
        .post("/test/monDetail", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableDataDetail = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "获取月度工资表详细数据失败",
            type: "error"
          });
        });
    },
    // /perTaxToolTwo/monAcct/queryChoosePage
    getTableData4() {
      let params = {
        row: this.pageSize4,
        page: this.pageNum4,
        data: {
          operateId: this.operateId
        }
      };
      this.axios
        .post("/test/tableData4", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData4 = res.data.data;
            this.calcData = res.data.extraData;
            this.total4 = res.data.count;
            this.tableData4.forEach((item, index) => {
              this.$set(item, "radio", "推荐核算");
              // item.radio='推荐核算'
            });
            console.log("11", this.tableData4);
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "获取失败",
            type: "error"
          });
        });
    },
    handleClick(row) {
      console.log("获取详细数据", row);
      this.dialogVisibleDetail = true;
      this.getMonthDetail(row.cardNum);
    },
    search() {
      // 获取操作表id
      this.getOperatorId();
      this.pageNum1='1';
      this.getTableData1();
      this.pageNum2='1';
      this.getTableData2();
      this.pageNum3='1';
      this.getTableData3();
      if (this.statusVaule == 0) {
        this.calcFlag = true;
      } else {
        this.calcFlag = false;
      }
    },
    selectExcel() {
      this.dialogVisible = true;
    },
    // 沿用上月
    continueExcel() {
      let params = {
        customerId: this.uploadData.customerId,
        accountPeriod: this.uploadData.accountPeriod
      };
      this.axios
        .post("/test/continueExcel", params)
        .then(res => {
          if (res.data.code == 200) {
            this.pageNum1='1';
            this.getTableData1();
            this.pageNum2='1';
            this.getTableData2();
            this.pageNum3='1';
            this.getTableData3();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "沿用上月数据失败",
            type: "error"
          });
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response) {
      if (response.code == 200) {
        this.fileList = [];
        this.$message({
          message: response.msg,
          type: "success"
        });
        this.dialogVisible = false;
        this.accountPeriod = this.uploadData.accountPeriod;
        this.customerId = this.uploadData.customerId;
        this.statusVaule = "0";
        this.addFlag = true;
        this.getOperatorId();
        this.pageNum1='1';
        this.getTableData1();
        this.pageNum2='1';
        this.getTableData2();
        this.pageNum3='1';
        this.getTableData3();
      } else {
        this.fileList = [];
        this.$message({
          message: response.msg || "上传文件失败！",
          type: "error"
        });
      }
    },
    handleError(err) {
      this.fileList = [];
      this.$message({
        message: "上传文件失败！",
        type: "error"
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleCurrentChange(val, type) {
      if (type == "1") {
        this.pageNum1 = val;
        this.getTableData1();
      } else if (type == "2") {
        this.pageNum2 = val;
        this.getTableData2();
      } else if (type == "3") {
        this.pageNum3 = val;
        this.getTableData3();
      } else if (type == "4") {
        this.pageNum4 = val;
        this.getTableData4();
        // 在此保存计算年终奖
        this.saveCalc("1");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addUser() {
      this.item = {
        employeeName: "",
        cardType: "",
        cardNum: "",
        employmentDate: "",
        projectCode: "",
        incomeAmount: "0",
        reportedIncome: "0",
        taxFreeIncome: "0",
        pensionInsurance: "0",
        medicalInsurance: "0",
        unemploymentInsurance: "0",
        housingFund: "0",
        childEducation: "0",
        continuingEducation: "0",
        homeLoan: "0",
        housingRent: "0",
        elderly: "0",
        companyAnnuity: "0",
        healthInsurance: "0",
        pension: "0",
        deductedDonation: "0",
        isSolitary: "0",
        deductedTaxes: "0",
        preTaxDeduction: "0",
        propertyOrigin: "0",
        isEmployment: "1",
        yearAwards: "0",
        deductTax: "0",
        areaCode: "0",
        email: "0",
        phone: "0"
      };
      this.addFlag = true;
      this.dialogVisibleAdd = true;
      this.$nextTick(() => {
        this.$refs[this.item].resetFields();
      });
    },
    edit(row) {
      console.log("row.", row);
      this.item = row;
      this.addFlag = false;
      this.dialogVisibleAdd = true;
      this.$nextTick(() => {
        this.$refs[this.item].resetFields();
      });
    },
    del(row) {
      this.$confirm("确定删除此条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = [row];
        console.log("params", params);
        this.axios
          .post("/perTaxToolTwo/initialMonSal/deletemonth", params)
          .then(res => {
            if (res.data.code == 200) {
              this.pageNum1='1';
              this.getTableData1();
              this.pageNum2='1';
              this.getTableData2();
              this.pageNum3='1';
              this.getTableData3();
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(function(err) {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          });
      });
    },
    showDelDialog() {
      this.$confirm("确定删除选中的记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = this.multipleSelection;
        console.log("params", params);
        this.axios
          .post("/perTaxToolTwo/initialMonSal/deletemonth", params)
          .then(res => {
            if (res.data.code == 200) {
              this.pageNum1='1';
              this.getTableData1();
              this.pageNum2='1';
              this.getTableData2();
              this.pageNum3='1';
              this.getTableData3();
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(function(err) {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          });
      });
    },
    calc() {
      this.$confirm("您确定要计算【月度工资表】吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 先调取计算接口 /perTaxToolTwo/monAcct/CalculatorSingleCompany
        let params = {};
        this.axios
          .post("/test/CalculatorSingleCompany", params)
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data.length > 0) {
                this.dialogVisibleCalc = true;
                // 再获取弹出层表格的数据
                this.pageNum4='1';
                this.getTableData4();
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(function(err) {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          });
      });
    },
    saveCalc(type) {
      console.log(this.tableData4);
      let params = {};
      let confirmInfo;
      if (type == "1") {
        let paramArr = [];
        this.tableData4.forEach(item => {
          var obj = {};
          obj.operateId = this.operateId;
          obj.monthlyAcctId = item.monthlyAcctId;
          if (item.radio == "分开核算") {
            obj.chooseType = "1";
          } else if (item.radio == "合并核算") {
            obj.chooseType = "2";
          } else if (item.radio == "推荐核算") {
            obj.chooseType = "3";
          }
          paramArr.push(obj);
        });
        params = [paramArr];
        confirmInfo = "您确定要保存年终筹划吗？";
      } else if (type == "2") {
        params.type = "1";
        params.operateId = this.operateId;
        confirmInfo = "您确定要年终筹划全是【分开核算】吗？";
      } else if (type == "3") {
        params.type = "2";
        params.operateId = this.operateId;
        confirmInfo = "您确定要年终筹划全是【合并核算】吗？";
      } else if (type == "4") {
        params.type = "3";
        params.operateId = this.operateId;
        confirmInfo = "您确定要年终筹划全是【推荐核算】吗？";
      }

      console.log("params", params);

      this.$confirm(confirmInfo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // /perTaxToolTwo/monAcct/chooseCalcTypeList
        this.axios
          .post("/test/CalculatorSingleCompany", params)
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data.length > 0) {
                this.dialogVisibleCalc = true;
                // 再获取弹出层表格的数据
                this.pageNum4='1';
                this.getTableData4();
              } else {
                this.dialogVisibleCalc = false;
                this.pageNum1='1';
                this.getTableData1();
                this.pageNum2='1';
                this.getTableData2();
                this.pageNum3='1';
                this.getTableData3();
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(function(err) {
            this.$message({
              message: "保存失败",
              type: "error"
            });
          });
      });
    },
    continueAdd() {},
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {
      let params = this.item;

      if (this.addFlag) {
        params.accountPeriod = this.accountPeriod;
        params.customerId = this.customerId;
        params.submitStatus = this.statusVaule;
        params.monthlyId = "";
        params.operateId = "";
      }

      console.log("params", params);
      this.axios
        .post("/perTaxToolTwo/Employee/addOrEditTaxEmployee", params)
        .then(res => {
          if (res.data.code == 200) {
            this.pageNum1='1';
              this.getTableData1();
              this.pageNum2='1';
              this.getTableData2();
              this.pageNum3='1';
              this.getTableData3();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(err) {
          this.$message({
            message: "新增失败",
            type: "error"
          });
        });
    },
    submitAll() {
      let params = {
        operateIdM: this.operateId
      };
      this.$confirm("您确定要提交【月度工资表】和【累计汇算表】吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios
          .post("/perTaxToolTwo/api/user/import/subExcel.do", params)
          .then(res => {
            if (res.data.code == 200) {
              this.statusVaule = "0";
              this.addFlag = false;
              this.pageNum1='1';
              this.getTableData1();
              this.pageNum2='1';
              this.getTableData2();
              this.pageNum3='1';
              this.getTableData3();
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(function(err) {
            this.$message({
              message: "新增失败",
              type: "error"
            });
          });
      });
    }
  },
  computed: {},
  created() {
    this.customerList = this.$store.state.user.customerinfoList;
    console.log(this.customerList);
    // this.getNowMonth();
  }
};
</script>
<style>
.table1 .demo-table-expand label {
  color: #99a9bf;
  padding-left: 120px;
}
.table1 .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.dialogAdd .el-input,
.dialogAdd .el-select,
.dialogAdd .el-date-editor {
  width: 200px;
}
.dialogCalc .el-dialog__body {
  padding-top: 0;
}
</style>

<style lang='less' scoped>
.main {
  /* background: #fff; */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .el-breadcrumb {
    height: 30px;
    line-height: 29px;
    padding-left: 20px;
    background-color: #fff;
    border-top: 1px solid #f2f6fc;
    box-sizing: border-box;
  }
  /deep/ .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
  /deep/ .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
  /deep/ .el-table td {
    padding: 6px 0;
  }
  .search_contain {
    background: #fff;
    height: 100px;
    padding-left: 20px;
    margin: 20px;
    .info {
      height: 40px;
      line-height: 40px;
    }
    a {
      margin-left: 10px;
    }
  }
  .main_contain {
    background: #fff;
    margin: 0 20px;
    padding: 0px 20px; // height: calc(100% - 190px);
    h5 {
      height: 40px;
      line-height: 40px;
    }
    /deep/ .el-pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
  .title {
    font-weight: bold;
    line-height: 40px;
  }
  .reportFrom {
    color: red;
    cursor: pointer;
  }
  .bottomTable {
    margin-top: 20px;
  }
  .tips {
    color: #2e78ff;
    font-size: 14px;
    line-height: 40px;
    margin: 0 20px;
  }
}
</style>

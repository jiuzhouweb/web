<template>
    <div class="reportForms">
        <div class='search'>
            <div class="title">报表查看</div>
            <div class='search_contain'>
                <div class="row1">
                    <span class="labelTitle">公司：</span>
                    <el-select v-model="searchList.value" placeholder="请选择">
                        <el-option v-for="item in searchList.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="row2">
                    <span class="labelTitle">账期：</span>
                    <el-date-picker v-model="searchList.nowDate" type="month" placeholder="选择月">
                    </el-date-picker>
                </div>
                <div class="row3">
                    <span class="labelTitle">状态：</span>
                    <el-select v-model="searchList.statusVaule" placeholder="请选择">
                        <el-option v-for="item in searchList.status" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="searchButton" @click="search()">查看</div>
                <div class="importButton">重置</div>
            </div>
        </div>
        <div class="content">
            <el-button type="primary" icon="el-icon-success">一键导出</el-button>
            <div class="tableBox">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane :label="item.title" :name="item.name" v-for="(item,index) in tableTabs" :key="index">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column label="序号" type="index" width="50">
                            </el-table-column>
                            <el-table-column prop="date" label="日期" width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="地址">
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin-top:10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40,50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
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
                    nowDate: "",
                    status: [{
                            value: "选项1",
                            label: "已提交"
                        },
                        {
                            value: "选项2",
                            label: "未提交"
                        }
                    ],
                    statusVaule: ''
                },
                activeName: '1',
                tableTabs: [{
                    title: '人员信息',
                    name: '1',
                    content: 'https://www.hao123.com/'
                }, {
                    title: '正常工资薪资所得',
                    name: '2',
                    content: 'http://www.baidu.com'
                }, {
                    title: '全年一次性奖金',
                    name: '3',
                    content: 'http://www.baidu.com'
                }, {
                    title: '稿酬所得',
                    name: '4',
                    content: 'http://www.baidu.com'
                }, {
                    title: '劳务报酬所得',
                    name: '5',
                    content: 'http://www.baidu.com'
                }, {
                    title: '偶然所得',
                    name: '6',
                    content: 'http://www.baidu.com'
                }, {
                    title: '非居民正常工资薪资所得',
                    name: '7',
                    content: 'http://www.baidu.com'
                }],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                currentPage4: 4
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
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    };
</script>

<style scoped>
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
        padding: 20px 20px;
        margin-top: 20px;
    }
    .tableBox {
        margin-top: 15px;
    }
</style>

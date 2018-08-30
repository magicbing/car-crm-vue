<template>
<el-container style="height: 700px; border: 1px solid #eee">

  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">查询</el-menu-item>
        <el-menu-item index="2">新增</el-menu-item>
        <el-menu-item index="3">详情</el-menu-item>
        <!-- <el-menu-item index="4">修改日志</el-menu-item> -->
      </el-menu>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column type="index" label="序号" width=""></el-table-column>
        <el-table-column prop="phoneNo" label="手机号码" width=""></el-table-column>
        <el-table-column prop="remark" label="备注" width=""></el-table-column>
        <el-table-column prop="plateNo" label="车牌号" width=""></el-table-column>
        <el-table-column prop="milage" label="公里数" width=""></el-table-column>
        <el-table-column prop="wax" label="打蜡次数" width=""></el-table-column>
        <el-table-column prop="wash" label="精洗次数" width=""></el-table-column>
        <el-table-column prop="polish" label="抛光次数" width=""></el-table-column>
        <el-table-column prop="disinfection" label="车内消读次数" width=""></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    handleSelect(key, keyPath) {
      /* eslint-disable */
      console.log(key, keyPath);
    },
    queryAll() {
      var that = this
      fetch('http://localhost:3000/api/queryAll',{
          method:'POST'
        }).then(function(response) {
          console.log(response)
          return response.json();
      }).then(function(data) {
        console.log(data);
        that.tableData = data
      }).catch(function(e) {
        console.log(e);
      });
    }
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    const two = [{"phoneNo":"13222225555q","remark":"123","plateNo":"测试2","milage":"2","wax":"1","wash":"1","polish":"119","disinfection":"69"},{"phoneNo":"18551649003","remark":"remark","plateNo":"苏A11111","milage":"111","wax":11156,"wash":22228,"polish":333338,"disinfection":123128}]
    // let tableData
    return {
      tableData: [],
      activeIndex: '1'
    }
  },
  created: function () {
    console.log(this.activeIndex)
    this.queryAll()
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<template>
  <el-main>
    <el-row>
      <el-form :label-position="labelPosition" label-width="120px" :model="formDetail">
        <el-form-item label="手机号码"><el-input v-model="formDetail.phoneNo" style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="车牌号"><el-input v-model="formDetail.plateNo" style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="公里数"><el-input v-model="formDetail.milage" style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="打蜡次数">
          <el-input v-model="formDetail.wax" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="精洗次数">
          <el-input v-model="formDetail.wash" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="抛光次数">
          <el-input v-model="formDetail.polish" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="车内消毒次数">
          <el-input v-model="formDetail.disinfection" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="备注"><el-input v-model="formDetail.remark" style="width: 300px;"></el-input></el-form-item>
      <el-button type="warning" @click="add()">新增</el-button>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    /* eslint-disable */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.querySingle()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val
    },
    handleSelect(key, keyPath) {
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
        // that.total = data.length
        that.pageIndex = 1
      }).catch(function(e) {
        console.log(e);
      });
    },
    querySingle() {
      console.log(this.numberValidateForm.phone)
      let postData = this.$qs.stringify({
          "phoneNo" : this.numberValidateForm.phone
      });
      this.$axios({
          method: 'post',
          url: 'http://localhost:3000/api/query',
          data: postData
      }).then((res)=>{
          console.log(res.data)
          this.formDetail.phoneNo = res.data.phoneNo
          this.formDetail.remark = res.data.remark
          this.formDetail.plateNo = res.data.plateNo
          this.formDetail.milage = res.data.milage
          this.formDetail.wax = res.data.wax
          this.formDetail.wash = res.data.wash
          this.formDetail.polish = res.data.polish
          this.formDetail.disinfection = res.data.disinfection
      });
    },
    add() {
      let postData = this.$qs.stringify({
          "phoneNo" : this.formDetail.phoneNo,
          "remark" : this.formDetail.remark,
          "plateNo" : this.formDetail.plateNo,
          "milage" : this.formDetail.milage,
          "wax" : this.formDetail.wax,
          "wash" : this.formDetail.wash,
          "polish" : this.formDetail.polish,
          "disinfection" : this.formDetail.disinfection
      });
      this.$axios({
          method: 'post',
          url: 'http://localhost:3000/api/add',
          data: postData
      }).then((res)=>{
          console.log(res.data)
          if ( !!res.data.success ) {
            this.$message({
              message: res.data.success,
              type: 'success'
            });
          }
          if ( !!res.data.error ) {
            this.$message({
              message: res.data.error,
              type: 'error'
            });
          }
      });
    },
    service( serviceName ) {
      console.log(serviceName)
      let postData = this.$qs.stringify({
          "phoneNo" : this.formDetail.phoneNo
      });
      this.$axios({
          method: 'post',
          url: 'http://localhost:3000/api/' + serviceName,
          data: postData
      }).then((res)=>{
          if ( !!res.data.success ) {
            this.$message.success(res.data.success);
            this.querySingle()
          }
          if ( !!res.data.error ) {
            this.$message.error(res.data.error);
          }
      });
    }
  },
  created: function () {
    console.log(this.activeIndex)
    this.queryAll()
  },
  computed: {
    // 前端过滤
    tables () {
      const search = this.search
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData
    },
    // 总条数
    total () {
      return this.tables.length
    }
  },
  watch: {
   // 检测表格数据过滤变化，自动跳到第一页
    tables () {
      this.pageIndex = 1
    }
  },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      // total: 1,
      pageSize: 10,
      activeIndex: '1',
      numberValidateForm: {
        phone: ''
      },
      labelPosition: 'right',
      formDetail: {
        phoneNo: '',
        remark: '',
        plateNo: '',
        milage: '',
        wax: '',
        wash: '',
        polish: '',
        disinfection: ''
      }
    }
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

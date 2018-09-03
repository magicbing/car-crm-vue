<template>
  <el-main>
    <el-row>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="手机号码" prop="phone"
          :rules="[
            { required: true, message: '手机号码不能为空'},
            { type: 'number', message: '手机号码必须为数字值'}
          ]"
        >
          <el-input type="phone" v-model.number="numberValidateForm.phone" auto-complete="off" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button> -->
          <el-button type="primary" @click="submitForm('numberValidateForm')">查询</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <br><br>
      <el-form :label-position="labelPosition" label-width="120px" :model="formDetail">
        <el-form-item label="手机号码"><el-input v-model="formDetail.phoneNo" readonly style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="车牌号"><el-input v-model="formDetail.plateNo" readonly style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="公里数"><el-input v-model="formDetail.milage" readonly style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="打蜡次数">
          <el-input v-model="formDetail.wax" readonly style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="精洗次数">
          <el-input v-model="formDetail.wash" readonly style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="抛光次数">
          <el-input v-model="formDetail.polish" readonly style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="车内消毒次数">
          <el-input v-model="formDetail.disinfection" readonly style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="备注"><el-input v-model="formDetail.remark" readonly style="width: 300px;"></el-input></el-form-item>
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
          if ( !!res.data.error ) {
            this.$message.error(res.data.error);
          }
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted: function () {
    console.log(this.$route.query.phoneNo)
    if ( !!this.$route.query.phoneNo ) {
      this.numberValidateForm.phone = Number(this.$route.query.phoneNo)
      this.submitForm('numberValidateForm')
    }
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

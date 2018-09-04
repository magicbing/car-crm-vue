<template>
  <el-main>
    <el-row>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="手机号码" prop="phone"
          :rules="[
            { required: true, message: '手机号码不能为空'}
            /* , { type: 'number', message: '手机号码必须为数字值'} */
          ]"
        >
          <el-input type="phone" v-model="numberValidateForm.phone" auto-complete="off" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button> -->
          <el-button type="primary" @click="submitForm('numberValidateForm')">查询</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <br><br>
      <el-form :label-position="labelPosition" label-width="120px" :model="formDetail">
        <el-form-item label="手机号码"><el-input v-model="formDetail.phoneNo" disabled style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="车牌号"><el-input v-model="formDetail.plateNo" style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="公里数"><el-input v-model="formDetail.milage" style="width: 300px;"></el-input></el-form-item>
        <el-form-item label="打蜡次数">
          <el-input v-model="formDetail.wax" style="width: 300px;"></el-input>
          <el-button type="warning" @click="service('wax')" style="margin-left: 10px;">进行打蜡</el-button>
        </el-form-item>
        <el-form-item label="精洗次数">
          <el-input v-model="formDetail.wash" style="width: 300px;"></el-input>
          <el-button type="warning" @click="service('wash')" style="margin-left: 10px;">进行精洗</el-button>
        </el-form-item>
        <el-form-item label="抛光次数">
          <el-input v-model="formDetail.polish" style="width: 300px;"></el-input>
          <el-button type="warning" @click="service('polish')" style="margin-left: 10px;">进行抛光</el-button>
        </el-form-item>
        <el-form-item label="车内消毒次数">
          <el-input v-model="formDetail.disinfection" style="width: 300px;"></el-input>
          <el-button type="warning" @click="service('disinfection')" style="margin-left: 10px;">进行消毒</el-button>
        </el-form-item>
        <el-form-item label="备注"><el-input v-model="formDetail.remark" style="width: 300px;"></el-input></el-form-item>
        
        <el-button type="primary" @click="gotoDetail()">查看详情</el-button>
        <el-button type="primary" @click="gotoLog()">查看日志</el-button>
        <br><br>
        <el-button type="warning" @click="modify()">修改</el-button>
      </el-form>
    </el-row>
    <br><br><br><br><br>
    <el-row>
      <el-button type="primary" v-on:click="queryAll">刷新查询全部</el-button>
      <el-table :data="tables.slice( (pageIndex-1)*pageSize, pageIndex*pageSize )">
        <el-table-column type="index" label="序号" width=""></el-table-column>
        <el-table-column prop="phoneNo" label="手机号码" width=""></el-table-column>
        <el-table-column prop="plateNo" label="车牌号" width=""></el-table-column>
        <el-table-column prop="milage" label="公里数" width=""></el-table-column>
        <el-table-column prop="wax" label="打蜡次数" width=""></el-table-column>
        <el-table-column prop="wash" label="精洗次数" width=""></el-table-column>
        <el-table-column prop="polish" label="抛光次数" width=""></el-table-column>
        <el-table-column prop="disinfection" label="车内消毒次数" width=""></el-table-column>
        <el-table-column prop="remark" label="备注" width=""></el-table-column>
        <el-table-column label="操作" width="215px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="querySingle(scope.row.phoneNo)">查询</el-button>
            <el-button type="primary" size="mini" @click="gotoDetail(scope.row.phoneNo)">详情</el-button>
            <el-button type="primary" size="mini" @click="gotoLog(scope.row.phoneNo)">日志</el-button>
            <!-- {{ scope.row.operation }} -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 30, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>
  </el-main>
</template>

<script>
import router from './../router'
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
      this.$axios({
          method: 'post',
          url: 'http://localhost:3000/api/queryAll'
      }).then((res)=>{
          console.log(res.data)
          if ( !!res.data.error ) {
            this.$message.error(res.data.error);
          }
          this.tableData = res.data.reverse()
          this.pageIndex = 1
      });
      /* var that = this
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
      }); */
    },
    querySingle(phone) {
      console.log(this.numberValidateForm.phone)
      let postData = this.$qs.stringify({
          "phoneNo" : phone || this.numberValidateForm.phone
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
    modify() {
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
          url: 'http://localhost:3000/api/modify',
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
      function dict (value) {
        var dict = {
          'create': '创建',
          'modify': '修改',
          'wax': '打蜡',
          'wash': '精洗',
          'polish': '抛光',
          'disinfection': '车内消毒'
        }
        return dict[value] || value
      }
      this.$confirm('确定执行 ' + dict(serviceName) + ' 操作吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
              this.querySingle(this.formDetail.phoneNo)
            }
            if ( !!res.data.error ) {
              this.$message.error(res.data.error);
            }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
      /* console.log(serviceName)
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
      }); */
    },
    gotoDetail(phone) {
      router.push({ path: 'detail', query: { phoneNo: phone || this.numberValidateForm.phone } })
    },
    gotoLog(phone) {
      router.push({ path: 'log', query: { phoneNo: phone || this.numberValidateForm.phone } })
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

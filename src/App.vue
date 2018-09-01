<template>
<el-container style="border: 1px solid #eee">
<!-- height: 700px;  -->
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
       <!-- @select="handleSelect" :default-active="activeIndex"  -->
      <el-menu router class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/">查询</el-menu-item>
        <el-menu-item index="/add">新增</el-menu-item>
        <el-menu-item index="/detail">详情</el-menu-item>
        <el-menu-item index="/about">About</el-menu-item>
        <!-- <el-menu-item index="4">修改日志</el-menu-item> -->
      </el-menu>
    </el-header>

    <router-view/>
    
  </el-container>
</el-container>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/add">新增</router-link> |
      <router-link to="/detail">详情</router-link>
    </div>
    <router-view/>
  </div> -->
</template>
<script>
export default {
  methods: {
    /* eslint-disable */
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  data() {
    return {
      activeIndex: '1'
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

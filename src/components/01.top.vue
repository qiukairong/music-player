<template>
  <div class="top">
    <div class="top-left-box">
      <router-link to="/discovery" tag="p">一个LOGO</router-link>
    </div>
    <div class="top-center-box"></div>
    <!-- 搜索组件 -->
    <div class="top-right-box">
      <input
        type="text"
        autocomplete="off"
        placeholder="搜索"
        class="el-input__inner"
        v-model="inputValue"
        @keyup.enter="toSearch"
      />
    </div>
    <el-button type="danger" icon="el-icon-search" round @click="toSearch"
      >搜索</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 输入的内容
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      if (this.inputValue == "") {
        this.$message.warning("请输入内容");
      } else {
        // 携带数据
        this.$router.push(`/result?keyWord=${this.inputValue}`);
      }
    },
  },
};
</script>

<style>
.top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: #f9f9f9;
}

.top .top-center-box {
  width: 70%;
}

.top .top-left-box {
  color: white;
  border: 1px solid #ef5350;
  background-color: #ef5350;
  line-height: 30px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
}

.top .top-input {
  width: 200px;
}
</style>
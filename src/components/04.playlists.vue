<template>
  <div>
    <!-- 顶部 -->
    <div class="jingpin-box">
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="jingpin-img-box">
        <img :src="topList.coverImgUrl" alt="" width="180px" height="180px" />
      </div>
      <div class="jingpin-txt-box">
        <p class="jingpin-txt-box-title">精品歌单</p>
        <h2>{{ topList.name }}</h2>
        <p class="jingpin-txt-box-text">
          {{ topList.description }}
        </p>
      </div>
    </div>
    <!-- 中间 -->
    <div class="jinpin-middle">
      <a href="#" :class="{ actived: tag == '全部' }" @click="tag = '全部'"
        >全部</a
      >
      <a href="#" :class="{ actived: tag == '欧美' }" @click="tag = '欧美'"
        >欧美</a
      >
      <a href="#" :class="{ actived: tag == '华语' }" @click="tag = '华语'"
        >华语</a
      >
      <a href="#" :class="{ actived: tag == '流行' }" @click="tag = '流行'"
        >流行</a
      >
      <a href="#" :class="{ actived: tag == '说唱' }" @click="tag = '说唱'"
        >说唱</a
      >
      <a href="#" :class="{ actived: tag == '摇滚' }" @click="tag = '摇滚'"
        >摇滚</a
      >
      <a href="#" :class="{ actived: tag == '民谣' }" @click="tag = '民谣'"
        >民谣</a
      >
      <a href="#" :class="{ actived: tag == '电子' }" @click="tag = '电子'"
        >电子</a
      >
      <a href="#" :class="{ actived: tag == '轻音乐' }" @click="tag = '轻音乐'"
        >轻音乐</a
      >
      <a
        href="#"
        :class="{ actived: tag == '影视原声' }"
        @click="tag = '影视原声'"
        >影视原声</a
      >
      <a href="#" :class="{ actived: tag == 'ACG' }" @click="tag = 'ACG'"
        >ACG</a
      >
      <a href="#" :class="{ actived: tag == '怀旧' }" @click="tag = '怀旧'"
        >怀旧</a
      >
      <a href="#" :class="{ actived: tag == '治愈' }" @click="tag = '治愈'"
        >治愈</a
      >
      <a href="#" :class="{ actived: tag == '旅行' }" @click="tag = '旅行'"
        >旅行</a
      >
    </div>
    <!-- 底部歌单列表 -->
    <div class="jinpin-bottom">
      <div class="jinpin-bottom-box" v-for="(item, index) in list" :key="index">
        <div class="jinpin-bottom-img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="jinpin-bottom-txt">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="jinpin-bottomlist">
      <el-pagination
        @current-change="handleCurrentChange"
        :background="true"
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="10"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//导入axios
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      // 顶部推荐歌单
      topList: {},
      //底部歌单列表
      list: [],
      //当前选中
      tag: "全部",
      //底部列表条数
      total: 10000,
      // 当前页码
      page: 1,      
    };
  },
  //侦听器
  watch: {
    tag() {
      this.topData();
      this.listData();
      //切换歌单后显示第一页
      this.page = 1;
    },
  },
  created() {
    //顶部精品歌单
    this.topData();
    //底部精品推荐歌单列表
    this.listData();
  },
  methods: {
    //抽取顶部数据方法
    topData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.tag,
        },
      }).then((res) => {
        this.topList = res.data.playlists[0];
      });
    },
    //抽取底部数据方法
    listData() {
      axios({
        url: "https://autumnfish.cn/top/playlist",
        method: "get",
        params: {
          limit: 10,
          offset: (this.page - 1) * 10,
          cat: this.tag,
        },
      }).then((res) => {
        this.list = res.data.playlists;
        this.total = res.data.total;
      });
    },
    //页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页：${val}`);
      this.page = val;
      this.listData();
    },
  },
};
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  background-repeat: no-repeat;
  filter: blur(20px);
}

.jingpin-box {
  width: 1200px;
  height: 260px;
  margin: 30px 50px;
  background-color: black;
  position: relative;
}

.jingpin-img-box {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 40px;
  left: 40px;
}

.jingpin-txt-box {
  position: absolute;
  top: 20px;
  left: 250px;
}

.jingpin-txt-box-title {
  width: 100px;
  height: 30px;
  border: 1px yellow solid;
  border-radius: 5px;
  color: yellow;
  line-height: 30px;
  text-align: center;
}

.jingpin-txt-box h2 {
  color: white;
  font-weight: normal;
  margin: 10px 0;
}

.jingpin-txt-box-text {
  width: 900px;
  height: 120px;
  overflow: hidden;
  color: lightgray;
  font-size: small;
}

.jinpin-middle {
  margin: 20px 80px;
  float: left;
}

.jinpin-middle a {
  text-decoration: none;
  margin-left: 30px;
  font-size: 14px;
  color: #000;
}

/* 选中高亮 */
.jinpin-middle > .actived {
  color: red;
}

.jinpin-bottom {
  margin: 0 100px;
  clear: both;
}

.jinpin-bottom-box {
  float: left;
  margin: 10px;
}

.jinpin-bottom-img img {
  width: 200px;
  height: 200px;
}

.jinpin-bottom-txt {
  width: 200px;
  height: 35px;
  font-size: small;
  overflow: hidden;
}

.jinpin-bottomlist {
  clear: both;
}

.jinpin-bottomlist .el-pagination {
  margin-left: 400px;
}

.jinpin-bottomlist .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: red;
  color: #FFF;
}

.jinpin-bottomlist .el-pagination.is-background .el-pager li:hover{
  color:red;
}


</style>
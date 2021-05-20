<template>
  <div class="mvs-container">
    <!-- 分类切换 -->
    <div class="mvs-top">
      <div class="mvs-classify">
        <span class="title">地区:</span>
        <span
          class="item"
          :class="{ actived: area == '全部' }"
          @click="area = '全部'"
          >全部</span
        >
        <span
          class="item"
          :class="{ actived: area == '港台' }"
          @click="area = '港台'"
          >港台</span
        >
        <span
          class="item"
          :class="{ actived: area == '欧美' }"
          @click="area = '欧美'"
          >欧美</span
        >
        <span
          class="item"
          :class="{ actived: area == '日本' }"
          @click="area = '日本'"
          >日本</span
        >
        <span
          class="item"
          :class="{ actived: area == '韩国' }"
          @click="area = '韩国'"
          >韩国</span
        >
      </div>
      <div class="mvs-classify">
        <span class="title">类型:</span>
        <span
          class="item"
          :class="{ actived: type == '官方版' }"
          @click="type = '官方版'"
          >官方版</span
        >
        <span
          class="item"
          :class="{ actived: type == '原声' }"
          @click="type = '原声'"
          >原声</span
        >
        <span
          class="item"
          :class="{ actived: type == '现场版' }"
          @click="type = '现场版'"
          >现场版</span
        >
        <span
          class="item"
          :class="{ actived: type == '网易出品' }"
          @click="type = '网易出品'"
          >网易出品</span
        >
      </div>
      <div class="mvs-classify">
        <span class="title">排序:</span>
        <span
          class="item"
          :class="{ actived: order == '上升最快' }"
          @click="order = '上升最快'"
          >上升最快</span
        >
        <span
          class="item"
          :class="{ actived: order == '最热' }"
          @click="order = '最热'"
          >最热</span
        >
        <span
          class="item"
          :class="{ actived: order == '最新' }"
          @click="order = '最新'"
          >最新</span
        >
      </div>
    </div>
    <!-- 底部mv -->
    <div class="mvs-bottom">
      <!-- 盒子 -->
      <div class="mvs-box" v-for="(item, index) in lists" :key="index">
        <div class="times">
          <i class="el-icon-caret-right"></i>{{ item.playCount }}
        </div>
        <div class="mvs-img">
          <img :src="item.cover" alt="" />
        </div>
        <div class="singer-name">{{ item.artistName }}</div>
        <div class="mvs-text">{{ item.name }}</div>
      </div>
      <!-- 分页 -->
      <div class="mvs-page">
        <el-pagination
          @current-change="handCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
          :limit="limit"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "mvs",
  data() {
    return {
      // 默认总条数
      total: 1000,
      // 页码
      page: 1,
      //取出数量
      limit: 8,
      // 地区
      area: "全部",
      // 类型
      type: "官方版",
      // 排序
      order: "上升最快",
      // 请求的数据
      lists: [],
    };
  },
  methods: {
    getLists() {
      axios({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          // 取出的数量
          limit: this.limit,
          // 偏移量
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        this.lists = res.data.data;
        //过滤播放次数
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i].playCount > 100000) {
            this.lists[i].playCount = `${parseInt(
              this.lists[i].playCount / 100000
            )}万`;
          }
        }
        // 保存总条数
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },
    handCurrentChange(val) {
      this.page = val;
      this.getLists();
    },
  },
  created() {
    this.getLists();
  },
  watch: {
    area() {
      this.page = 1;
      this.getLists();
    },
    type() {
      this.page = 1;
      this.getLists();
    },
    order() {
      this.page = 1;
      this.getLists();
    },
  },
};
</script>

<style scoped>
.mvs-container {
  margin: 0 80px;
}
.mvs-top {
  margin: 30px 0;
}

.mvs-top .mvs-classify {
  margin: 25px 0;
}

.mvs-top .mvs-classify .title {
  margin: 0 10px;
  font-weight: bold;
}

.mvs-top .mvs-classify .item {
  color: gray;
  margin: 0 10px;
  border-radius: 15px;
  padding: 3px 20px;
  cursor: pointer;
}

.mvs-top .mvs-classify .actived {
  background-color: #ffcdd2;
  color: #f44336;
}

.mvs-bottom {
  display: flex;
  flex-wrap: wrap;
}

/*底部盒子 */
.mvs-bottom .mvs-box {
  width: 250px;
  /* height: 250px; */
  margin: 0 20px 10px 0;
  position: relative;
  cursor: pointer;
}
.mvs-bottom .mvs-box .times {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 5px 0 0;
  padding: 2px 6px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

.mvs-bottom .mvs-box .mvs-img img {
  width: 250px;
  height: 150px;
  border-radius: 5px;
}

.mvs-bottom .mvs-box .singer-name {
  color: #424242;
}

.mvs-bottom .mvs-box .mvs-text {
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  color: gray;
}

/* 分页样式 */
.mvs-bottom .mvs-page {
  margin: 20px auto;
}


</style>
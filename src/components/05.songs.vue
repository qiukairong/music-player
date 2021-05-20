<template>
  <div class="songs-container">
    <!-- 顶部新歌 -->
    <div class="songs-top">
      <span class="item" :class="{ active: tag == 0 }" @click="tag = 0"
        >全部</span
      >
      <span class="item" :class="{ active: tag == 7 }" @click="tag = 7"
        >华语</span
      >
      <span class="item" :class="{ active: tag == 96 }" @click="tag = 96"
        >欧美</span
      >
      <span class="item" :class="{ active: tag == 8 }" @click="tag = 8"
        >日本</span
      >
      <span class="item" :class="{ active: tag == 16 }" @click="tag = 16"
        >韩国</span
      >
    </div>
    <!-- 底部table、 -->
    <div class="songs-bottom">
      <table class="el-table">
        <thead>
          <th></th>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </thead>
        <tbody>
          <tr class="music-column el-table__row" v-for="(item, index) in lists" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <div class="img-wrap">
                <img :src="item.album.picUrl" alt="" />
                <i @click="playMusic(item.id)" class="el-icon-video-play"></i>
              </div>
            </td>
            <td>
              <span>{{ item.name }}</span>
            </td>
            <td>
              <span>{{ item.album.artists["0"].name }}</span>
            </td>
            <td>
              <span>{{ item.album.name }}</span>
            </td>
            <td>
              <span>{{ item.duration }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "songs",
  data() {
    return {
      //歌曲列表
      lists: [],
      //分类
      tag: "0",
    };
  },
  methods: {
    // 获取音乐数据
    getLists() {
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        this.lists = res.data.data;
        //过滤时间
        for (let i = 0; i < this.lists.length; i++) {
          let duration = this.lists[i].duration;
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.lists[i].duration = `${min}:${sec}`;
        }
      });
    },
    //播放歌曲方法
    playMusic(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: { id },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicUrl = url;
      });
    },
  },
  watch: {
    tag() {
      this.getLists();
    },
  },
  created() {
    this.getLists();
  },
};
</script>

<style>
.active {
  color: red;
}
.songs-top {
  margin: 20px 100px;
  display: flex;
  justify-content: flex-end;
}

.songs-top .item {
  margin: 5px 10px;
  cursor:pointer;
}

/* 底部 */
.songs-bottom {
  margin: 0 100px;
  display: flex;
  width: 80%;
}

.songs-bottom .el-table .music-column{
  transition: background-color 0.5s;
}

.songs-bottom .el-table .music-column:hover{
  background-color: #eeeeee;
}

.songs-bottom .el-table .img-wrap {
  margin: 0 20px;
  position: relative;
}
/* 播放按钮 */
.songs-bottom .el-table .img-wrap .el-icon-video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: rgba(255, 255, 255, 0.6);
  cursor:pointer;
}

.songs-bottom .el-table .img-wrap:hover .el-icon-video-play {
  color: white;
}

.songs-bottom .el-table .img-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
</style>
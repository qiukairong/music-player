<template>
  <div class="result">
    <!-- 搜索结果 -->
    <div class="result-top">
      <h2 class="title">{{ $route.query.keyWord }}</h2>
      <p class="item">共搜索到{{ count }}条结果</p>
    </div>
    <!-- 搜索内容 -->
    <div class="result-bottom">
      <el-tabs v-model="activeName">
        <!-- 歌曲 -->
        <el-tab-pane label="歌曲" name="songs">
          <table class="el-table">
            <thead>
              <th></th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </thead>
            <tbody>
              <tr
                class="el-table__row"
                v-for="(item, index) in songLists"
                :key="index"
                @dblclick="playMusic(item.id)"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <!-- p17 15:30二级标题 -->
                <td>{{ item.artists[0].name }}</td>
                <td>{{ item.album.name }}</td>
                <td>{{ item.duration }}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <!-- 歌单 -->
        <el-tab-pane label="歌单" name="lists">
          <div class="lists-item">
            <!-- 盒子 -->
            <div
              class="item-box"
              v-for="(item, index) in playLists"
              :key="index"
            >
              <div class="img-box">
                <span class="img-text">播放量:{{ item.playCount }}</span>
                <img :src="item.coverImgUrl" alt="" />
              </div>
              <div class="item-text">{{ item.name }}</div>
            </div>
          </div>
        </el-tab-pane>
        <!-- MV -->
        <el-tab-pane label="MV" name="mvs">
          <div class="mvs-box">
            <div class="mvs-item" v-for="(item, index) in mvLists" :key="index">
              <div class="play-box">
                <div class="play-count">
                  <i class="el-icon-view"></i>{{ item.playCount }}
                </div>
                <img :src="item.cover" alt="" />
                <div class="play-time">{{ item.duration }}</div>
              </div>
              <div class="mvs-name">{{ item.name }}</div>
              <div class="mvs-text">{{ item.artistName }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>

    <!-- <img src="../assets/07.result.png" alt="" width="1500px"> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      //默认搜索歌曲
      activeName: "songs",
      // 保存拿到的歌曲数据
      songLists: [],
      // 保存拿到的歌单数据
      playLists: [],
      // 保存拿到的mv数据
      mvLists: [],
      //搜索到歌曲数目
      count: 0,
    };
  },
  methods: {
    playMusic(id) {
      // console.log(id);
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

  //侦听
  watch: {
    activeName() {
      //默认进入的搜索界面
      let type = 1;

      //默认获取数量
      let limit = 10;
      switch (this.activeName) {
        case "songs":
          type = 1;
          limit = 10;
          break;
        case "lists":
          type = 1000;
          limit = 10;
          break;
        case "mvs":
          type = 1004;
          limit = 12;

          break;

        default:
          break;
          }
          axios({
            url: "https://autumnfish.cn/search",
            method: "get",
            params: {
              keywords: this.$route.query.keyWord,
              type: type,
              // 获取数据量
              limit: limit,
            },
          }).then((res) => {
            //歌曲逻辑1歌单逻辑1000mv1004
            if (type == 1) {
              this.songLists = res.data.result.songs;
              this.count = res.data.result.songCount;
              // 歌曲时间过滤
              for (let i = 0; i < this.songLists.length; i++) {
                let min = parseInt(this.songLists[i].duration / 1000 / 60);
                if (min < 10) {
                  min = `0${min}`;
                }
                let sec = parseInt((this.songLists[i].duration / 1000) % 60);
                if (sec < 10) {
                  sec = `0${sec}`;
                }
                this.songLists[i].duration = `${min}:${sec}`;
              }
            } else if (type == 1000) {
              //保存歌单
              this.playLists = res.data.result.playlists;
              //搜索条数
              this.count = res.data.result.playlistCount;

              // 播放次数过滤器
              for (let i = 0; i < this.playLists.length; i++) {
                if (this.playLists[i].playCount > 100000) {
                  this.playLists[i].playCount =
                    parseInt(this.playLists[i].playCount / 10000) + "万";
                }
              }
            } else {
              // 保存MV
              this.mvLists = res.data.result.mvs;

              this.count = res.data.result.mvCount;

              //播放时长过滤
              for (let i = 0; i < this.mvLists.length; i++) {
                let min = parseInt(this.mvLists[i].duration / 1000 / 60);
                if (min < 10) {
                  min = "0" + min;
                }
                let sec = parseInt((this.mvLists[i].duration / 1000) % 60);
                if (sec < 10) {
                  sec = "0" + sec;
                }
                this.mvLists[i].duration = min + ":" + sec;
              }

              // 播放次数过滤器
              for (let i = 0; i < this.mvLists.length; i++) {
                if (this.mvLists[i].playCount > 100000) {
                  this.mvLists[i].playCount =
                    parseInt(this.mvLists[i].playCount / 10000) + "万";
                }
              }
            }
          });
      
    },
  },
  created() {
    // 组件拿到url参数列表数据
    // console.log(this.$route.query.keyWord);

    // getResult();
    axios({
      url: "https://autumnfish.cn/search",
      method: "get",
      params: {
        keywords: this.$route.query.keyWord,
        type: 1,
        // 获取数据量
        limit: 10,
      },
    }).then((res) => {
      //歌曲逻辑
      this.songLists = res.data.result.songs;
      this.count = res.data.result.songCount;
      // 歌曲时间过滤
      for (let i = 0; i < this.songLists.length; i++) {
        let min = parseInt(this.songLists[i].duration / 1000 / 60);
        if (min < 10) {
          min = `0${min}`;
        }
        let sec = parseInt((this.songLists[i].duration / 1000) % 60);
        if (sec < 10) {
          sec = `0${sec}`;
        }
        this.songLists[i].duration = `${min}:${sec}`;
      }
    });
  },
};
</script>

<style>

.result{
  padding: 20px;
}
/* 底部大盒子 */
.result-bottom .lists-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 50px;
}

/* 小盒子 */
.result-bottom .lists-item .item-box {
  position: relative;
  margin: 10px;
}

/* 播放量 */
.result-bottom .lists-item .item-box .img-text {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1px 5px;
  color: white;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.3);
}

/* 歌单封面图片 */
.result-bottom .lists-item .item-box .img-box img {
  width: 200px;
  height: 200px;
}

.result-bottom .lists-item .item-box .item-text {
  width: 200px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*MV样式*/
.result-bottom .mvs-box {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 50px;
}

.result-bottom .mvs-box .mvs-item {
  margin: 0 30px;
  width: 220px;
}

.mvs-box .mvs-item .play-box {
  position: relative;
}
/* 播放数 */
.mvs-box .mvs-item .play-box .play-count {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: aliceblue;
  padding: 1px 5px;
}
/* MV时长 */
.mvs-box .mvs-item .play-box .play-time {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: aliceblue;
  padding: 1px 5px;
}

.mvs-box .mvs-item .play-box img {
  width: 100%;
}
</style>
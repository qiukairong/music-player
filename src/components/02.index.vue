<template>
  <div class="index">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery" tag="p">
            <i class="el-icon-thumb"></i>发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists" tag="p">
            <i class="el-icon-picture"></i>推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs" tag="p">
            <i class="el-icon-headset"></i>最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs" tag="p"
            ><i class="el-icon-video-camera-solid"></i>最新mv
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src="musicUrl" autoplay="autoplay" controls="controls"></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      musicUrl: "",
    };
  },
};
</script>

<style>
.index {
  display: flex;
}
.index .nav {
  min-width: 200px;
  background-color: #ededed;
}
.index .nav li {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #ef5350;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.index .nav li:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.main {
  height: 100%;
  width: 1000px;
  background-color: white;
  flex: 1;
}

/* 播放器盒子 */
.player {
  position: fixed;
  bottom: 0;
}

.index .player audio {
  height: 60px;
}
</style>
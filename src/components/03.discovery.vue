<template>
  <div>
    <div class="lunbo-box">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <img :src="item.imageUrl" alt="" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tuijian-box">
      <h1>推荐歌单</h1>
      <div class="dis-box"  v-for="(item,index) in result" :key="index">
        <div class="dis-text" v-text="item.copywriter" v-show="isShow"></div>           
          <div class="img-box">
            <img :src="item.picUrl" alt="" width="180px" height="180px">
          </div>
        <p class="dis-name" v-text="item.name" style="color:black"></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      isShow:true,
      //轮播图
      banners:[],
      //推荐歌单
      result:[],
    }
  },
  created(){
      //轮播图
    axios({
      url:"https://autumnfish.cn/banner",
      method:"get",
    }).then(res=>{
      this.banners = res.data.banners
    });
      //推荐歌单
    axios({
      url:"https://autumnfish.cn/personalized",
      method:"get",
      params:{
        limit:10
      }
    }).then(res=>{
      this.result = res.data.result;
    });
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .lunbo-box{
    margin: 10px 50px;
  }

  .tuijian-box{
    margin: 0 100px;
  }

  .dis-box{
    /* display: flex; */
    margin: 50px 10px;
    float: left;
    width: 180px;
    height: 180px;
    background-color: #fff;
    position: relative;

  }
    
  .dis-box .dis-text{
    width: 100%;
    height: 0px;
    overflow: hidden;
    background-color: rgba(0,0,0,.3);
    color: white;
    position: absolute;
    transition: height 0.5s;
  }

  .dis-box:hover .dis-text{
    height: 42px;
  }
</style>
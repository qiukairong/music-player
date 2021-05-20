<template>
  <div>
    <top class="top"></top>
    <index></index>
  </div>
</template>

<script>
import top from './components/01.top.vue';
import index from './components/02.index';

export default {
  components:{
    top,
    index
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
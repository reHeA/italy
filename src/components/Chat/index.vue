<template>
  <div class="header"></div>
  <div class="iconWraapper" @click="getUp">
    <i class="iconfont icon-dianzan" />
    <div class="iconTitle">{{ upNum }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background-image: url('../../assets/header.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
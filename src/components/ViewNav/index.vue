<template>
  <div class="viewNav">
    <div>
      <div class="iconWraapper" @click="goBack">
        <i class="iconfont icon-home1" />
        <div class="iconTitle">云游意大利</div>
      </div>
      <div class="iconWraapper" @click="changeShow">
        <i class="iconfont icon-menu" />
        <div class="iconTitle">场景选择</div>
      </div>
      <div class="iconWraapper">
        <i class="iconfont icon-vedio" />
        <div class="iconTitle">VR宣传片</div>
      </div>
    </div>
    <div>
      <div class="iconWraapper" @click="getDetail">
        <i class="iconfont icon-jianjie" />
        <div class="iconTitle">简介</div>
      </div>
      <div class="iconWraapper" @click="getUp">
        <i class="iconfont icon-dianzan" />
        <div class="iconTitle">{{ upNum }}</div>
      </div>
      <div class="iconWraapper">
        <i class="iconfont icon-view" />
        <div class="iconTitle">{{ viewNum }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {useRoute,useRouter} from 'vue-router' 
const router = useRouter()
const goBack = () => {
  router.push('/map')
};
const $emit = defineEmits(['getShow'])
const upNum = ref<number>(0);

const viewNum = ref<number>(0);

const changeShow = () =>{
  $emit('getShow')
}
</script>

<style scoped>
.viewNav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 1;
  padding: 8px;
  box-sizing: border-box;
}
.iconWraapper {
  color: #fff;
  font-size: 16px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 8px;
}
.iconTitle {
  font-size: 8px;
  margin-top: 8px;
}
</style>
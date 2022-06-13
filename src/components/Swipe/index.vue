<template>
  <div class="swipe">
    <van-swipe :loop="false" :width="120" :height="84" :initial-swipe="0" :show-indicators="false" ref="swipe">
      <van-swipe-item v-for="(item, index) in viewData" :key="index" @click="changeView(item, index)">
        <div class="imgBox" :style="{ border: index == fouceNum ? '2px solid #fff' : 'none' }">
          <img :src="item.scenic_cover" alt="" class="viewImg" />
          <div class="name">{{item.scenic_name}}</div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { getScenic } from '@/api/user';
const viewData = ref<any>([]);
const fouceNum = ref<number>(0);
const swipe = ref<any>();
onMounted(() => {
  getData();
});
const getData = async () => {
  getScenic({ city_id: localStorage.getItem('id') }).then((res: any) => {
    if (res) {
      viewData.value = res.data;
    }
  });
};
const $emit = defineEmits(['getCover']);
const changeView = (item: any, index: any) => {
  fouceNum.value = index;
  swipe.value.swipeTo(index == 0 ? index : index - 1, '');
  $emit('getCover', item);
};
</script>
<style scoped>
.swipe {
  width: 100%;
  height: 102px;
  position: fixed;
  bottom: 10%;
  z-index: 1;
  padding: 8px;
  box-sizing: border-box;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  overflow: auto;
}
.swipe::-webkit-scrollbar {
  display: none;
}
.imgBox {
  width: 100%;
  height: 78px;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
}
.viewImg {
  width: 100%;
  height: 78px;
}
.name{
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translate(-50%,0);
  font-size: 10px;
  color: #fff;
  width: 120px;
  text-align: center;
}
>>> .van-swipe-item {
  margin-right: 24px;
}
</style>
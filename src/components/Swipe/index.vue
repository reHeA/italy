<template>
  <div class="swipe">
    <van-swipe :loop="false" :width="140" :height="80" :initial-swipe="3" :show-indicators="false" ref="swipe">
      <van-swipe-item v-for="(item, index) in viewData" :key="index" @click="changeView(index)">
        <div class="imgBox" :style="{ border: fouceNum == index ? '2px solid #fff' : 'none' }">
          <img :src="item.url" alt="" class="viewImg" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const viewData = ref<any>([]);
const fouceNum = ref<number>(0);
const swipe = ref<any>();
onMounted(() => {
  viewData.value = [
    { url: require('@/assets/style/image/viewList/thumb (1).jpg') },
    { url: require('@/assets/style/image/viewList/thumb (2).jpg') },
    { url: require('@/assets/style/image/viewList/thumb (3).jpg') },
    { url: require('@/assets/style/image/viewList/thumb.jpg') },
    { url: require('@/assets/style/image/viewList/thumb (1).jpg') },
    { url: require('@/assets/style/image/viewList/thumb (2).jpg') },
    { url: require('@/assets/style/image/viewList/thumb (3).jpg') }
  ];
});
const changeView = (val: number) => {
  fouceNum.value = val;
  swipe.value.swipeTo(val == 0 ? val : val - 1, '');
};
</script>

<style scoped>
.swipe {
  width: 100%;
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
.view {
  width: 120px;
  height: 80px;
  overflow: hidden;
  margin-right: 8px;
  box-sizing: border-box;
}
.imgBox{
    width: 120px;
  height: 120px;
  overflow: hidden;
  box-sizing: border-box;
  
}
.viewImg {
  width: 120px;
  height: 120px;
}
</style>
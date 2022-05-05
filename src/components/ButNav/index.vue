<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import View from './View.vue';
const dialogShow = ref<boolean>(false);
const upNum = ref<number>(0);
const hasUp = ref<boolean>(false);
const hasView = ref<boolean>(false);
const viewNum = ref<number>(0);
const title = ref();
const getUp = () => {
  if (hasUp.value) {
    return false;
  } else {
    upNum.value += 1;
    localStorage.setItem('upNum', upNum.value.toString());
    hasUp.value = true;
  }
};
const getView = () => {
  if (!hasView.value) {
    viewNum.value += 1;
    hasView.value = true;
  } else {
    return false;
  }
};
const getDetail = () => {
  dialogShow.value = true;
  title.value = '123';
};
onMounted(() => {
  getView();
  if (localStorage.getItem('upNum') == null) {
    localStorage.setItem('upNum', '0');
  } else {
    upNum.value = Number(localStorage.getItem('upNum'));
  }
});
</script>

<template>
  <div class="nav">
    <div>
      <div class="iconWraapper" @click="getVedio">
        <i class="iconfont icon-vedio" />
        <div class="iconTitle">vr宣传片</div>
      </div>
      <div class="iconWraapper" @click="getJie">
        <i class="iconfont icon-home" />
        <div class="iconTitle">意起过节</div>
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
  <View
    :dialog="dialogShow"
    :title="title"
    @close="
      () => {
        dialogShow = false;
      }
    "
  />
</template>



<style scoped>
.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 1;
  padding: 16px;
  box-sizing: border-box;
}
.iconWraapper {
  color: #fff;
  font-size: 16px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 16px;
}
.iconTitle {
  font-size: 12px;
  margin-top: 8px;
}
</style>
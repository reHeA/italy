<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import Video from '@/components/Video/index.vue';
import View from './View.vue';
import { getCountry, Give, getInsert } from '@/api/user';

const dialogShow = ref<boolean>(false);
const upNum = ref<number>(0);
const hasUp = ref<boolean>(false);
const hasView = ref<boolean>(false);
const viewNum = ref<number>(0);
const title = ref();
const show = ref<boolean>(false);
const src = ref<string>('');
const content = ref<any>();
const giveParams = reactive({
  type: 1,
  give_id: 1
});
const InserParams = reactive({
  type: 1,
  browse_id: 1
});
const getUp = () => {
  Give(giveParams).then((res: any) => {
    if (res) {
      upNum.value = res.give;
    }
  });
};
const getView = () => {
  getInsert(InserParams).then((res: any) => {
    if (res) {
      viewNum.value = res.browse;
    }
  });
};
const getDetail = () => {
  dialogShow.value = true;
  title.value = '一部手机云游意大利';
};
onMounted(() => {
  getView();
  getValue();
});

const getVedio = () => {
  show.value = true;
};
const getValue = () => {
  getCountry().then((res: any) => {
    if (res) {
      src.value = res.data[0].country_video;
      content.value = res.data[0].country_brief;
      upNum.value = res.data[0].give;
    }
  });
};
</script>

<template>
  <div class="nav">
    <div>
      <div class="iconWraapper" @click="getVedio">
        <i class="iconfont icon-vedio" />
        <div class="iconTitle">VR宣传片</div>
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
    :content="content"
    @close="
      () => {
        dialogShow = false;
      }
    "
  />
  <Video
    :show="show"
    @close="
      () => {
        show = false;
      }
    "
    :src="src"
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
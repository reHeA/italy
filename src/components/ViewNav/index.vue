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
      <div class="iconWraapper" @click="showVideo">
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
import { onMounted, ref, watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Give, getInsert } from '@/api/user';
const src = ref<string>('');
const show = ref<boolean>(false);
const router = useRouter();
const goBack = () => {
  router.push('/map');
};
const giveParams = reactive({
  type: 2,
  give_id: 0
});
interface p {
  giveId: any;
  upVal: number;
}
const props = withDefaults(defineProps<p>(), {
  upVal: 0,
  giveId: null
});
const InserParams = reactive({
  type: 2,
  browse_id: null
});
watch(
  () => props,
  (newVal, oldVal) => {
    upNum.value = newVal.upVal;
    giveParams.give_id = newVal.giveId;
    InserParams.browse_id = newVal.giveId;
  getView();

  },
  { deep: true }
);
onMounted(() => {
});
const $emit = defineEmits(['getShow', 'cityView', 'showVideo']);
const upNum = ref<number>(0);
const viewNum = ref<number>(0);
const showVideo = () => {
  $emit('showVideo');
};
const changeShow = () => {
  $emit('getShow');
};
const getDetail = () => {
  $emit('cityView');
};
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
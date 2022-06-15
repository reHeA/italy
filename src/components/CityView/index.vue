<template>
  <van-config-provider :theme-vars="themeVars">
    <van-image-preview
      v-model:show="show"
      :images="images"
      @change="onChange"
      @Close="close"
      :loop="true"
      closeable
      :swipeDuration="300"
    >
      <template #index></template>
      <template #cover>
        <div class="brief" v-show="isShow">
          <img :src="imgSrc" alt="" class="viewImg" />
        </div>
        <div class="nav">
          <div>
            <div class="iconWraapper" @click="toMap">
              <img src="@/assets/view.png" alt="" style="width: 20px; height: 20px" />
              <div class="iconTitle">全景意大利</div>
            </div>
            <div class="iconWraapper" @click="toGo">
              <i class="iconfont icon-home" />
              <div class="iconTitle">景点选择</div>
            </div>
          </div>
          <div>
            <!-- <div class="iconWraapper" @click="getDetail">
              <i class="iconfont icon-jianjie" />
              <div class="iconTitle">简介</div>
            </div> -->
            <div class="iconWraapper" @click="getUp">
              <i class="iconfont icon-dianzan" />
              <div class="iconTitle">{{ upNum }}</div>
            </div>
          </div>
        </div>
      </template>
    </van-image-preview>
  </van-config-provider>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { Give } from '@/api/user';
import { number } from 'echarts';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const isShow = ref<boolean>(false);
const show = ref<boolean>(false);
const index = ref<number>(0);
const upNum = ref<number>(0);
interface p {
  viewShow: boolean;
  imgList: any;
  upVal: any;
  giveId: any;
  briefContent?: string;
  breifTitle?: string;
}
const imgSrc = ref<string>();
const $emit = defineEmits(['closeView', 'getData']);
const props = withDefaults(defineProps<p>(), {
  viewShow: false,
  imgList: [],
  upVal: 0,
  giveId: null,
  briefContent: '',
  breifTitle: ''
});
const getDetail = () => {
  isShow.value = !isShow.value;
};
const giveParams = reactive({
  type: 2,
  give_id: null
});
const themeVars = {
  PopupBackgroundColor: '#000'
};
const toMap = () => {
  router.push('/map');
};
const toGo = () => {
  if (isShow.value) {
    isShow.value = false;
  }
  $emit('closeView');
};
watch(
  () => props.viewShow,
  (newVal, oldVal) => {
    show.value = newVal;
    images.value = props.imgList;
    upNum.value = props.upVal;
    giveParams.give_id = props.giveId;
    imgSrc.value = props.briefContent.split('"')[1];
  }
);
const images = ref<any[]>([]);
const onChange = (newIndex: number) => {
  index.value = newIndex;
};
const getUp = () => {
  Give(giveParams).then((res: any) => {
    if (res) {
      upNum.value = res.give;
    }
  });
};
const close = () => {
  $emit('closeView');
  $emit('getData');
};
</script>

<style scoped>
>>>.van-image-preview__swipe-item{
  overflow: auto;
}
>>> .van-image-preview {
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
}
>>>.van-image-preview__image--vertical{
  height: unset;
}
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
.brief {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #fff;
  top: 50%;
  transform: translate(0, -50%);
  overflow: auto;
}

.header {
  text-align: center;
  font-size: 0.37333rem;
  padding: 0.16rem 0;
  position: fixed;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 12px;
  font-weight: bolder;
  letter-spacing: 2px;
  width: 100%;
  line-height: 20px;
  height: 440px;
}
.viewImg {
  width: 100%;
  /* height: 100%; */
  /* background-size: 100% 100%; */
}
/* .content {
  font-size: 12px;
  font-weight: bold;
  padding: 8px 8px;
  line-height: 20px;
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 100%;
} */
</style>
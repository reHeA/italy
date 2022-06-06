<template>
  <div id="panorama" ref="panor"></div>
  <Swipe v-if="show" @getCover="getCover" />
  <ViewNav @getShow="getShow" @cityView="cityView" :upVal="upVal" :giveId="giveId" :src="src" @showVideo="showVideo" />
  <CItyView
    :viewShow="viewShow"
    :imgList="imgList"
    @closeView="closeView"
    @getData="getDataList"
    :upVal="upVal"
    :giveId="giveId"
  />
  <Video
    :show="videoShow"
    @close="
      () => {
        videoShow = false;
      }
    "
    :src="src"
  />
</template>
<script lang="ts" setup>
import { getCity, getScenic } from '@/api/user';
import Video from '@/components/Video/index.vue';
import CItyView from '@/components/CityView/index.vue';
import Swipe from '@/components/Swipe/index.vue';
import ViewNav from '../../components/ViewNav/index.vue';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
const imageCover = ref<any>(require('../../assets/style/image/test1.jpg'));
const swipeData = ref<any[]>();
const show = ref<boolean>(false);
const panor = ref<any>(null);
const viewShow = ref<boolean>(false);
const imgList = ref<any[]>([]);
const giveId = ref<number>();
const src = ref<string>();
const videoShow = ref<boolean>(false);
// const loadMainJScript = () => {
//   const script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.src = './../js/pannellum.js';
//   document.body.appendChild(script);
//   script.onload = () => {
//     showVr();
//   };
// };
const ScenicParams = reactive({
  city_id: 2
});
const upVal = ref<number>();
const getShow = () => {
  show.value = !show.value;
};
const cityView = () => {
  viewShow.value = true;
};
const closeView = () => {
  viewShow.value = false;
};
const showVideo = () => {
  videoShow.value = true;
};
onMounted(() => {
  showVr();
  getDataList();
  getScenicData();
});
const getScenicData = async () => {
  await getScenic(ScenicParams).then((res: any) => {
    if (res) {
      swipeData.value = res.data;
    }
  });
};
const getDataList = async () => {
  await getCity().then((res: any) => {
    if (res) {
      imgList.value = res.data[1].city_back_imgs;
      upVal.value = res.data[1].give;
      giveId.value = res.data[1].id;
      src.value = res.data[1].city_video;
      localStorage.setItem('id', res.data[1].id);
    }
  });
};
const getCover = (val: any) => {
  imageCover.value = val.scenic_images;
};
watch(
  () => imageCover.value,
  (newVal, oldVal) => {
    if (newVal) {
      showVr();
    }
  }
);
// loadMainJScript();
const showVr = () => {
  panor.value = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: 'http://api.italyvirtualtour.cn/scenic/scenic_images/202205/8ee5cf6f14c0813f2ee5e2ba43ea3407.jpg',
    autoLoad: true,
    showControls: false,
    pitch: 2.3,
    yaw: -135.4,
    hfov: 120,
    hotSpots: [
      {
        pitch: 10.1,
        yaw: 1.5,
        type: 'info',
        text: 'Baltimore Museum of Art',
        URL: 'https://artbma.org/'
      },
      {
        pitch: -9.4,
        yaw: 222.6,
        type: 'info',
        text: 'Art Museum Drive'
      },
      {
        pitch: -0.9,
        yaw: 144.4,
        type: 'info',
        text: 'North Charles Street'
      }
    ]
    // preview: '/images/tocopilla-preview.jpg'
  });
};
</script>

<style scoped>
#pannellum {
  width: 600px;
  height: 400px;
}
</style>
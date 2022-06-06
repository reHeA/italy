<template>
  <div id="panorama" ref="panor" @mousedown="toView"></div>
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
const imageCover = ref<any>();
const swipeData = ref<any[]>([]);
const show = ref<boolean>(false);
const panor = ref<any>(null);
const viewShow = ref<boolean>(false);
const imgList = ref<any[]>([]);
const giveId = ref<number>();
const src = ref<string>();
const videoShow = ref<boolean>(false);
const isCity = ref<boolean>(false);
const ScenicParams = reactive({
  city_id: 2
});
const upVal = ref<number>();
const getShow = () => {
  show.value = !show.value;
};
const cityView = () => {
  if (isCity.value) {
    isCity.value = false;
    getDataList();
    viewShow.value = true;
  } else {
    viewShow.value = true;
  }
};
const closeView = () => {
  viewShow.value = false;
};
const showVideo = () => {
  videoShow.value = true;
};
const toView = (val: any) => {
  swipeData.value.map((item: any) => {
    if (val.toElement.innerHTML == item.scenic_name) {
      isCity.value = true;
      imgList.value = item.scenic_back_imgs;
      viewShow.value = true;
    }
  });
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
      imageCover.value = res.data[0].scenic_images;
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
const removeDom = () => {
  const dom: HTMLElement | null = document.getElementById('panorama');
  if (dom?.hasChildNodes()) {
    dom.removeChild(dom.childNodes[0]);
  }
};
watch(
  () => imageCover.value,
  (newVal, oldVal) => {
    if (newVal) {
      removeDom();
      removeDom();
      showVr();
    }
  }
);
const showVr = () => {
  panor.value = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: imageCover.value,
    autoLoad: true,
    autoRotate: -2,
    showControls: false,
    pitch: 5.3,
    yaw: -135.4,
    hfov: 120,
    hotSpots: [
      {
        pitch: 10.1,
        yaw: 1.5,
        type: 'info',
        cssClass: 'custom-hotspot',
        createTooltipFunc: hotspot,
        createTooltipArgs: '花之圣母大教堂'
      },
      {
        pitch: 0.4,
        yaw: 89,
        type: 'info',
        cssClass: 'custom-hotspot',
        createTooltipFunc: hotspot1,
        createTooltipArgs: '圣十字大教堂'
      }
      // {
      //   pitch: -0.9,
      //   yaw: 144.4,
      //   type: 'info',
      //   text: 'North Charles Street'
      // }
    ]
    // preview: '/images/tocopilla-preview.jpg'
  });
};
const hotspot = (hotSpotDiv: any, args: any) => {
  hotSpotDiv.classList.add('custom-tooltip');
  var span = document.createElement('span');
  var img = document.createElement('img');
  span.innerHTML = args;
  hotSpotDiv.appendChild(span);
  hotSpotDiv.appendChild(img);
  span.style.fontSize = 12 + 'px';
  span.style.color = '#fff';
  span.style.width = span.scrollWidth - 20 + 'px';
  span.style.padding = 4 + 'px';
  span.style.background = 'darkgray';
  span.style.borderRadius = 6 + 'px';
  img.style.width = '100%';
  img.style.height = 40 + 'px';
  img.src = '';
};
const hotspot1 = (hotSpotDiv: any, args: any) => {
  hotSpotDiv.classList.add('custom-tooltip');
  var span = document.createElement('span');
  var img = document.createElement('img');
  span.innerHTML = args;
  hotSpotDiv.appendChild(span);
  hotSpotDiv.appendChild(img);
  span.style.fontSize = 12 + 'px';
  span.style.color = '#fff';
  span.style.width = span.scrollWidth - 20 + 'px';
  span.style.padding = 4 + 'px';
  span.style.background = 'darkgray';
  span.style.borderRadius = 6 + 'px';
  img.style.width = '100%';
  img.style.height = 40 + 'px';
  img.src = '';
};
</script>

<style scoped>
#pannellum {
  width: 600px;
  height: 400px;
}
.custom-hotspot {
  height: 50px;
  width: 50px;
  color: #fff;
}
div.custom-tooltip span {
  visibility: hidden;
  position: absolute;
  border-radius: 3px;
  background-color: #fff;
  color: #fff;
  text-align: center;
  max-width: 200px;
  padding: 5px 10px;
  margin-left: -220px;
  cursor: default;
}
div.custom-tooltip:hover span {
  visibility: visible;
}
div.custom-tooltip:hover span:after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
  bottom: -20px;
  left: -10px;
  margin: 0 50%;
  color: #fff;
}
</style>
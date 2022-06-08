<template>
  <div id="panorama" ref="panor" @mousedown="toView" @scenechangefadedone="scenechange"></div>
  <Swipe v-if="show" @getCover="getCover" />
  <ViewNav @getShow="getShow" @cityView="cityView" :upVal="upVal" :giveId="giveId" :src="src" @showVideo="showVideo" />
  <CItyView
    :viewShow="viewShow"
    :imgList="imgList"
    @closeView="closeView"
    @getData="getDataList"
    :upVal="upVal"
    :giveId="giveId"
    :breifTitle="breifTitle"
    :briefContent="briefContent"
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
const breifTitle = ref<string>('');
const briefContent = ref<string>('');
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
const cityIndex = ref<any>(0);
const upVal = ref<number>();
const getShow = () => {
  show.value = !show.value;
};
const hostList = ref<any>([]);
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
      breifTitle.value = item.scenic_name;
      briefContent.value = item.scenic_brief;
      viewShow.value = true;
    }
  });
};
const scenechange = (id: any) => {
  console.log(id, 'val');
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
      breifTitle.value = res.data[1].city_name;
      briefContent.value = res.data[1].city_brief;
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
    default: {
      firstScene: 'mikailangqiluo',
      // author: 'Matthew Petroff',
      sceneFadeDuration: 1000,
      autoLoad: true,
      autoRotate: -2
    },
    scenes: {
      circle: {
        // title: 'Mason Circle',
        hfov: 30,
        pitch: -3,
        yaw: 117,
        type: 'equirectangular',
        panorama: imageCover.value,
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
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '圣十字大教堂',
            sceneId: 'house'
          }
        ]
      },

      house: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//shizi.jpg'),
        hotSpots: [
          {
            pitch: 10.1,
            yaw: 1.5,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '圣十字大教堂'
          },
          {
            pitch: -0.6,
            yaw: 37.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '领主广场',
            sceneId: 'lingzhu',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      lingzhu: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//lingzhu.jpg'),
        hotSpots: [
          {
            pitch: 185,
            yaw: -60,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '领主广场'
          },
          {
            pitch: 160,
            yaw: -20,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '佛罗伦萨露天博物馆'
          },
          {
            pitch: 190,
            yaw: 37.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '比斯广场',
            sceneId: 'bisi',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      bisi: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//bisi.jpg'),
        hotSpots: [
          {
            pitch: 180,
            yaw: 35,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '佣兵凉廊'
          },
          {
            pitch: -10,
            yaw: -15,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '佛罗伦萨老桥',
            sceneId: 'laoqiao',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      laoqiao: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//laoqiao.jpg'),
        hotSpots: [
          {
            pitch: 180.6,
            yaw: 2.1,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '佛罗伦萨老桥'
          },
          {
            pitch: -0.6,
            yaw: 85.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '切利尼雕像',
            sceneId: 'qielini',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      qielini: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//qielini.jpg'),
        hotSpots: [
          {
            pitch: -0.6,
            yaw: 4.1,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '切利尼雕像'
          },
          {
            pitch: -10.6,
            yaw: 87.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '米开朗基罗广场',
            sceneId: 'mikailangqiluo',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      mikailangqiluo: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//mikailangqiluo.jpg'),
        hotSpots: [
          {
            pitch: -0.6,
            yaw: -5.1,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '大卫铜像'
          },
        ]
      },
      city: {
        hfov: 20,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//city.jpg'),
        hotSpots: [
          {
            pitch: -0.6,
            yaw: 37.1,
            type: 'scene',
            text: 'Mason Circle',
            sceneId: 'boboli',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      boboli: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//boboli.jpg'),
        hotSpots: [
          {
            pitch: -0.6,
            yaw: 37.1,
            type: 'scene',
            text: 'Mason Circle',
            sceneId: 'pigyin',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      pigyin: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//pigyin.jpg'),
        hotSpots: [
          {
            pitch: -0.6,
            yaw: 37.1,
            type: 'scene',
            text: 'Mason Circle',
            sceneId: 'art',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      art: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//art.jpg'),
        hotSpots: [
          {
            pitch: -0.6,
            yaw: 37.1,
            type: 'scene',
            text: 'Mason Circle',
            sceneId: 'big',
            targetYaw: -23,
            targetPitch: 2
          }
        ]
      },
      big: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/img//big.jpg'),
        hotSpots: [
          {
            // pitch: -0.6,
            // yaw: 37.1,
            // type: 'scene',
            // text: 'Mason Circle',
            // sceneId: 'circle',
            // targetYaw: -23,
            // targetPitch: 2
          }
        ]
      }
    }
    // type: 'equirectangular',
    // panorama: imageCover.value,
    // autoLoad: true,
    // autoRotate: -2,
    // showControls: false,
    // pitch: 5.3,
    // yaw: -135.4,
    // hfov: 120,
    // hotSpots: [
    //   {
    //     pitch: 10.1,
    //     yaw: 1.5,
    //     type: 'info',
    //     cssClass: 'custom-hotspot',
    //     createTooltipFunc: hotspot,
    //     createTooltipArgs: '花之圣母大教堂'
    //   },
    //   {
    //     pitch: 0.4,
    //     yaw: 89,
    //     type: 'info',
    //     cssClass: 'custom-hotspot',
    //     createTooltipFunc: hotspot1,
    //     createTooltipArgs: '圣十字大教堂'
    //   }
    // ]
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
  img.src = 'http://www.italyvirtualtour.cn/img/new_spotd8_gif.png';
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
const changeScenes = (hotSpotDiv: any, args: any) => {
  console.log(args, 'args');
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
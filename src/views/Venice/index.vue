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
const MusicPlay = ref<any>();
const MusicPlay1 = ref<any>();
const MusicPlay2 = ref<any>();
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
  city_id: 1
});
const ScenceView = ref<any>(12);
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
    if (val.toElement.innerHTML.split('：')[1] == item.scenic_name) {
      isCity.value = true;
      imgList.value = item.scenic_back_imgs;
      breifTitle.value = item.scenic_name;
      briefContent.value = item.scenic_brief;
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
      // imageCover.value = res.data[0].scenic_images;
    }
  });
};
const getDataList = async () => {
  await getCity().then((res: any) => {
    if (res) {
      imgList.value = res.data[0].city_back_imgs;
      upVal.value = res.data[0].give;
      giveId.value = res.data[0].id;
      src.value = res.data[0].city_video;
      breifTitle.value = res.data[0].city_name;
      briefContent.value = res.data[0].city_brief;
      localStorage.setItem('id', res.data[0].id);
    }
  });
};
const getCover = (val: any) => {
  ScenceView.value = val.id;
  removeDom();
  removeDom();
  showVr();
};
const removeDom = () => {
  const dom: HTMLElement | null = document.getElementById('panorama');
  if (dom?.hasChildNodes()) {
    dom.removeChild(dom.childNodes[0]);
  }
};
const showVr = () => {
  panor.value = pannellum.viewer('panorama', {
    default: {
      firstScene: ScenceView.value,
      sceneFadeDuration: 1000,
      autoLoad: true,
      autoRotate: -2
    },
    scenes: {
      12: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/venvie/shengfang.jpg'),
        hotSpots: [
          {
            pitch: 150,
            yaw: -80,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：圣方济会荣耀圣母教堂'
          },
          {
            pitch: 0,
            yaw: 35,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '圣马可教堂',
            sceneId: 13,
            targetYaw: -23,
            targetPitch: 5
          }
        ]
      },
      13: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/venvie/shengmake.jpg'),
        hotSpots: [
          {
            pitch: 10.1,
            yaw: -10.5,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：圣马可教堂'
          },
          {
            pitch: 0.1,
            yaw: -20.5,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '圣马可教堂顶',
            sceneId: 14,
            targetYaw: -23,
            targetPitch: 14
          }
        ]
      },
      14: {
        hfov: 30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/venvie/shengguang.jpg'),
        hotSpots: [
          {
            pitch: -10.1,
            yaw: 1.5,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：圣马可教堂顶'
          },
          {
            pitch: 190.6,
            yaw: -87.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '叹息桥',
            sceneId: 15,
            targetYaw: -23,
            targetPitch: 14
          }
        ]
      },
      15: {
        hfov: -30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/venvie/tanxiqiao.jpg'),
        hotSpots: [
          {
            pitch: 165,
            yaw: -180,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：叹息桥'
          },

          {
            pitch: 185,
            yaw: 87.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '总督府',
            sceneId: 16,
            targetYaw: -23,
            targetPitch: 12
          }
        ]
      },
      16: {
        hfov: -30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/venvie/zongdufu.jpg'),
        hotSpots: [
          {
            pitch: 10.1,
            yaw: -5,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '总督府'
          }
          // {
          //   pitch: 0.4,
          //   yaw: 89,
          //   type: 'scene',
          //   cssClass: 'custom-hotspot',
          //   createTooltipFunc: hotspot1,
          //   createTooltipArgs: '圣十字大教堂',
          //   sceneId: 13
          // }
        ]
      }
    }
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
  span.style.padding = 2 + 'px';
  span.style.background = 'rgba(0, 0, 0, 0.7)';
  span.style.borderRadius = 6 + 'px';
  img.style.width = 20 + 'px';
  img.style.height = 20 + 'px';
  img.src = 'http://www.italyvirtualtour.cn/icon/diandian.gif';
  img.style.display = 'block';
  img.style.margin = 'auto';
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
  span.style.padding = 2 + 'px';
  span.style.background = 'rgba(0, 0, 0, 0.7)';
  span.style.borderRadius = 6 + 'px';
  img.style.width = 20 + 'px';
  img.style.height = 10 + 'px';
  img.src = 'http://www.italyvirtualtour.cn/icon/upIcon.gif';
  img.style.display = 'block';
  img.style.margin = 'auto';
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
  background-color: #999;
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
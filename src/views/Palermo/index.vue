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
  city_id: 3
});
const ScenceView = ref<any>(20);
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
    if (val.toElement.innerHTML.split('：')[1] == item.scenic_name || name == item.scenic_name) {
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
      imgList.value = res.data[2].city_back_imgs;
      upVal.value = res.data[2].give;
      giveId.value = res.data[2].id;
      src.value = res.data[2].city_video;
      breifTitle.value = res.data[2].city_name;
      briefContent.value = res.data[2].city_brief;
      localStorage.setItem('id', res.data[2].id);
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
      // firstScene: 28,
      firstScene: ScenceView.value,
      sceneFadeDuration: 1000,
      autoLoad: true,
      autoRotate: -2
    },
    scenes: {
      20: {
        hfov: 80,
        pitch: 10.1,
        yaw: -80,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/sijiao.jpg'),
        hotSpots: [
          {
            pitch: 190,
            yaw: 90,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：四角广场'
          },
          {
            pitch: 0,
            yaw: 95,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：普雷托利亚广场',
            sceneId: 21,
            targetYaw: -23,
            targetPitch: 5
          }
        ]
      },
      21: {
        hfov: 80,
        pitch: 10.1,
        yaw: 180,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/pulei.jpg'),
        hotSpots: [
          {
            pitch: 0,
            yaw: 180,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：普雷托利亚广场'
          },
          {
            pitch: 0,
            yaw: -95,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：海军元帅圣母教堂',
            sceneId: 29,
            targetYaw: -23,
            targetPitch: 5
          }
        ]
      },
      29: {
        hfov: 80,
        pitch: 10.1,
        yaw: 10,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/haijun.jpg'),
        hotSpots: [
          {
            pitch: 10,
            yaw: 0,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：海军元帅圣母教堂'
          },
          {
            pitch: 0,
            yaw: -65,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：巴拉罗市场',
            sceneId: 30,
            targetYaw: -23,
            targetPitch: 5
          }
        ]
      },
      30: {
        hfov: 80,
        pitch: 0,
        yaw: -30,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/balaluo.jpg'),
        hotSpots: [
          {
            pitch: -10,
            yaw: -30,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：巴拉罗市场'
          },
          {
            pitch: -10,
            yaw:150,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：马西莫歌剧院',
            sceneId: 22,
            targetYaw: -23,
            targetPitch: 5
          }
        ]
      },
      22: {
        hfov: 80,
        pitch: 10.1,
        yaw: -190,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/maxi.jpg'),
        hotSpots: [
          {
            pitch: 20,
            yaw: -180,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：马西莫歌剧院'
          },
          {
            pitch: 0,
            yaw: -110,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：武奇利亚市场',
            sceneId: 23,
            targetYaw: -23,
            targetPitch: 5
          }
        ]
      },
      23: {
        hfov: 80,
        pitch: 10.1,
        yaw: -70,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/wuqi.jpg'),
        hotSpots: [
          {
            pitch: -10,
            yaw: -70,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：武奇利亚市场'
          },
          {
            pitch: -20,
            yaw: 80,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：巴勒莫大教堂',
            sceneId: 24,
            targetYaw: -23,
            targetPitch: 5
          }
        ]
      },
      24: {
        hfov: 80,
        yaw: 180.5,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/bada.jpg'),
        hotSpots: [
          {
            pitch: 20.1,
            yaw: 180.5,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：巴勒莫大教堂'
          },
          {
            pitch: -10.1,
            yaw: 60.5,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：齐萨王宫',
            sceneId: 25,
            targetYaw: -23,
            targetPitch: 14
          }
        ]
      },
      25: {
        hfov: 80,
        yaw: -10,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/qisa.jpg'),
        hotSpots: [
          {
            pitch: 20.1,
            yaw: -10,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：齐萨王宫'
          },
          {
            pitch: 190.6,
            yaw: -100.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：诺曼王宫',
            sceneId: 26,
            targetYaw: -23,
            targetPitch: 14
          }
        ]
      },
      26: {
        hfov: -30,
        yaw: 80,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/nuoman.jpg'),
        hotSpots: [
          {
            pitch: 165,
            yaw: -90,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：诺曼王宫'
          },

          {
            pitch: 0,
            yaw:-180,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：帕拉提那礼拜堂',
            sceneId: 27,
            targetYaw: -23,
            targetPitch: 12
          }
        ]
      },
      27: {
        hfov: -30,
        yaw: 5,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/palati.jpg'),
        hotSpots: [
          {
            pitch: 10.1,
            yaw: -5,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：帕拉提那礼拜堂'
          },
                    {
            pitch: 185,
            yaw: -87.1,
            type: 'scene',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot1,
            createTooltipArgs: '由此进入：圣加大教堂',
            sceneId: 28,
            targetYaw: -23,
            targetPitch: 12
          }

        ]
      },
      28: {
        hfov: -30,
        yaw: 150,
        type: 'equirectangular',
        panorama: require('../../assets/balemo/shengruo.jpg'),
        hotSpots: [
          {
            pitch: 10.1,
            yaw: 150,
            type: 'info',
            cssClass: 'custom-hotspot',
            createTooltipFunc: hotspot,
            createTooltipArgs: '点击进入：圣加大教堂'
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
 <template>
  <div id="panorama" ref="panor"></div>
  <Swipe v-if="show" />
  <ViewNav @getShow="getShow" @cityView="cityView" :upVal="upVal" :giveId="giveId" :src="src" @showVideo="showVideo"/>
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
import { getCity,getScenic} from '@/api/user';
import Video from '@/components/Video/index.vue';
import CItyView from '@/components/CityView/index.vue';
import Swipe from '@/components/Swipe/index.vue';
import ViewNav from '../../components/ViewNav/index.vue';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
const show = ref<boolean>(false);
const panor = ref<any>(null);
const viewShow = ref<boolean>(false);
const imgList = ref<any[]>([]);
const giveId = ref<number>();
const src = ref<string>();
const videoShow = ref<boolean>(false)
const loadMainJScript = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://www.italyvirtualtour.cn/js/pannellum.js';
  document.body.appendChild(script);
  script.onload = () => {
    showVr();
  };
};
const ScenicParams = reactive({
  city_id:1
})
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
const showVideo = ()=>{
  videoShow.value = true
}
onMounted(() => {
  getDataList();
  getScenic(ScenicParams)
});

const getDataList = () => {
  getCity().then((res: any) => {
    if (res) {
      imgList.value = res.data[0].city_back_imgs;
      upVal.value = res.data[0].give;
      giveId.value = res.data[0].id;
      src.value = res.data[0].city_video;
      localStorage.setItem('id',res.data[0].id)

    }
  });
};
loadMainJScript();
const showVr = () => {
  panor.value = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: require('../../assets/style/image/test1.jpg'),
    autoRotate: -3,
    autoLoad: true,
    showControls: false,
    pitch: 2.3,
    yaw: -135.4,
    hfov: 120,
    hotSpots: [
      // {
      //   pitch: 10.1,
      //   yaw: 1.5,
      //   type: 'info',
      //   text: 'Baltimore Museum of Art',
      //   URL: 'https://artbma.org/'
      // },
      // {
      //   pitch: -9.4,
      //   yaw: 222.6,
      //   type: 'info',
      //   text: 'Art Museum Drive'
      // },
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
</script>

<style scoped>
#pannellum {
  width: 600px;
  height: 400px;
}
</style>
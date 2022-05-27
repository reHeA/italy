<template>
  <div id="panorama" ref="panor"></div>
  <Swipe v-if="show" />
  <ViewNav @getShow="getShow" />
</template>

<script lang="ts" setup>
import Swipe from '@/components/Swipe/index.vue';
import ViewNav from '../../components/ViewNav/index.vue';
import { onBeforeMount, onMounted, ref } from 'vue';
const show = ref<boolean>(false);
const panor = ref<any>(null);
const loadMainJScript = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'js/pannellum.js';
  document.body.appendChild(script);
  script.onload = () => {
    showVr();
  };
};
const getShow = () => {
  show.value = !show.value;
};
onMounted(() => {
  const box: HTMLCollection | null = document.getElementsByClassName('pnlm-load-box');
  console.log(box.item(0), 'box');
});
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
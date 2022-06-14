<template>
  <van-overlay :show="VideoShow" @click="vedioClose">
    <div class="video">
      <vue3VideoPlay v-bind="options" ref="vedio" />
    </div>
  </van-overlay>
</template>

<script lang="ts" setup>
import videojs from 'video.js';
import { getCountry } from '@/api/user';
import { onMounted, ref, watch, reactive } from 'vue';
import 'vue3-video-play/dist/style.css';
import vue3VideoPlay from 'vue3-video-play';
import { createLogger } from 'vuex';
const player = ref<any>();
const videoRef = ref<any>();
const show = ref<boolean>(false);
const VideoShow = ref<boolean>(false);
const vedio = ref<any>();
interface p {
  show: boolean;
  src: string;
}
const props = withDefaults(defineProps<p>(), {
  show: false,
  src: ''
});
const $emit = defineEmits(['close']);
const options = reactive({
  width: '100%', //播放器高度
  height: '260px', //播放器高度
  color: '#409eff', //主题色
  currentTime: 0,
  speed: true, //关闭进度条拖动
  title: '', //视频名称
  src: '', //视频源
  control: true, //是否显示控制
  controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] //显示所有按钮,
});
watch(
  () => props.show,
  (newVal, oldVal) => {
    VideoShow.value = newVal;
  }
);
watch(
  () => props.src,
  (newVal, oldVal) => {
    options.src = newVal;
  }
);
const vedioClose = () => {
  vedio.value.ended
  $emit('close');
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.video {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}
</style>
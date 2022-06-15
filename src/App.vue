<template>
  <router-view />
  <audio src="http://www.italyvirtualtour.cn/music/backMusic.mp3" ref="MusicPlay" hidden></audio>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const MusicPlay = ref<any>();
onMounted(() => {
  MusicPlay.value.play();
});
</script>
<style >
::-webkit-scrollbar {
  display: none;
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import {useRoute,useRouter} from 'vue-router' 
const router = useRouter()
const changeShow = () => {
  router.push('/map')
};

</script>
<template>
  <van-nav-bar title="Virtual Tour" />
  <div class="italy" @click="changeShow" ></div>
</template>
<style scoped>
.italy {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/style/image/bitly.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
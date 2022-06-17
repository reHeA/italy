<template>
  <div class="header"></div>
  <div v-for="(item, index) in data" :key="index">
    <div class="he">
      <div v-if="item.travel_sex == 1" class="touxiang">
        <van-image round width="1rem" height="1rem" :src="require('../../assets/man.png')" />
      </div>
      <div v-if="item.travel_sex == 2" class="touxiang">
        <van-image round width="1rem" height="1rem" :src="require('../../assets/women.png')" />
      </div>
      <div class="name" >
        {{ item.travel_name }}
      </div>
    </div>
    <div>
      {{ item.travel_content }}
    </div>
  </div>
  <div @click="toAdd">
    <img src="../../assets/add.png" alt="" class="add" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { queryList } from '@/api/user.ts';
const data = ref<any[]>([]);
onMounted(() => {
  queryList().then((res: any) => {
    if (res) {
      data.value = res.data;
    }
  });
});
const router = useRouter();
const toAdd = () => {
  router.push('/chatAdd');
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background-image: url('../../assets/header.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.add {
  width: 48px;
  height: 48px;
  position: fixed;
  bottom: 5%;
  right: 5%;
}
.name{
  font-size: 16px;
  color: #000;
  margin-left: 24px;
  display: inline-block;
  height: 100%;
}
.he{
  width: 100%;
  height: 40px;
}
.touxiang{
display: inline-block;
}
</style>
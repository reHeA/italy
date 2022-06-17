<template>
  <van-nav-bar title="publish" left-text="Back" left-arrow @click-left="onClickLeft" />
  <van-cell-group inset>
    <van-field
      v-model="query.message"
      rows="4"
      autosize
      type="textarea"
      maxlength="200"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-uploader v-model="query.fileList" multiple style="margin-top: 24px" :after-read="afterRead" :max-count="1" />
    <van-field label="性别" placeholder="1" input-align="right" style="margin-top: 24px">
      <template #input>
        <van-radio-group v-model="query.sex" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-button type="primary" block round style="margin-top: 24px" @click="toValue">Submit</van-button>
  </van-cell-group>
</template>
 
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { Uploader, toChat } from '@/api/user.ts';
const query = reactive({
  message: '',
  travel_images: [],
  sex: -1
});
const imgList = ref<string>();
const router = useRouter();
const onClickLeft = () => {
  router.go(-1);
};
const toValue = () => {
  console.log(query);
  let prams = {
    travel_images: imgList.value,
    travel_name: 'test',
    travel_sex: Number(query.sex),
    travel_content: query.message
  };
  toChat(prams).then((res: any) => {
    console.log(res, 'res');
  });
};
const afterRead = (file: any) => {
  var formData = new FormData();
  formData.append('file[]', file.file);
  Uploader(formData).then((res: any) => {
    if (res) {
      imgList.value = res.data;
    }
  });
};
</script>

<style>
</style>
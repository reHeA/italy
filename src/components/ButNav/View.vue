<script lang='ts' setup>
import { Dialog } from 'vant';
import { onBeforeMount, onMounted, ref, watch, computed } from 'vue';
const dialogV = ref<boolean>(false);
interface p {
  dialog: boolean;
  title: string | null;
  content: any;
}
const props = withDefaults(defineProps<p>(), {
  dialog: false,
  title: '',
  content: null
});
watch(
  () => props.dialog,
  (newVal, oldVal) => {
    dialogV.value = newVal;
  }
);
const $emit = defineEmits(['close']);
const themeVars = {
  dialogWidth: '100%',
  dialogBorderRadius: '0px',
  dialogTop: '20%'
};
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <van-dialog
      v-model:show="dialogV"
      :show-confirm-button="false"
      :show-cancel-button="false"
      @close="$emit('close')"
      closeOnClickOverlay
    >
      <template #title> </template>
      <div class="content">
        <img
          src="http://img.italyvirtualtour.cn/country/country_brief/202206/10188a90ebd5d7a427457be14b5b4ea7.jpg"
          alt=""
          style="width: 100%"
        />
      </div>
    </van-dialog>
  </van-config-provider>
</template>


<style scoped>
.content {
  font-size: 12px;
  font-weight: bold;
  line-height: 24px;
  padding: 16px;
  width: 100%;
  height: 550px;
  overflow: auto;
  box-sizing: border-box;
}
</style>
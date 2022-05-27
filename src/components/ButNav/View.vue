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
      :title="title"
      :show-confirm-button="false"
      :show-cancel-button="false"
      @close="$emit('close')"
      closeOnClickOverlay
    >
      {{ content }}
    </van-dialog>
  </van-config-provider>
</template>


<style scoped>
</style>
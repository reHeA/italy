<script lang='ts' setup>
import { Dialog } from 'vant';
import { onBeforeMount, onMounted, ref, watch, computed } from 'vue';
interface p {
  dialog: boolean;
  title: string | null;
}
const props = withDefaults(defineProps<p>(), {
  dialog: false,
  title: ''
});
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
      v-model:show="dialog"
      title="一部手机云游意大利"
      :show-confirm-button="false"
      :show-cancel-button="false"
      @close="$emit('close')"
      closeOnClickOverlay
      class="dialog"
    >
      <!-- {{ title }} -->
    </van-dialog>
  </van-config-provider>
</template>


<style scoped>
  .dialog .vant-dialog{
      top: 25%;
  }
</style>
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button,Tab, Tabs, Cell, NavBar, Dialog,Uploader, ConfigProvider, Swipe, SwipeItem, Overlay, ImagePreview, Field, CellGroup, RadioGroup, Radio,Image as VanImage  } from 'vant'; //按需引入
// 引入全局样式
import '@/assets/style/index.less';
// 移动端适配
import 'amfe-flexible';
import '@/assets/iconfonts/iconfont.css'
const app = createApp(App);
//引用vant
app.use(Tab).use(Tabs).use(Cell).use(NavBar).use(Dialog).use(ConfigProvider).use(Swipe).use(SwipeItem).use(Overlay).use(ImagePreview);
app.use(Field);
app.use(CellGroup);
app.use(Uploader);
app.use(Button);
app.use(Radio);
app.use(RadioGroup);
app.use(VanImage);
app.use(store).use(router).mount('#app');
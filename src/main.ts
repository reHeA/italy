import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Tab, Tabs, Cell, NavBar, Dialog,ConfigProvider, Swipe, SwipeItem } from 'vant'; //按需引入
// 引入全局样式
import '@/assets/style/index.less';
// 移动端适配
import 'amfe-flexible';
import '@/assets/iconfonts/iconfont.css'
const app = createApp(App);
//引用vant
app.use(Tab).use(Tabs).use(Cell).use(NavBar).use(Dialog).use(ConfigProvider).use(Swipe).use(SwipeItem);
app.use(store).use(router).mount('#app');

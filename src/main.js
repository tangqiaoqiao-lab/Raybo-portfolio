import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import scrambleText from './directives/scrambleText';

const app = createApp(App);

app.use(router);
app.directive('scramble', scrambleText);

app.mount('#app');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Toasted from 'vue-toasted';
import VueScrollTo from 'vue-scrollto';
import VModal from 'vue-js-modal';

const moment = require('moment');
require('moment/locale/vi');
moment.locale('vi');
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

import router from './router';

Vue.config.productionTip = false;

Vue.use(require('vue-moment'), {
  moment
});

Vue.use(Toasted);
Vue.use(VueScrollTo);

Vue.use(VueMaterial);
Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


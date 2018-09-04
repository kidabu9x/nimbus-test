// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Toasted from 'vue-toasted';
import VueScrollTo from 'vue-scrollto';
const Moment = require('moment')
require('moment/locale/vi');
Moment.locale('vi');
import { MdButton, MdIcon, MdApp, MdDrawer, MdSteppers, MdToolbar, MdMenu, MdList, MdContent, MdTable, MdAutocomplete, MdField, MdDialog, MdDialogConfirm, MdEmptyState, MdCard, MdSubheader, MdTooltip, MdRipple, MdCheckbox, MdRadio, MdDivider, MdProgress, MdAvatar } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

import router from './router';

Vue.config.productionTip = false;
Vue.use(require('vue-moment'), {
  Moment
});
Vue.use(Toasted);
Vue.use(VueScrollTo);

Vue.use(MdButton);
Vue.use(MdApp);
Vue.use(MdDrawer);
Vue.use(MdToolbar);
Vue.use(MdIcon);
Vue.use(MdContent);
Vue.use(MdList);
Vue.use(MdTable);
Vue.use(MdAutocomplete);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdDialog);
Vue.use(MdEmptyState);
Vue.use(MdTooltip);
Vue.use(MdRipple);
Vue.use(MdCheckbox);
Vue.use(MdRadio);
Vue.use(MdDivider);
Vue.use(MdDialogConfirm);
Vue.use(MdSteppers);
Vue.use(MdCard);
Vue.use(MdProgress);
Vue.use(MdSubheader);
Vue.use(MdAvatar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


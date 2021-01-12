// Old dirty browser support
import 'babel-polyfill';
// Import stylesheet
import './scss/app.scss';

import './icons.js';
import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import trans from './trans';
import moment from 'moment';
import 'moment/locale/ar';
import 'moment/locale/ku';
import BootstrapVue from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Popup from './components/Popup.vue';
import Currency from './components/Currency.vue';

import VueMeta from 'vue-meta';
Vue.use(VueMeta);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.prototype.trans = trans;
Vue.directive('scroll', {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    };
    window.addEventListener('scroll', f);
  }
});
Vue.prototype.moment = timestamp =>
  moment(timestamp)
    .locale(store.state.locale.locale)
    .utcOffset(60)
    .fromNow();
Vue.prototype.$moment = date => moment(date);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('currency', Currency);
Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.eventSetDrag = function() {
      el.setAttribute('data-dragging', 'yes');
    };
    el.eventClearDrag = function() {
      el.removeAttribute('data-dragging');
    };
    el.eventOnClick = function(event) {
      var dragging = el.getAttribute('data-dragging');
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener('touchstart', el.eventClearDrag);
    document.addEventListener('touchmove', el.eventSetDrag);
    document.addEventListener('click', el.eventOnClick);
    document.addEventListener('touchend', el.eventOnClick);
  },
  unbind: function(el) {
    document.removeEventListener('touchstart', el.eventClearDrag);
    document.removeEventListener('touchmove', el.eventSetDrag);
    document.removeEventListener('click', el.eventOnClick);
    document.removeEventListener('touchend', el.eventOnClick);
    el.removeAttribute('data-dragging');
  }
});

new Vue({
  router,
  store,
  created: () => {},
  mounted() {
    // store.dispatch('locale/setLocale', { isRoute: false });
  },
  render: h => h(App)
}).$mount('#app');

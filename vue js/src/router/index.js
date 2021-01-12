import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import routes from './routes';
import _ from 'lodash';
import qs from 'qs';
import RouterView from './RouterView.vue';
class Router extends VueRouter {
  // resolve(to, current, append) {
  //   const route = { ...to };
  //   let lang = store.getters['locale/routeLang'];
  //   route.params = { ...route.params, lang: lang != 'en' ? lang : null };
  //   return super.resolve(route, current, append);
  // }
}
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/:lang?',
    //   component: RouterView,
    //   children: [...routes]
    // },
    ...routes,
    // ...routes,

    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.name == 'international') {
      return { x: 0, y: 0 };
    }

    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ selector: to.hash, offset: { x: 0, y: -50 } });
        }, 700);
      });
    } else {
      return window.scrollTo({ top: 0, behavior: 'smooth' });
      // return { x: 0, y: 0 };
    }
  },
  stringifyQuery(query) {
    var result = qs.stringify(query, { encode: false });

    return result ? '?' + result : '';
  },
  parseQuery: query => {
    return qs.parse(query);
  }
});
const languages = ['ar', 'en', 'ku'];
// This callback runs before every route change, including on page load.
router.beforeEach(function(to, from, next) {
  // window.scrollTo({ top: 0, behavior: 'smooth' });
  const is_authenticated = store.state.auth.authenticated;

  const requires_auth = to.matched.some(route =>
    _.get(route, 'meta.auth', false)
  );

  if (requires_auth == true && is_authenticated == false) {
    if (from.hash == '') {
      return next({ name: 'SignIn' });
    }
    return next(false);
  }
  let widgetPath = to.path;
  let nextParams = null;

  store.dispatch('widgets/clear');
  store.dispatch('errors/clear');
  store.dispatch('widgets/fetch', widgetPath);
  if (nextParams) {
    next(nextParams);
    return;
  }
  next();
});

// Register global after hooks. Cannot affect the navigation
router.afterEach((to, from) => {});
router.beforeResolve((to, from, next) => {
  next();
});
export default router;

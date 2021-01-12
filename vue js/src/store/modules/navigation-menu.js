import api from '../../api';
import http from '../../http';
import { arrayToTree } from 'performant-array-to-tree';
import trans from '../../trans';

const formatSlug = val => {
  return val.replace(/-/g, '_');
};

import _ from 'lodash';
const state = {
  navigation: {},
  loading: false
};
const getters = {
  tree(state, getters, rootState) {
    return slug => {
      const loc = _.get(rootState, 'locale.locale', 'en');
      const code = loc.slice(0, 2);
      if (!state.navigation[slug]) return [];
      let nav = _.cloneDeep(state.navigation[slug]);
      nav = nav.map(item => {
        let path = _.get(item, 'link.path', null);
        let params = _.get(item, 'link.params', null);
        _.each(params, (v, k) => {
          path = path.replace(`:${k}`, v);
        });
        if (code != 'en' && path) path = `/${code}` + path;
        item.path = path;
        let slug = formatSlug(item.slug);
        item.name = trans(`nav.${slug}`, null, item.name);
        //item.name = slug;
        return item;
      });
      const tree = arrayToTree(nav, {
        id: 'uuid',
        parentId: 'parent_uuid',
        dataField: null
      });
      return tree;
    };
  }
};

const actions = {
  fetch(context, slug) {
    context.commit('applyLoading', true);
    let promise = api.navigation.fetch(slug);
    promise
      .then(response => {
        context.commit('applyFetched', {
          data: response.data.items,
          slug
        });
        context.commit('applyLoading', false);
      })
      .catch(e => {
        context.commit('applyLoading', false);
      });
    return promise;
  },
  fetchWidgetMenu(context, slug) {
    let promise = api.navigation.fetch(slug);
    return promise;
  }
};

const mutations = {
  applyLoading(state, status) {
    state.loading = status;
  },
  applyFetched(state, data) {
    let navigation = { ...state.navigation };
    navigation[data.slug] = data.data;
    state.navigation = navigation;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

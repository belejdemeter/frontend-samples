import _ from 'lodash';
import { getField, updateField } from 'vuex-map-fields';
import api from '../../../api/index';

const initial = {
  variants: [],
  hasVariants: false,
};
const state = {
  variants: [],
  hasVariants: false,
  schema: [],
  instance: {},
};
const getters = {
  getField,
  variants: (state) => _.get(state, 'variants', []),

  // formated: state => {
  //   let vars = _.get(state, 'variants', []);
  //   return vars.map(item => {
  //     item.values.forEach(val => {
  //       item[val.id] = val.value;
  //     });
  //     delete item.values;
  //     if (item.images) {
  //       item.images = item.images.map(img => {
  //         return { uuid: img.uuid };
  //       });
  //     } else {
  //       item.images = [];
  //     }

  //     return item;
  //   });
  // }
};

const actions = {
  store(context) {
    let instance = { ...context.state.instance };
    let variants = _.cloneDeep(context.state.variants);
    instance.variants = variants;
    let promise = null;
    context.commit('attempt', true);
    if (instance.uuid) {
      promise = api.product.updateProduct(instance.uuid, instance);
    } else {
      promise = api.product.addProduct(instance);
    }

    context.dispatch('errors/clear', null, { root: true });

    return promise
      .then((response) => {
        context.commit('attempt', false);
        // context.dispatch('getProductEdit', response.data.uuid);
      })
      .catch((err) => {
        context.commit('attempt', false);
      });
  },
  putVariant(context, variant) {
    context.commit('putVariant', variant);
  },
  putSchema(context, schema) {
    context.commit('putSchema', _.cloneDeep(schema));
  },
  removeVariant(context, uuid) {
    context.commit('removeVariant', uuid);
  },
  setHasVariants(context, value) {
    context.commit('setHasVariants', value);
  },
  setVariants(context, variants) {
    let variantsInstance = _.cloneDeep(context.state.variants);

    variants.forEach((item) => {
      let variant = {};
      variant.uuid = item.uuid;
      variant.images = item.images.map((img) => ({
        uuid: img.uuid,
        img: img.sm,
      }));
      variant.sku = item.sku;
      item.attributes.forEach((attr) => {
        variant[attr.slug] = attr.value.value;
      });
      variantsInstance.push(variant);
    });
    console.log(variantsInstance);
    context.commit('setVariants', variantsInstance);
  },
  clear(context) {
    context.commit('clear');
  },
  setValues(context, payload) {
    let instance = _.cloneDeep(context.state.instance);
    let schema = _.cloneDeep(payload.schema);
    let product = _.cloneDeep(payload.product);
    schema.forEach((item) => {
      if (product[item.id]) {
        if (item.id == 'base_price') {
          instance[item.id] = product[item.id].amount;
        } else if (item.id == 'images') {
          instance[item.id] = product[item.id].map((img) => {
            return {
              uuid: img.uuid,
              img: img.sm,
            };
          });
        } else {
          instance[item.id] = product[item.id];
        }
      }
    });
    context.commit('updateInstance', instance);
  },
};

const mutations = {
  updateField,
  putVariant(state, variant) {
    let variants = state.variants.slice();

    let cur = variants.findIndex((item) => item.uuid == variant.uuid);
    if (cur != -1) {
      variants[cur] = variant;
    } else {
      variants.push(variant);
    }

    state.variants = variants;
  },
  removeVariant(state, uuid) {
    let variants = state.variants.slice();

    state.variants = variants.filter((item) => {
      return item.uuid != uuid;
    });
  },
  setHasVariants(state, value) {
    state.hasVariants = value;
  },
  setVariants(state, variants) {
    state.variants = variants ? variants : [];
  },
  clear(state) {
    state.variants = [];
    state.instance = {};
  },
  updateInstance(state, instance) {
    state.instance = instance;
  },
  putSchema(state, schema) {
    //state.instance = instance;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import api from '../../api/index';
import _ from 'lodash';
import instance from './forms/productAdd';

const state = {
  attempting: false,
  errors: false,
  schema: [],
  product: {},
  variants: [],

  attributes: [],
};
const getters = {
  groupedSchema: (state) => {
    let schema = [...state.schema];
    let grouped = {};
    schema.forEach((item) => {
      if (!grouped[item.group]) {
        grouped[item.group] = [item];
      } else {
        grouped[item.group].push(item);
      }
    });
    return grouped;
  },
  steps: (state, getters) => {
    let grouped = getters['groupedSchema'];
    let steps = [
      'variants',
      'condition',
      'category',
      'general',
      'price',
      'specification',
      'description',
      'images',
    ];
    steps = steps.filter((item) => {
      return grouped[item];
    });
    return steps;
  },
  variantSteps() {
    let steps = ['general', 'images'];
    return steps;
  },
  variantsSchema() {
    let schema = [...state.schema];
    let grouped = {
      general: [
        {
          id: 'sku',
          value: '',
          type: 'text',
          presentation: 'text',
        },
      ],
      images: [
        {
          id: 'images',
          value: [],
        },
      ],
    };
    schema.forEach((item) => {
      if (item.group == 'variants') {
        if (!grouped['general']) {
          grouped['general'] = [item];
        } else {
          grouped['general'].push(item);
        }
      }
    });
    return grouped;
  },
  uuid: (state) => {
    return _.get(state, 'product.uuid', null);
  },
  stats: (state) => _.get(state, 'product.stats', null),
  schemaHasVariants: (state) => {
    let schema = _.get(state, 'productSchema', []);
    let result = _.find(schema, ['group', 'variants']);
    return result ? true : false;
  },

  allVariants: (state) => {
    return _.get(state, 'product.variants', []);
  },

  variantsTable: (state, getters) => {
    //  let variants = _.get(state, 'product.variants', []);
    let variants = _.get(state, 'instance.variants', []);
    let groupedSchema = getters['groupedSchema'];
    let schema = groupedSchema['variants'];

    let res = [];
    variants.forEach((item) => {
      let variant = {};

      variant.uuid = item.uuid;
      variant.values = [];
      for (const key in item) {
        if (key != 'uuid' && key != 'images') {
          let field = schema.find((item) => item.id == key);
          if (field) {
            let name = field.name;
            let valueText = null;
            if (field.options) {
              let option = field.options.find((opt) => opt.value == item[key]);
              valueText = option.title;
            } else {
              valueText = item[key];
            }
            variant.values.push({
              name,
              valueText,
            });
          }
        }
      }

      res.push(variant);
    });

    return res;
  },
  hasVariants: (state) => _.get(state, 'product.has_variants', null),
};

const actions = {
  getProductEdit(context, uuid) {
    let promise = null;
    context.commit('attempt', true);

    promise = api.product.getProductEdit(uuid, 'all');
    return promise
      .then((response) => {
        context.commit('attempt', false);
        context.commit('putProduct', response.data);
        context.dispatch('instance/setVariants', response.data.variants);
        context
          .dispatch('getProductSchema', {
            category: response.data.category,
          })
          .then(() => {
            context.dispatch('instance/setValues', {
              product: response.data,
              schema: context.state.schema,
            });
          });
      })
      .catch((err) => {
        context.commit('attempt', false);
      });
  },

  getProductSchema(context, params) {
    let promise = null;
    context.commit('attempt', true);

    promise = api.product.getSchema(params);
    return promise
      .then((response) => {
        context.commit('attempt', false);
        context.commit('putSchema', response.data);
        context.dispatch('instance/putSchema', response.data);
      })
      .catch((err) => {
        context.commit('attempt', false);
      });
  },
  clearSchema(context) {
    context.commit('clearSchema');
  },

  uploadImage(context, image) {
    let promise = null;

    promise = api.product.uploadPhoto(image);

    return promise;
  },

  clear(context) {
    context.commit('clearProduct');
  },
};

const mutations = {
  attempt(state, status) {
    state.attempting = status;
  },
  putSchema(state, schema) {
    state.schema = schema;
  },
  putProduct(state, product) {
    if (product.has_variants) state.variants = product.variants;
    state.product = product;
  },

  clearSchema(state) {
    state.productSchema = [];
  },

  setVariants(state, variants) {
    state.variants = variants;
  },
};
const modules = {
  instance: instance,
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules,
};

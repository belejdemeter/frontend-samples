import initHttp from '../http';
import services from './services';
const http = initHttp(services.MARKET_SERVICE);

const api = {
  product: {
    getSchema(params) {
      return http.get(`/product/schema/${slug}`);
    },
    addProduct(product) {
      return http.post(`/product`, product);
    },

    getProductEdit(uuid) {
      return http.get(`/product/${uuid}`);
    },
    getProductList(params) {
      return http.get(`/product`, params);
    },
    getCollection(slug) {
      return http.get(`/collection/${slug}`);
    },
    updateProduct(uuid, product) {
      return http.put(`/product/${uuid}`, product);
    },
    uploadPhoto(file) {
      return http.post('/media', { file });
    },
    deleteProduct(uuid) {
      return http.delete(`/product/${uuid}`);
    },
    fetchFilters(params) {
      return http.get(`/product/filter`, params);
    },
  },
};

export default api;

import getHttp from '../http';
const delivery = getHttp('DELIVERY');
export default {
  fetch(query) {
    return delivery.get('/trip', {params: query});
  },
  create(query) {
    return delivery.get(`/trip/create?${query}`);
  },
  store(route, scheduled_at = null) {
    return delivery.post('/trip', {route, scheduled_at});
  },
  show(uuid) {
    return delivery.get(`/trip/${uuid}`);
  },
  rate(uuid, rating = null, review = null) {
    return delivery.post(`/trip/${uuid}/rate`, {rating, review});
  },
  delete(uuid) {
    return delivery.delete(`/trip/${uuid}`);
  },
};

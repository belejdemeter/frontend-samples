import getHttp from '../http';
const http = getHttp('MAP');
export default {
  getRoute(points) {
    const url = `route/v1/driving/${points.join(';')}`;
    return http.get(url, {
      geometries: 'polyline',
      overview: 'full',
    });
  },
};

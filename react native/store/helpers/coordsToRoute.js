export default function coordsToRouteConverter(coords) {
  let route = [];
  coords.forEach(position => {
    let point = position.longitude + ',' + position.latitude;

    route.push(point);
  });
  return route;
}

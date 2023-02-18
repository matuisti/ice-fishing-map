import q from "../queries";

// import { contours } from "d3-contour";

export const getPolygons = async () => {
  const polygons = await q.getPolygons();
  // const c = contours()
  //   .size([100, 100])
  //   .thresholds(Array.from({ length: 19 }, (_, i) => Math.pow(2, i + 2)));
  // console.log(c);

  return polygons;
};
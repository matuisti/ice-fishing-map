import { Coordinate } from "openlayers";
import { query } from "../db/query";



const getPolygons = async () => {
  const queryString = `SELECT * FROM depth_points`;
  return await query(queryString);
};

const createPoint = async (point: Coordinate, depth: number) => {
  const queryString = `
    INSERT INTO depth_points (lat, lon, depth) 
    VALUES (${point[0]}, ${point[1]}, ${depth})
  `;
  return await query(queryString);
};

export {
  getPolygons,
  createPoint,
}
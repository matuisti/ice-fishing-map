import { Coordinate } from "openlayers";
import { query } from "../db/query";

const getPolygons = async () => {
  const queryString = `
    WITH multipointGeoms AS (
      SELECT
        depth,
        COUNT(*) AS geoms_count,
          array_agg(depth) AS depths,
          ST_Collect(st_point(lon, lat)) AS points
      FROM
          depth_points
      GROUP BY depth
    ),
    
    enclosedGeoms AS (
      SELECT
        t.depth,
        t.geoms_count,
        t.geom,
        ST_AsGeoJSON(t.*) as geojson
      FROM (
        SELECT
          depth,
          geoms_count,
          ST_ConvexHull(points) AS geom
        FROM multipointGeoms
      ) AS t
    )
    
    select ST_Collect(geom) from enclosedGeoms
  `;
  return await query(queryString);
};

const createPoint = async (point: Coordinate, depth: number) => {
  const queryString = `
    INSERT INTO depth_points (lat, lon, depth) 
    VALUES (${point[0]}, ${point[1]}, ${depth})
  `;
  return await query(queryString);
};

export { getPolygons, createPoint };

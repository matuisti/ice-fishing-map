import express from "express";
import { getPolygons } from "../services/geo.service";

const geoController = express.Router();

geoController.get("/point", async (req, res) => {
  try {
    const polygons = await getPolygons();
    res.status(200).json(polygons);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { geoController };

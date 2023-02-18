import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { getPoints } from "../../api/api";
import { transform } from "ol/proj";
import { GeometryCollection, LineString, Point, Polygon } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

const MapBody = styled.div`
  height: 80vh;
  width: 100%;
`;

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | undefined>();
  const [points, setPoints] = useState<any>();

  const setContourToMap = useCallback(() => {
    if (!map || !points) {
      return;
    }

    console.log(points);

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const geometryCollection = new GeometryCollection([
      new Point([0, 0]),
      new LineString([[4e6, -2e6], [8e6, 2e6]]),
      new Polygon([
        [[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]],
        [[-3e6, -1e6], [-2e6, 1e6], [-1e6, -1e6]],
      ]),
    ]);
    vectorSource.addFeature(new Feature(geometryCollection));
    console.log(vectorLayer);

    const style = new Style({
      fill: new Fill({ color: 'rgba(0, 0, 255, 0.1)' }),
      stroke: new Stroke({ color: 'blue', width: 2 }),
    });
    vectorLayer.setStyle(style);

     map.addLayer(vectorLayer);
  }, [map, points])

  map?.on("click", (e) => {
    var lonlat = transform(e.coordinate, "EPSG:3857", "EPSG:4326");
    console.log(lonlat);
    e.stopPropagation();
  });

  const initMap = (): Map | undefined => {
    if (!mapRef.current) {
      return;
    }

    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
    ];

    const view = new View({
      center: [2956827, 9591583],
      zoom: 6,
    });

    const mapOptions = {
      layers,
      view,
      controls: [],
    };

    const map = new Map(mapOptions);
    map.setTarget(mapRef.current);
    setMap(map);
    return map;
  };

  useEffect(() => {
    const fetchPoints = async () => {
      const response = await getPoints();
      setPoints(response);
    };
    fetchPoints();
  }, []);


  useEffect(() => {
    const map = initMap();
    return () => map?.setTarget(undefined);
  }, []);

  return ( 
    <div><MapBody ref={mapRef} />
    <button onClick={setContourToMap}>add</button></div>

  );
};

export { MapComponent };

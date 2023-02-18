import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';

const MapBody = styled.div`
  height: 100vh;
  width: 100%;
`

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<Map | undefined>()

  useEffect(() => {
    const map = initMap()
		return () => map?.setTarget(undefined);
	}, []);


  map?.on('click', (e) => {
    console.log(e.coordinate)
    e.stopPropagation()
  })


  const initMap = (): Map | undefined => {
    if (!mapRef.current) {
      return
    }

    const raster = [
      new TileLayer({ 
        source: new OSM()
      }),
    ];

    const view = new View({
      center: [2956827, 9591583],
      zoom: 6,
    });

    const mapOptions = {
			layers: raster,
      view: view,
      controls: [],
		}

		const map = new Map(mapOptions);
    map.setTarget(mapRef.current);
    setMap(map);
    return map
  }
 
  return (
    <MapBody ref={mapRef} />
  );
};

export { MapComponent };
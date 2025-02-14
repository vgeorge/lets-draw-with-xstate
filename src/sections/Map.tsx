import { useRef } from "react";
import Maplibre, {
  Layer,
  MapLayerMouseEvent,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useDrawing } from "../DrawingProvider";

const Map = () => {
  const mapRef = useRef(null);
  const {
    isDrawing,
    stopDrawing,
    startPoint,
    setStartPoint,
    rectangle,
    setRectangle,
  } = useDrawing();

  const handleMapClick = (e: MapLayerMouseEvent) => {
    if (isDrawing) {
      if (!startPoint) {
        setStartPoint(e.lngLat);
      } else {
        setRectangle([startPoint, e.lngLat]);
        stopDrawing();
      }
    }
  };

  const handleMouseMove = (e: MapLayerMouseEvent) => {
    if (isDrawing && startPoint) {
      setRectangle([startPoint, e.lngLat]);
    }
  };

  return (
    <>
      <Maplibre
        ref={mapRef}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100%" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
      >
        <Source
          id="rectangle"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: rectangle
              ? [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Polygon",
                      coordinates: [
                        [
                          [rectangle[0].lng, rectangle[0].lat],
                          [rectangle[1].lng, rectangle[0].lat],
                          [rectangle[1].lng, rectangle[1].lat],
                          [rectangle[0].lng, rectangle[1].lat],
                          [rectangle[0].lng, rectangle[0].lat],
                        ],
                      ],
                    },
                  },
                ]
              : [],
          }}
        >
          <Layer
            type="line"
            layout={{ "line-cap": "round" }}
            paint={{ "line-color": "#ff0000", "line-width": 2 }}
          />
        </Source>
      </Maplibre>
    </>
  );
};

export default Map;

import { useRef, useState } from "react";
import Maplibre, {
  Layer,
  LngLat,
  MapLayerMouseEvent,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = () => {
  const mapRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<LngLat | null>(null);
  const [rectangle, setRectangle] = useState<[LngLat, LngLat] | null>(null);

  const handleMapClick = (e: MapLayerMouseEvent) => {
    if (isDrawing) {
      if (!startPoint) {
        setStartPoint(e.lngLat);
      } else {
        setRectangle([startPoint, e.lngLat]);
        setIsDrawing(false);
      }
    }
  };

  const handleMouseMove = (e: MapLayerMouseEvent) => {
    if (isDrawing && startPoint) {
      setRectangle([startPoint, e.lngLat]);
    }
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setRectangle(null);
    setStartPoint(null);
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
      <button
        onClick={startDrawing}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1,
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        Start Drawing!
      </button>
    </>
  );
};

export default Map;

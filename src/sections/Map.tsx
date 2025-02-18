import { useRef } from "react";
import Maplibre, {
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MachineContext } from "../machine";
import { useSelector } from "@xstate/react";

const Map = () => {
  const actorRef = MachineContext.useActorRef();
  const mapRef = useRef<MapRef>(null);
  const rectangle = useSelector(actorRef, (state) => state.context.rectangle);

  const handleMapClick = (e: MapLayerMouseEvent) => {
    actorRef.send({
      type: "event:map:click",
      lngLat: e.lngLat,
    });
  };

  const handleMouseMove = (e: MapLayerMouseEvent) => {
    actorRef.send({
      type: "event:map:mouse:move",
      lngLat: e.lngLat,
    });
  };

  return (
    <>
      <Maplibre
        ref={mapRef}
        initialViewState={{
          zoom: 2,
        }}
        style={{ width: "100%" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onLoad={() => {
          const mapInstance = mapRef.current?.getMap();
          if (mapInstance) {
            actorRef.send({
              type: "event:map:load",
              mapInstance,
            });
          }
        }}
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

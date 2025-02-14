import Maplibre from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = () => {
  return (
    <Maplibre
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: "100%" }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    />
  );
};

export default Map;

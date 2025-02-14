import "./App.css";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const SidePanel = () => {
  return (
    <div
      style={{
        width: "300px",
        height: "100%",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "1.5em", marginBottom: "10px" }}>Side Panel</h1>
      <p style={{ fontSize: "1em", color: "#333" }}>Let's draw an rectangle!</p>
    </div>
  );
};

function App() {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <SidePanel />
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100%" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      />
    </div>
  );
}

export default App;

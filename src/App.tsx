import "./App.css";
import SidePanel from "./sections/SidePanel";
import Map from "./sections/Map";

function App() {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <SidePanel />
      <Map />
    </div>
  );
}

export default App;

import "./App.css";
import SidePanel from "./sections/SidePanel";
import Map from "./sections/Map";
import { DrawingProvider } from "./DrawingProvider";

function App() {
  return (
    <DrawingProvider>
      <div style={{ height: "100vh", display: "flex" }}>
        <SidePanel />
        <Map />
      </div>
    </DrawingProvider>
  );
}

export default App;

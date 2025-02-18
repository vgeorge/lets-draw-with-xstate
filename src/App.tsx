import "./App.css";
import SidePanel from "./sections/SidePanel";
import Map from "./sections/Map";
import { DrawingProvider } from "./DrawingProvider";
import { MachineContext } from "./machine";

function App() {
  return (
    <MachineContext.Provider>
      <DrawingProvider>
        <div style={{ height: "100vh", display: "flex" }}>
          <SidePanel />
          <Map />
        </div>
      </DrawingProvider>
    </MachineContext.Provider>
  );
}

export default App;

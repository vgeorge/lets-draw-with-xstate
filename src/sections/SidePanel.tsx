import Button from "../Button";
import { useDrawing } from "../DrawingProvider";

const SidePanel = () => {
  const {
    startDrawing,
    isDrawing,
    cancelDrawing,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useDrawing();
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
      <h1 style={{ fontSize: "1.5em", marginBottom: "10px" }}>
        Let's draw a rectangle!
      </h1>
      <div>
        <Button onClick={startDrawing} disabled={isDrawing}>
          Start Drawing!
        </Button>
        <Button onClick={cancelDrawing} disabled={!isDrawing}>
          Cancel
        </Button>
      </div>
      <div>
        <Button onClick={undo} disabled={!canUndo}>
          Undo
        </Button>
        <Button onClick={redo} disabled={!canRedo}>
          Redo
        </Button>
      </div>
    </div>
  );
};

export default SidePanel;

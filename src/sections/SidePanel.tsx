import Button from "../Button";
import { useDrawing } from "../DrawingProvider";
import { MachineContext } from "../machine";

const SidePanel = () => {
  const actorRef = MachineContext.useActorRef();
  const {
    isDrawing,
    cancelDrawing,
    undo,
    redo,
    canUndo,
    canRedo,
    area,
    rectangle,
    features,
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
        <Button
          onClick={() => actorRef.send({ type: "event:draw:start" })}
          disabled={isDrawing}
        >
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
      <div style={{ marginTop: "20px" }}>
        {rectangle && area && (
          <p>This rectangle has {Math.round(area)} map units.</p>
        )}
      </div>
      {features.length > 0 && (
        <div>
          <h2 style={{ fontSize: "1.2em", marginBlock: "20px" }}>
            Features in rectangle
          </h2>
          <ul style={{ padding: 0, margin: 20 }}>
            {features.map((feature, i) => (
              <li key={i}>{feature.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidePanel;

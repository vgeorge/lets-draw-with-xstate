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
      <p style={{ fontSize: "1em", color: "#333" }}>Let's draw a rectangle!</p>
    </div>
  );
};

export default SidePanel;

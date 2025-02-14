const Button = ({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      style={{
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

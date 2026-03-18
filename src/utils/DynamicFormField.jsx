function DynamicFormField({ value, onChange, label, placeholder, error }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      {label && <label>{label}</label>}
      <input
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          border: error ? "2px solid red" : "1px solid #ccc",
          boxShadow: error ? "0 0 5px rgba(255,0,0,0.5)" : "none",
          padding: "6px",
          borderRadius: "4px",
        }}
      />
      {error && <span style={{ color: "red", fontSize: 12 }}>{error}</span>}
    </div>
  );
}
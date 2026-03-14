function JsonPreview({ model }) {
  return (
    <div>
      <h3>Vista JSON</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: 15 }}>
        {JSON.stringify(model, null, 2)}
      </pre>
    </div>
  )
}

export default JsonPreview
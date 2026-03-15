import "../styles/ModelEditor.css"

export default function EvaluationResults({ result }) {

  if (!result) {
    return <p>No hay resultados aún.</p>
  }

  const metrics = result.metrics || {}

  return (

    <div className="results-container">

      <h3 className="results-title">
        Resultados de Evaluación
      </h3>

      <h4>Violaciones</h4>
      <p>Total: {result.violations_count}</p>

      <ul className="violations-list">
        {(result.violations || []).map((v, i) => (
          <li key={i}>
            <b>{v.rule}</b> ({v.dimension}) → {v.message}
          </li>
        ))}
      </ul>

      <h4>Métricas</h4>

      {Object.entries(metrics).map(([name, metric]) => (

        <div key={name} className="metric-card">

          <b>{name}</b>

          <p>
            Valor: <span className="metric-value">{metric.value}</span>
          </p>

          <p>
            Interpretación: {metric.interpretation}
          </p>

        </div>

      ))}

      <h4>IGC</h4>

      <div className="igc-box">
        {result.IGC}
      </div>

    </div>
  )
}
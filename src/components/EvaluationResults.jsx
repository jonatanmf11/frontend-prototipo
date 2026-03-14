export default function EvaluationResults({ result }) {

  if (!result) {
    return <p>No hay resultados aún.</p>
  }

  const metrics = result.metrics || {}

  return (

    <div style={{ marginTop: 20 }}>

      <h3>Resultados de Evaluación</h3>

      <h4>Violaciones</h4>
      <p>Total: {result.violations_count}</p>

      <ul>
        {(result.violations || []).map((v, i) => (
          <li key={i}>
            <b>{v.rule}</b> ({v.dimension}) → {v.message}
          </li>
        ))}
      </ul>

      <h4>Métricas</h4>

      {Object.entries(metrics).map(([name, metric]) => (
        <div key={name} style={{ marginBottom: 10 }}>

          <b>{name}</b>

          <p>Valor: {metric.value}</p>

          <p>Interpretación: {metric.interpretation}</p>

        </div>
      ))}

      <h4>IGC</h4>
      <p>{result.IGC}</p>

    </div>
  )
}
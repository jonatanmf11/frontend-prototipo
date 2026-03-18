import { useState } from "react"
import { useModelContext } from "../context/ModelContext"
import "../styles/EvaluationPanel.css"

import {
  evaluateMetrics,
  evaluateModelRules,
  evaluateFull
} from "../servicest/evaluationService"

export default function EvaluationPanel() {

  const { model, icfPairs, cafDocumentation, cptData, mismatchData } = useModelContext()

  const [metrics, setMetrics] = useState(null)
  const [violations, setViolations] = useState(null)
  const [igc, setIGC] = useState(null)
  const [error, setError] = useState(null)

  const runRules = async () => {
    try {

      const result = await evaluateModelRules(model)

      setViolations(result)
      setMetrics(null)
      setIGC(null)
      setError(null)

    } catch (err) {
      console.error(err)
      setError("Error al ejecutar la evaluación de reglas")
    }
  }

  const runMetrics = async () => {
    try {

      const result = await evaluateMetrics(model)

      setMetrics(result.metrics || {})
      setViolations(null)
      setIGC(null)
      setError(null)

    } catch (err) {
      console.error(err)
      setError("Error al ejecutar la evaluación de reglas")
    }
  }

  const runFullEvaluation = async () => {

    try {

      const payload = {
        model,
        icf_pairs: icfPairs,
        caf_documentation: cafDocumentation,
        cpt_data: cptData,
        mismatch_data: mismatchData
      }

      const result = await evaluateFull(payload)

      setMetrics(result.metrics || {})

      setViolations({
        violations_count: result.violations_count || 0,
        violations: result.violations || []
      })

      setIGC(result.IGC ?? null)

      setError(null)

    } catch (err) {

      console.error(err)
      setError("Error al ejecutar la evaluación completa")

    }
  }

  return (

   <div className="section-card">

      <h2 className="evaluation-title">
        Evaluación del Modelo
      </h2>

      <div className="button-group">

        <button onClick={runRules}>
          Evaluar reglas OCL
        </button>

        <button
          onClick={runFullEvaluation}
        >
          Evaluación completa
        </button>

      </div>

      {error && (
        <p className="error">{error}</p>
      )}

      {/* IGC */}

      {igc !== null && (

        <div className="igc-section">

          <h3>IGC Score</h3>

          <p className="igc-score">
            {igc}
          </p>

        </div>

      )}

      {/* METRICS */}

      {metrics && (

        <div className="metrics-section">

          <h3>Métricas</h3>

          <table className="metrics-table">

            <thead>
              <tr>
                <th>Métrica</th>
                <th>Valor</th>
                <th>Interpretación</th>
              </tr>
            </thead>

            <tbody>

              {Object.entries(metrics).map(([name, value]) => {

                const metricValue =
                  typeof value === "object" ? value.value : value

                const interpretation =
                  typeof value === "object" ? value.interpretation : ""

                return (

                  <tr key={name}>
                    <td>{name}</td>
                    <td>{metricValue}</td>
                    <td>{interpretation}</td>
                  </tr>

                )

              })}

            </tbody>

          </table>

        </div>

      )}

      {/* VIOLATIONS */}

      {violations && (

        <div className="violations-section">

          <h3>
            Violaciones de Reglas ({violations.violations_count})
          </h3>

          {violations.violations_count === 0 && (
            <p>No hay violaciones ✅</p>
          )}

          {violations.violations_count > 0 && (

            <table className="violations-table">

              <thead>
                <tr>
                  <th>Práctica</th>
                  <th>Regla OCL</th>
                  <th>Dimensión</th>
                  <th>Violación</th>
                </tr>
              </thead>

              <tbody>

                {(violations.violations || []).map((v, i) => (
                  <tr key={i}>
                    <td>{v.practice_id}</td>
                    <td>{v.rule}</td>
                    <td>{v.dimension}</td>
                    <td>{v.message}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          )}

        </div>

      )}

    </div>
  )
}
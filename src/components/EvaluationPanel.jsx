import { useState } from "react"
import { useModelContext } from "../context/ModelContext"
import "../styles/EvaluationPanel.css"
import InfoButtonModern from "../utils/InfoButtonModern";

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
  const metricsInfo = {
    ICS: {
      title: "Índice de Compatibilidad de Secuencia (ICS)",
      content: "Detecta conflictos de tiempo y lógica entre las actividades iterativas (ágiles) y las lineales (tradicionales)."
    },
    ICF: {
      title: "Índice de Consistencia Funcional (ICF)",
      content: "Mide el ajuste y alineación entre artefactos ágiles y tradicionales para evitar redundancias o conflictos documentales."
    },
    NSR: {
      title: "Nivel de Solapamiento de Roles (NSR)",
      content: "Evalúa la claridad de las responsabilidades para detectar tareas duplicadas o vacíos de autoridad en el equipo."
    },
    CAF: {
      title: "Cobertura de Adaptación Formal (CAF)",
      content: "Mide qué porcentaje del proceso híbrido está documentado formalmente para garantizar que sea sostenible y replicable"
    },
    CPT: {
      title: "Compatibilidad de Productos de Trabajo (CPT)",
      content: "Determina la proporción de entregables que son compartidos y útiles tanto para la parte ágil como para la tradicional de tu proceso."
    },
    MISMATCH_AGILE: {
      title: "Puntaje de desajuste de metodología (AGILE)",
      content: "Cuantifica qué tan bien se adapta la metodología elegida a las necesidades específicas (como flexibilidad o control de riesgos) de tu proyecto."
    },
    MISMATCH_TRADITIONAL: {
      title: "Puntaje de desajuste de metodología  (TRADITIONAL)",
      content: "Cuantifica qué tan bien se adapta la metodología elegida a las necesidades específicas (como flexibilidad o control de riesgos) de tu proyecto."
    },
    MISMATCH_HYBRID: {
      title: "Puntaje de desajuste de metodología (HYBRID)",
      content: "Cuantifica qué tan bien se adapta la metodología elegida a las necesidades específicas (como flexibilidad o control de riesgos) de tu proyecto."
    }
  };

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

          <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Resultado IGC - (Índice Global de Consistencia)

            <InfoButtonModern
              title="Índice Global de Consistencia (IGC)"
              content="Métrica global que integra los resultados de consistencia del modelo, combinando métricas individuales y cumplimiento de reglas. Valores cercanos a 1 indican alta consistencia."
            />
          </h3>

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

                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>

                        {/* Nombre con ancho fijo */}
                        <span style={{ minWidth: "300px" }}>
                          {name}
                        </span>

                        {/* InfoButton */}
                        {metricsInfo[name] && (
                          <InfoButtonModern
                            title={metricsInfo[name].title}
                            content={metricsInfo[name].content}
                          />
                        )}

                      </div>
                    </td>
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

          <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Violaciones de Reglas ({violations.violations_count})

            <InfoButtonModern
              title="Violaciones de reglas OCL"
              content="Indican incumplimientos de restricciones definidas sobre el modelo. Cada violación señala una inconsistencia que debe corregirse."
            />
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
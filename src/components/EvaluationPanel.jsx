import { useState } from "react"
import { useModelContext } from "../context/ModelContext"

import {
  evaluateMetrics,
  evaluateModelRules,
  evaluateFull
} from "../servicest/evaluationService"

export default function EvaluationPanel() {

  const { model, icfPairs, cafDocumentation, cptData, mismatchData} = useModelContext()

  const [metrics,setMetrics] = useState(null)
  const [violations,setViolations] = useState(null)
  const [igc,setIGC] = useState(null)
  const [error,setError] = useState(null)

  /* ---------------- RULES ---------------- */

  const runRules = async () => {

    try{

      const result = await evaluateModelRules(model)

      setViolations(result)
      setMetrics(null)
      setIGC(null)
      setError(null)

    }catch(err){

      console.error(err)
      setError("Error running rule evaluation")

    }

  }

  /* ---------------- METRICS ---------------- */

  const runMetrics = async () => {

    try{

      const result = await evaluateMetrics(model)

      setMetrics(result.metrics || {})
      setViolations(null)
      setIGC(null)
      setError(null)

    }catch(err){

      console.error(err)
      setError("Error running metrics evaluation")

    }

  }

  /* ---------------- FULL ---------------- */

  const runFullEvaluation = async () => {

  try{

    const payload = {
      model,
      icf_pairs: icfPairs,
      caf_documentation: cafDocumentation, 
      cpt_data : cptData,
      mismatch_data : mismatchData
    }

    const result = await evaluateFull(payload)

    setMetrics(result.metrics || {})

    setViolations({
      violations_count: result.violations_count || 0,
      violations: result.violations || []
    })

    setIGC(result.IGC ?? null)

    setError(null)

  }catch(err){

    console.error(err)
    setError("Error running full evaluation")

  }

}
  return (

    <div style={{marginTop:40}}>

      <h2>Evaluación del Modelo</h2>

      <div style={{display:"flex",gap:10}}>

        <button onClick={runMetrics}>
          Evaluar métricas
        </button>

        <button onClick={runRules}>
          Evlauar reglas OCL
        </button>

        <button onClick={runFullEvaluation}>
          Realizar evaluación completa 
        </button>

      </div>

      {error && (
        <p style={{color:"red"}}>{error}</p>
      )}

      {/* ---------------- IGC ---------------- */}

      {igc !== null && (

        <div style={{marginTop:20}}>

          <h3>IGC Score</h3>

          <p style={{fontSize:22,fontWeight:"bold"}}>
            {igc}
          </p>

        </div>

      )}

      {/* ---------------- METRICS ---------------- */}

      {metrics && (

        <div style={{marginTop:20}}>

          <h3>Metrica</h3>

          <table border="1" cellPadding="5">

            <thead>
              <tr>
                <th>Metrica</th>
                <th>Valor</th>
                <th>Interpretación</th>
              </tr>
            </thead>

            <tbody>

              {Object.entries(metrics).map(([name,value]) => {

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

      {/* ---------------- VIOLATIONS ---------------- */}

      {violations && (

        <div style={{marginTop:20}}>

          <h3>
            Rule Violations ({violations.violations_count})
          </h3>

          {violations.violations_count === 0 && (
            <p>No violations ✔</p>
          )}

          {violations.violations_count > 0 && (

            <table border="1" cellPadding="5">

              <thead>
                <tr>
                  <th>Práctica</th>
                  <th>Regla OCL</th>
                  <th>Dimensión</th>
                  <th>Violación regla OCL</th>
                </tr>
              </thead>

              <tbody>

                {(violations.violations || []).map((v,i)=>(
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
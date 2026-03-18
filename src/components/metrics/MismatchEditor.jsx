import { useModelContext } from "../../context/ModelContext"
import "../../styles/MismatchEditor.css"
import InfoButtonModern from "../../utils/InfoButtonModern";

export default function MismatchEditor() {

  const { mismatchData, setMismatchData } = useModelContext()

  if (!mismatchData) {
    return <p>Cargando características del proyecto...</p>
  }

  const updateField = (index, field, value) => {
    const updated = { ...mismatchData }
    updated.characteristics[index][field] = Number(value)
    setMismatchData(updated)
  }

  const updateMethodology = (index, method, value) => {
    const updated = { ...mismatchData }
    updated.characteristics[index].methodologies[method] = Number(value)
    setMismatchData(updated)
  }

  return (

    <div className="mismatch-container">

      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }} className="mismatch-title">
        Marco de puntuación de desajuste - (Mismatch Score Framework)
        <InfoButtonModern
          title="Marco de puntuación de desajuste"
          content="Mide cuantitativamente el grado de desalineación entre las características del contexto del proyecto y el método de desarrollo aplicado."
        />
      </h2>

      <div className="table-wrapper">

        <table className="mismatch-table">

          <thead>
            <tr>
              <th>Característica</th>
              <th>Valor del proyecto</th>
              <th>Peso</th>
              <th>Ágil</th>
              <th>Tradicional</th>
              <th>Híbrido</th>
            </tr>
          </thead>

          <tbody>

            {mismatchData.characteristics.map((c, i) => (

              <tr key={i}>

                <td className="characteristic-name">
                  {c.name}
                </td>

                <td>
                  <input
                    type="number"
                    value={c.projectValue}
                    onChange={(e) => updateField(i, "projectValue", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.weight}
                    onChange={(e) => updateField(i, "weight", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.methodologies.agile}
                    onChange={(e) => updateMethodology(i, "agile", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.methodologies.traditional}
                    onChange={(e) => updateMethodology(i, "traditional", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.methodologies.hybrid}
                    onChange={(e) => updateMethodology(i, "hybrid", e.target.value)}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}
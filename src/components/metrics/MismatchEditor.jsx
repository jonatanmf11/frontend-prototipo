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

  updated.characteristics[index][field] =
    value === "" ? "" : Number(value)

  setMismatchData(updated)
}
const sanitizePositiveNumber = (value) => {
  if (value === "") return "";

  const num = Number(value);

  if (isNaN(num))
    return "";

  return Math.max(0, num);
};

const updateMethodology = (index, method, value) => {
  try {
    const updated = { ...mismatchData };

    updated.characteristics[index].methodologies[method] =
      sanitizePositiveNumber(value);

    setMismatchData(updated);

  } catch (error) {
    console.error(error);
  }
};
const addCharacteristic = () => {
  const updated = {
    ...mismatchData,
    characteristics: [
      ...mismatchData.characteristics,
      {
        name: "",
        projectValue: "",
        weight: "",
        methodologies: {
          agile: "",
          traditional: "",
          hybrid: ""
        }
      }
    ]
  };

  setMismatchData(updated);
};
const removeCharacteristic = (index) => {
  const updated = {
    ...mismatchData,
    characteristics: mismatchData.characteristics.filter(
      (_, i) => i !== index
    )
  };

  setMismatchData(updated);
};

  return (

    <div className="mismatch-container">

      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }} className="mismatch-title">
        Marco de puntuación de desajuste - (Mismatch Score Framework)
        <InfoButtonModern
          title="Marco de puntuación de desajuste"
          content="Mide cuantitativamente el grado de desalineación entre las características del contexto del proyecto y el método de desarrollo aplicado."
        />
      </h2>

      <p className="section-help">
        Asigna valores a las características del proyecto y a cada enfoque de desarrollo.
        Los valores suelen definirse en una escala de <strong>0 a 5</strong> (o similar), donde:
        valores más altos representan mayor presencia de la característica.
        El resultado final indica el nivel de desajuste, donde valores más altos implican menor alineación.
      </p>

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
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {mismatchData.characteristics.map((c, i) => (

              <tr key={i}>

              <td>
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => {
                    const updated = { ...mismatchData };
                    updated.characteristics[i].name = e.target.value;
                    setMismatchData(updated);
                  }}
                />
              </td>

                                  <td>
                  <input
                    type="number"
                    min="0"
                    value={c.projectValue}
                    onChange={(e) => updateField(i, "projectValue", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.weight}
                    min="0"
                    onChange={(e) => updateField(i, "weight", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.methodologies.agile}
                    min="0"
                    onChange={(e) => updateMethodology(i, "agile", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.methodologies.traditional}
                    min="0"
                    onChange={(e) => updateMethodology(i, "traditional", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={c.methodologies.hybrid}
                    min="0"
                    onChange={(e) => updateMethodology(i, "hybrid", e.target.value)}
                  />
                </td>

<td>
  <button
    onClick={() => removeCharacteristic(i)}
    style={{
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "6px 10px",
      cursor: "pointer"
    }}
  >
    🗑
  </button>
</td>
              </tr>

            ))}

          </tbody>

        </table>

        <div style={{ marginTop: "20px" }}>
  <button
    onClick={addCharacteristic}
    style={{
      border: "none",
      padding: "10px 18px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Añadir característica
  </button>
</div>

      </div>

    </div>

  )

}
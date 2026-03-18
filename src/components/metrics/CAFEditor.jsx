import { useModelContext } from "../../context/ModelContext"
import InfoButtonModern from "../../utils/InfoButtonModern";

export default function CAFEditor() {

  const { cafDocumentation, setCafDocumentation } = useModelContext()

  if (!cafDocumentation) {
    return <p>Loading CAF data...</p>
  }

  const updateItem = (section, index, field, value) => {

    const updated = { ...cafDocumentation }

    updated[section][index] = {
      ...updated[section][index],
      [field]: value
    }

    setCafDocumentation(updated)

  }

  const toggleDocumented = (section, index) => {

    const updated = { ...cafDocumentation }

    updated[section][index].documented =
      !updated[section][index].documented

    setCafDocumentation(updated)

  }

  const renderSection = (title, section, fields) => {

    return (

      <div style={{ marginTop: 20 }}>

        <h4>{title}</h4>

        <table border="1" cellPadding="5">

          <thead>
            <tr>

              {fields.map(f => (
                <th key={f}>{f}</th>
              ))}

              <th>Documented</th>

            </tr>
          </thead>

          <tbody>

            {cafDocumentation[section].map((item, i) => (

              <tr key={i}>

                {fields.map(f => (

                  <td key={f}>

                    <input
                      value={item[f] || ""}
                      onChange={(e) =>
                        updateItem(section, i, f, e.target.value)
                      }
                    />

                  </td>

                ))}

                <td>

                  <input
                    type="checkbox"
                    checked={item.documented}
                    onChange={() => toggleDocumented(section, i)}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )

  }

  return (

    <div style={{ marginTop: 40 }}>

      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}> Cobertura de Adaptaci&oacute;n Formal (CAF)
        <InfoButtonModern
          title="Cobertura de Adaptación Formal"
          content="Evalúa si las reglas de adaptación están explícitamente documentadas."
        />
      </h2>

      {renderSection(
        "Actividades",
        "activities",
        ["id"]
      )}

      {renderSection(
        "Reglas",
        "rules",
        ["practiceId"]
      )}

      {renderSection(
        "Roles",
        "roles",
        ["id"]
      )}

      {renderSection(
        "Artefactos",
        "artifacts",
        ["id"]
      )}

      {renderSection(
        "Secuencia",
        "sequence",
        ["practiceA", "practiceB"]
      )}

      {renderSection(
        "Metricas",
        "metrics",
        ["name"]
      )}

    </div>

  )

}
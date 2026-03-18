import { useModelContext } from "../../context/ModelContext"
import InfoButtonModern from "../../utils/InfoButtonModern";

export default function CPTEditor() {

  const { cptData, setCptData } = useModelContext()

  if (!cptData) {
    return <p>Cargando productos de trabajo...</p>
  }

  const updateValue = (section, index, value) => {

    const updated = { ...cptData }

    updated[section][index] = value

    setCptData(updated)

  }

  const addItem = (section) => {

    const updated = { ...cptData }

    updated[section].push("")

    setCptData(updated)

  }

  const removeItem = (section, index) => {

    const updated = { ...cptData }

    updated[section].splice(index, 1)

    setCptData(updated)

  }

  const renderList = (title, section) => {

    return (

      <div style={{ marginTop: 20 }}>

        <h3>{title}</h3>

        {cptData[section].map((item, i) => (

          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 5 }}>

            <input
              value={item}
              onChange={(e) => updateValue(section, i, e.target.value)}
              style={{ width: 300 }}
            />

            <button onClick={() => removeItem(section, i)}>
              Eliminar
            </button>

          </div>

        ))}

        <button onClick={() => addItem(section)}>
          Añadir
        </button>

      </div>

    )

  }

  return (

    <div style={{ marginTop: 40 }}>

      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>Compatibilidad de productos de trabajo (CPT)
        <InfoButtonModern
          title="Compatibilidad de Productos de Trabajo"
          content="Evalúa directamente la equivalencia y coherencia entre artefactos ágiles y plan-driven requeridos por el proceso híbrido."
        />
      </h2>

      {renderList("Productos de trabajo ágil", "agileWorkProducts")}

      {renderList("Productos de trabajo Plan-Driven", "planDrivenWorkProducts")}

    </div>

  )

}
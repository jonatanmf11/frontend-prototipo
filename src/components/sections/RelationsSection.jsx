import { useModelContext } from "../../context/ModelContext"

function RelationsSection() {

  const { model, setModel } = useModelContext()

  const addRelation = () => {

    const newRelation = {
      practiceA: "",
      practiceB: "",
      type: ""
    }

    setModel({
      ...model,
      compatibilityRelations: [
        ...(model.compatibilityRelations || []),
        newRelation
      ]
    })
  }

  const updateRelation = (index, field, value) => {

    const updatedRelations = [...(model.compatibilityRelations || [])]

    updatedRelations[index] = {
      ...updatedRelations[index],
      [field]: value
    }

    setModel({
      ...model,
      compatibilityRelations: updatedRelations
    })
  }

  const removeRelation = (index) => {

    const updatedRelations = model.compatibilityRelations.filter(
      (_, i) => i !== index
    )

    setModel({
      ...model,
      compatibilityRelations: updatedRelations
    })
  }

  return (
    <div>

      <h3>Relaciones de Compatibilidad</h3>

      {(model.compatibilityRelations || []).map((r, i) => (

        <div key={i}>

          <input
            value={r.practiceA || ""}
            onChange={e => updateRelation(i, "practiceA", e.target.value)}
            placeholder="Practice A"
          />

          <input
            value={r.practiceB || ""}
            onChange={e => updateRelation(i, "practiceB", e.target.value)}
            placeholder="Practice B"
          />

          <input
            value={r.type || ""}
            onChange={e => updateRelation(i, "type", e.target.value)}
            placeholder="Tipo"
          />

          <button onClick={() => removeRelation(i)}>
            Eliminar
          </button>

        </div>

      ))}

      <button onClick={addRelation}>
        Añadir Relación
      </button>

    </div>
  )
}

export default RelationsSection
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

        <div style={{border:"1px solid #ccc", padding:"12px", margin:"12px"}}  key={i}>

          <div className="form-grid">

            <div className="form-field">
              <input
                value={r.practiceA || ""}
                onChange={e => updateRelation(i, "practiceA", e.target.value)}
                placeholder="Practice A"
              />
            </div>

            <div className="form-field">

              <input
                value={r.practiceB || ""}
                onChange={e => updateRelation(i, "practiceB", e.target.value)}
                placeholder="Practice B"
              />
            </div>

            <div className="form-field">
              <input
                value={r.type || ""}
                onChange={e => updateRelation(i, "type", e.target.value)}
                placeholder="Tipo"
              />
            </div>
          </div>
          <button onClick={() => removeRelation(i)}>
            Eliminar
          </button>

        </div>

      ))}

      <button style={{marginTop:"30px"}} onClick={addRelation}>
        Añadir Relación
      </button>

    </div>
  )
}

export default RelationsSection
import { useModelContext } from "../../context/ModelContext"

export default function GeneralInfoSection() {

  const { model, setModel } = useModelContext()

  if (!model) {
    return <div>Loading model...</div>
  }

  const updateField = (field, value) => {

    setModel({
      ...model,
      [field]: value
    })

  }

  return (

    <div>

      <h3>Información General</h3>

      <div>
        <label>ID</label>
        <input
          value={model.id || ""}
          onChange={(e) => updateField("id", e.target.value)}
        />
      </div>

      <div>
        <label>Nombre</label>
        <input
          value={model.name || ""}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      <div>
        <label>Descripción</label>
        <input
          value={model.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

      <div>
        <label>Versión</label>
        <input
          value={model.version || ""}
          onChange={(e) => updateField("version", e.target.value)}
        />
      </div>

    </div>

  )

}
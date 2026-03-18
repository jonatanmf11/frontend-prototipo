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

      <p className="section-help">
        Define el nombre y descripción del proceso híbrido que deseas evaluar.
      </p>

<div className="form-grid">

  <div className="form-field">
    <label>ID</label>
    <input
      value={model.id || ""}
      onChange={(e) => updateField("id", e.target.value)}
    />
  </div>

  <div className="form-field">
    <label>Nombre</label>
    <input
      value={model.name || ""}
      onChange={(e) => updateField("name", e.target.value)}
    />
  </div>

  <div className="form-field">
    <label>Descripción</label>
    <input
      value={model.description || ""}
      onChange={(e) => updateField("description", e.target.value)}
    />
  </div>

  <div className="form-field">
    <label>Versión</label>
    <input
      value={model.version || ""}
      onChange={(e) => updateField("version", e.target.value)}
    />
  </div>

</div>
    </div>

  )

}
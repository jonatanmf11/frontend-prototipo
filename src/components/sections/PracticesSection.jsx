import { useModelContext } from "../../context/ModelContext"

function PracticesSection() {

  const { model, setModel } = useModelContext()

  /* ---------- PRACTICES ---------- */

  const addPractice = () => {

    const newPractice = {
      id: "",
      name: "",
      type: "agile",
      activities: [],
      artifacts: [],
      roles: [],
      rules: []
    }

    setModel({
      ...model,
      practices: [...(model.practices || []), newPractice]
    })
  }

  const updatePractice = (index, field, value) => {

    const updated = [...model.practices]

    updated[index] = {
      ...updated[index],
      [field]: value
    }

    setModel({
      ...model,
      practices: updated
    })
  }

  const removePractice = (index) => {

    const updated = model.practices.filter((_, i) => i !== index)

    setModel({
      ...model,
      practices: updated
    })
  }

  /* ---------- ACTIVITIES ---------- */

  const addActivity = (practiceIndex) => {

    const updated = [...model.practices]

    const newActivity = {
      id: "",
      name: "",
      type: "agile"
    }

    updated[practiceIndex].activities = [
      ...(updated[practiceIndex].activities || []),
      newActivity
    ]

    setModel({ ...model, practices: updated })
  }

  const updateActivity = (practiceIndex, activityIndex, field, value) => {

    const updated = [...model.practices]

    updated[practiceIndex].activities[activityIndex] = {
      ...updated[practiceIndex].activities[activityIndex],
      [field]: value
    }

    setModel({ ...model, practices: updated })
  }

  const removeActivity = (practiceIndex, activityIndex) => {

    const updated = [...model.practices]

    updated[practiceIndex].activities =
      updated[practiceIndex].activities.filter((_, i) => i !== activityIndex)

    setModel({ ...model, practices: updated })
  }

  /* ---------- ROLES ---------- */

  const addRole = (practiceIndex) => {

    const updated = [...model.practices]

    const newRole = {
      id: "",
      name: ""
    }

    updated[practiceIndex].roles = [
      ...(updated[practiceIndex].roles || []),
      newRole
    ]

    setModel({ ...model, practices: updated })
  }

  const updateRole = (practiceIndex, roleIndex, field, value) => {

    const updated = [...model.practices]

    updated[practiceIndex].roles[roleIndex] = {
      ...updated[practiceIndex].roles[roleIndex],
      [field]: value
    }

    setModel({ ...model, practices: updated })
  }

  const removeRole = (practiceIndex, roleIndex) => {

    const updated = [...model.practices]

    updated[practiceIndex].roles =
      updated[practiceIndex].roles.filter((_, i) => i !== roleIndex)

    setModel({ ...model, practices: updated })
  }

  /* ---------- RULES ---------- */

  const addRule = (practiceIndex) => {

    const updated = [...model.practices]

    updated[practiceIndex].rules = [
      ...(updated[practiceIndex].rules || []),
      ""
    ]

    setModel({ ...model, practices: updated })
  }

  const updateRule = (practiceIndex, ruleIndex, value) => {

    const updated = [...model.practices]

    updated[practiceIndex].rules[ruleIndex] = value

    setModel({ ...model, practices: updated })
  }

  const removeRule = (practiceIndex, ruleIndex) => {

    const updated = [...model.practices]

    updated[practiceIndex].rules =
      updated[practiceIndex].rules.filter((_, i) => i !== ruleIndex)

    setModel({ ...model, practices: updated })
  }

  /* ---------- ARTIFACTS ---------- */

  const addArtifact = (practiceIndex) => {

    const updated = [...model.practices]

    const newArtifact = {
      id: "",
      name: "",
      category: ""
    }

    updated[practiceIndex].artifacts = [
      ...(updated[practiceIndex].artifacts || []),
      newArtifact
    ]

    setModel({ ...model, practices: updated })
  }

  const updateArtifact = (practiceIndex, artifactIndex, field, value) => {

    const updated = [...model.practices]

    updated[practiceIndex].artifacts[artifactIndex] = {
      ...updated[practiceIndex].artifacts[artifactIndex],
      [field]: value
    }

    setModel({ ...model, practices: updated })
  }

  const removeArtifact = (practiceIndex, artifactIndex) => {

    const updated = [...model.practices]

    updated[practiceIndex].artifacts =
      updated[practiceIndex].artifacts.filter((_, i) => i !== artifactIndex)

    setModel({ ...model, practices: updated })
  }

  return (

    <div>

      <h3>Prácticas</h3>

      {(model.practices || []).map((p, i) => (

        <div key={i} style={{border:"1px solid #ccc", padding:"12px", margin:"12px"}}>

          <input
            value={p.id || ""}
            onChange={e => updatePractice(i,"id",e.target.value)}
            placeholder="Practice ID"
          />

          <input
            value={p.name || ""}
            onChange={e => updatePractice(i,"name",e.target.value)}
            placeholder="Nombre"
          />

          <select
            value={p.type || "agile"}
            onChange={e => updatePractice(i,"type",e.target.value)}
          >
            <option value="agile">Agile</option>
            <option value="traditional">Traditional</option>
          </select>

          <button onClick={() => removePractice(i)}>
            Eliminar Práctica
          </button>

          {/* ACTIVIDADES */}

          <div style={{marginTop:"10px"}}>

            <h4>Actividades</h4>

            {(p.activities || []).map((a, j) => (

              <div key={j}>

                <input
                  value={a.id || ""}
                  onChange={e => updateActivity(i,j,"id",e.target.value)}
                  placeholder="Activity ID"
                />

                <input
                  value={a.name || ""}
                  onChange={e => updateActivity(i,j,"name",e.target.value)}
                  placeholder="Nombre"
                />

                <select
                  value={a.type || "agile"}
                  onChange={e => updateActivity(i,j,"type",e.target.value)}
                >
                  <option value="agile">Agile</option>
                  <option value="traditional">Traditional</option>
                </select>

                <button onClick={() => removeActivity(i,j)}>
                  Eliminar
                </button>

              </div>

            ))}

            <button onClick={() => addActivity(i)}>
              Añadir Actividad
            </button>

          </div>

          {/* ROLES */}

          <div style={{marginTop:"10px"}}>

            <h4>Roles</h4>

            {(p.roles || []).map((r, j) => (

              <div key={j}>

                <input
                  value={r.id || ""}
                  onChange={e => updateRole(i,j,"id",e.target.value)}
                  placeholder="Role ID"
                />

                <input
                  value={r.name || ""}
                  onChange={e => updateRole(i,j,"name",e.target.value)}
                  placeholder="Nombre"
                />

                <button onClick={() => removeRole(i,j)}>
                  Eliminar
                </button>

              </div>

            ))}

            <button onClick={() => addRole(i)}>
              Añadir Rol
            </button>

          </div>

          {/* RULES */}

          <div style={{marginTop:"10px"}}>

            <h4>Reglas</h4>

            {(p.rules || []).map((rule, j) => (

              <div key={j}>

                <input
                  value={rule || ""}
                  onChange={e => updateRule(i,j,e.target.value)}
                  placeholder="Rule"
                />

                <button onClick={() => removeRule(i,j)}>
                  Eliminar
                </button>

              </div>

            ))}

            <button onClick={() => addRule(i)}>
              Añadir Regla
            </button>

          </div>

          {/* ARTIFACTS */}

          <div style={{marginTop:"10px"}}>

            <h4>Artefactos</h4>

            {(p.artifacts || []).map((a, j) => (

              <div key={j}>

                <input
                  value={a.id || ""}
                  onChange={e => updateArtifact(i,j,"id",e.target.value)}
                  placeholder="Artifact ID"
                />

                <input
                  value={a.name || ""}
                  onChange={e => updateArtifact(i,j,"name",e.target.value)}
                  placeholder="Nombre"
                />

                <input
                  value={a.category || ""}
                  onChange={e => updateArtifact(i,j,"category",e.target.value)}
                  placeholder="Categoría"
                />

                <button onClick={() => removeArtifact(i,j)}>
                  Eliminar
                </button>

              </div>

            ))}

            <button onClick={() => addArtifact(i)}>
              Añadir Artefacto
            </button>

          </div>

        </div>

      ))}

      <button onClick={addPractice}>
        Añadir Práctica
      </button>

    </div>

  )
}

export default PracticesSection
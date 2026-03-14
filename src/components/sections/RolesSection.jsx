import { useModelContext } from "../../context/ModelContext"

function RolesSection() {

  const { model, setModel } = useModelContext()

  const addRole = () => {

    const newRole = {
      id: "",
      name: ""
    }

    setModel({
      ...model,
      roles: [...model.roles, newRole]
    })
  }

  const updateRole = (index, field, value) => {

    const updatedRoles = [...model.roles]

    updatedRoles[index] = {
      ...updatedRoles[index],
      [field]: value
    }

    setModel({
      ...model,
      roles: updatedRoles
    })
  }

  const removeRole = (index) => {

    const updatedRoles = model.roles.filter((_, i) => i !== index)

    setModel({
      ...model,
      roles: updatedRoles
    })
  }

  return (
    <div>

      <h3>Roles</h3>

      {(model.roles || []).map((r, i) => (

        <div key={i}>

          <input
            value={r.id || ""}
            onChange={e => updateRole(i, "id", e.target.value)}
            placeholder="ID"
          />

          <input
            value={r.name || ""}
            onChange={e => updateRole(i, "name", e.target.value)}
            placeholder="Nombre"
          />

          <button onClick={() => removeRole(i)}>
            Eliminar
          </button>

        </div>

      ))}

      <button onClick={addRole}>
        Añadir Rol
      </button>

    </div>
  )
}

export default RolesSection
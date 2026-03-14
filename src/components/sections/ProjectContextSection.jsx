import { useModelContext } from "../../context/ModelContext"

function ProjectContextSection() {

  const { model, setModel } = useModelContext()

  const context = model.projectContext || {
    projectSize: "",
    criticality: "",
    regulatoryConstraints: false,
    distributedTeam: false
  }

  const updateContext = (field, value) => {

    setModel({
      ...model,
      projectContext: {
        ...context,
        [field]: value
      }
    })

  }

  return (

    <div>

      <h3>Contexto del Proyecto</h3>

      <div>
        <input
          value={context.projectSize || ""}
          onChange={e => updateContext("projectSize", e.target.value)}
          placeholder="Tamaño del Proyecto"
        />
      </div>

      <div>
        <input
          value={context.criticality || ""}
          onChange={e => updateContext("criticality", e.target.value)}
          placeholder="Criticidad"
        />
      </div>

       </div>

     

  )
}

export default ProjectContextSection
import { useModelContext } from "../../context/ModelContext";

function ProjectContextSection() {

  const { model, setModel } = useModelContext();

  const contexts = model.projectContext || [];

  const addContext = () => {

    setModel({
      ...model,
      projectContext: [...contexts, ""]
    });
  };

  const updateContext = (index, value) => {

    const updated = [...contexts];
    updated[index] = value;

    setModel({
      ...model,
      projectContext: updated
    });
  };

  const removeContext = (index) => {

    const updated = contexts.filter((_, i) => i !== index);

    setModel({
      ...model,
      projectContext: updated
    });
  };

  return (
    <div>
      <h3>Contexto del Proyecto</h3>

      {contexts.map((c, i) => (
        <div key={i}>

          <input
            value={c || ""}
            onChange={e => updateContext(i, e.target.value)}
            placeholder="Describe el contexto del proyecto"
          />

          <button onClick={() => removeContext(i)}>
            Eliminar
          </button>

        </div>
      ))}

      <button onClick={addContext}>
        Añadir Contexto
      </button>

    </div>
  );
}

export default ProjectContextSection;
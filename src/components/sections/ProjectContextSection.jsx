import { useModelContext } from "../../context/ModelContext";
import "../../styles/ModelEditor.css";

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
    <div className="context-section">

      <h3 className="section-title">
        Contexto del Proyecto
      </h3>

      <div className="context-list">
        {contexts.map((c, i) => (
          <div key={i} className="context-row">

            <input
              className="context-input"
              value={c || ""}
              onChange={e => updateContext(i, e.target.value)}
              placeholder="Ej: equipo distribuido, alta regulación..."
            />

            <button
              className="button-remove"
              onClick={() => removeContext(i)}
            >
              Eliminar
            </button>

          </div>
        ))}
      </div>

<button className="button-primary btn-add-context" onClick={addContext}>
  Añadir Contexto
</button>
    </div>
  );
}

export default ProjectContextSection;
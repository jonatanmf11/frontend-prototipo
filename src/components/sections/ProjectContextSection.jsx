import { useModelContext } from "../../context/ModelContext";
import FormSection from "../../utils/FormSection";

function ProjectContextSection({ fieldErrors, setFieldErrors }) {
  const { model, setModel } = useModelContext();

  const context = model.projectContext || {
    projectSize: "",
    criticality: "",
    regulatoryConstraints: false,
    distributedTeam: false,
  };

  const setItems = (updatedItems) => {
    if (updatedItems?.length > 0) {
      setModel({
        ...model,
        projectContext: updatedItems[0],
      });
    }
  };

  const fields = [
    {
      name: "projectSize",
      label: "Tamaño del Proyecto",
      placeholder: "Tamaño del Proyecto",
      type: "text",
      flex: "1 1 45%",
    },
    {
      name: "criticality",
      label: "Criticidad",
      placeholder: "Criticidad",
      type: "text",
      flex: "1 1 45%",
    },
  ];

  return (
    <FormSection
      title="Contexto del Proyecto"
      helpText="Define las características del entorno del proyecto."
      items={[context]}
      setItems={setItems}
      fields={fields}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      layout="row"
      showAddButton={false}
      showRemoveButton={false}
    />
  );
}

export default ProjectContextSection;
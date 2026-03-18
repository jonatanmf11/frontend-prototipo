import { useModelContext } from "../../context/ModelContext";
import FormSection from "../../utils/FormSection";

function RelationsSection({ fieldErrors, setFieldErrors }) {
  const { model, setModel } = useModelContext();

  const relations = model.compatibilityRelations || [];

  const setItems = (updatedItems) => {
    setModel({
      ...model,
      compatibilityRelations: updatedItems,
    });
  };

  const fields = [
    {
      name: "practiceA",
      label: "Práctica A",
      placeholder: "Practice A",
      type: "text",
      flex: "1 1 30%",
    },
    {
      name: "practiceB",
      label: "Práctica B",
      placeholder: "Practice B",
      type: "text",
      flex: "1 1 30%",
    },
    {
      name: "type",
      label: "Tipo",
      placeholder: "Tipo de relación",
      type: "text",
      flex: "1 1 30%",
    },
  ];

  return (
    <FormSection
      title="Relaciones de Compatibilidad"
      helpText="Define cómo se relacionan las prácticas entre sí dentro del proceso híbrido."
      items={relations}
      setItems={setItems}
      fields={fields}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      layout="row"
      addButtonText="Añadir Relación"
    />
  );
}

export default RelationsSection;
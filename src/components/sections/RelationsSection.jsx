import { useModelContext } from "../../context/ModelContext";
import FormSection from "../../utils/FormSection";

function RelationsSection({ fieldErrors, setFieldErrors }) {
  const { model, setModel } = useModelContext();

  const relations = model.compatibilityRelations || [];

  
  const practiceOptions = (model.practices || []).map(p => ({
    value: p.id,
    label: `${p.id} - ${p.name}` 
  }));

  
  const setItems = (updatedItems) => {
    const normalized = updatedItems.map(item => ({
      ...item,
      type: "Sequential"
    }));

    setModel({
      ...model,
      compatibilityRelations: normalized,
    });
  };

  const fields = [
    {
      name: "practiceA",
      label: "Práctica A",
      type: "select", 
      options: practiceOptions,
      flex: "1 1 45%",
    },
    {
      name: "practiceB",
      label: "Práctica B",
      type: "select",
      options: practiceOptions,
      flex: "1 1 45%",
    }
  ];

return (
  <>
    {fieldErrors.relations && (
      <p style={{ color: "#e74c3c", marginBottom: "10px", fontWeight: 500 }}>
        Debes agregar al menos una relación de compatibilidad
      </p>
    )}

    <FormSection
      title="Relaciones de Compatibilidad"
      helpText="Selecciona prácticas existentes para definir relaciones secuenciales."
      infoButton="Define una relación secuencial entre prácticas. La Práctica B se ejecuta después de la Práctica A, estableciendo un orden dentro del proceso."
      items={relations}
      setItems={setItems}
      fields={fields}
      fieldErrors={fieldErrors}
      setFieldErrors={setFieldErrors}
      layout="row"
      addButtonText="Añadir Relación"
    />
  </>
);
}

export default RelationsSection;
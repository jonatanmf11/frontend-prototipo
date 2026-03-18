import React from "react";
import { useModelContext } from "../../context/ModelContext";
import FormSection from "../../utils/FormSection";

export default function GeneralInfoSection({ step, fieldErrors, setFieldErrors }) {
  const { model, setModel } = useModelContext();

  if (!model) return <div>Loading model...</div>;

  const fields = [
    { name: "id", label: "ID", placeholder: "Ingrese ID", type: "text", flex: "1 1 45%"  },
    { name: "name", label: "Nombre", placeholder: "Ingrese nombre", type: "text", flex: "1 1 45%" },
    { name: "description", label: "Descripción", placeholder: "Ingrese descripción", type: "text", flex: "1 1 45%" },
    { name: "version", label: "Versión", placeholder: "Ingrese versión", type: "text", flex: "1 1 45%"  },
  ];


  const items = [model]; 
  const setItems = (updatedItems) => {
    if (updatedItems?.length > 0) setModel(updatedItems[0]);
  };

  return (
    <div >

        <FormSection
        title="Información General"
        helpText="Define el nombre y descripción del proceso híbrido que deseas evaluar."
        items={items}
        setItems={setItems}
        fields={fields}
        fieldErrors={fieldErrors}
        setFieldErrors={setFieldErrors}
        layout="row"       // para poner los inputs en fila
        showAddButton={false} 
        showRemoveButton={false}
      />
    </div>
  );
}
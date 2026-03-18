import React from "react";
import { useModelContext } from "../../context/ModelContext";
import FormSection from "../../utils/FormSection";

export default function PracticesSection() {
  const { model, setModel, fieldErrors, setFieldErrors } = useModelContext();

  const practices = model.practices || [];

  const handlePracticesChange = (updated) => {
    setModel({ ...model, practices: updated });
  };

  const practiceFields = [
    { name: "id", label: "ID", placeholder: "Practice ID", type: "text" },
    { name: "name", label: "Nombre", placeholder: "Nombre", type: "text" },
    {
      name: "type",
      label: "Tipo",
      type: "select",
      options: [
        { label: "Agile", value: "agile" },
        { label: "Traditional", value: "traditional" },
      ],
    },
  ];

  // Sub-secciones: Actividades, Roles, Reglas, Artefactos
  const subFields = {
    activities: [
      { name: "id", label: "ID", placeholder: "Activity ID", type: "text" },
      { name: "name", label: "Nombre", placeholder: "Nombre", type: "text" },
      {
        name: "type",
        label: "Tipo",
        type: "select",
        options: [
          { label: "Agile", value: "agile" },
          { label: "Traditional", value: "traditional" },
        ],
      },
    ],
    roles: [
      { name: "id", label: "ID", placeholder: "Role ID", type: "text" },
      { name: "name", label: "Nombre", placeholder: "Nombre", type: "text" },
    ],
    rules: [{ name: "rule", label: "Regla", placeholder: "Regla", type: "text" }],
    artifacts: [
      { name: "id", label: "ID", placeholder: "Artifact ID", type: "text" },
      { name: "name", label: "Nombre", placeholder: "Nombre", type: "text" },
      { name: "category", label: "Categoría", placeholder: "Categoría", type: "text" },
    ],
  };

  return (
    <div className="section-card">
      <h3>Prácticas</h3>

      {practices.map((p, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "6px",
          }}
        >
          {/* Práctica principal */}
          <FormSection
            title={`Práctica #${i + 1}`}
            items={[p]}
            setItems={(items) => {
              const updated = [...practices];
              updated[i] = items[0];
              handlePracticesChange(updated);
            }}
            fields={practiceFields}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            layout="row"
            showAddButton={false} // no mostrar el botón aquí
          />

          {/* Sub-secciones */}
          <FormSection
            title="Actividades"
            items={p.activities || []}
            setItems={(items) => {
              const updated = [...practices];
              updated[i].activities = items;
              handlePracticesChange(updated);
            }}
            fields={subFields.activities}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            layout="row"
            addButtonText="Añadir Actividad"
          />

          <FormSection
            title="Roles"
            items={p.roles || []}
            setItems={(items) => {
              const updated = [...practices];
              updated[i].roles = items;
              handlePracticesChange(updated);
            }}
            fields={subFields.roles}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            layout="row"
            addButtonText="Añadir Rol"
          />

          <FormSection
            title="Reglas"
            items={p.rules || []}
            setItems={(items) => {
              const updated = [...practices];
              updated[i].rules = items;
              handlePracticesChange(updated);
            }}
            fields={subFields.rules}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            layout="row"
            addButtonText="Añadir Regla"
          />

          <FormSection
            title="Artefactos"
            items={p.artifacts || []}
            setItems={(items) => {
              const updated = [...practices];
              updated[i].artifacts = items;
              handlePracticesChange(updated);
            }}
            fields={subFields.artifacts}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            layout="row"
            addButtonText="Añadir Artefacto"
          />
        </div>
      ))}

      {/* Botón general para añadir práctica al final */}
      <button
        onClick={() => {
          const newPractice = {
            id: "",
            name: "",
            type: "agile",
            activities: [],
            roles: [],
            rules: [],
            artifacts: [],
          };
          handlePracticesChange([...practices, newPractice]);
        }}
        style={{ marginTop: "10px" }}
      >
        Añadir Práctica
      </button>
    </div>
  );
}
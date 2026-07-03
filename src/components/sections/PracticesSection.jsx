import React, { useState } from "react";
import { useModelContext } from "../../context/ModelContext";
import FormSection from "../../utils/FormSection";

export default function PracticesSection() {
  const { model, setModel, fieldErrors, setFieldErrors } = useModelContext();

  const practices = model.practices || [];

  const [openPractice, setOpenPractice] = useState(null);

  const handlePracticesChange = (updated) => {
    setModel({ ...model, practices: updated });
  };

  const removePractice = (index) => {
    const updated = practices.filter((_, i) => i !== index);
    handlePracticesChange(updated);

    if (openPractice === index) {
      setOpenPractice(null);
    }
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
        { label: "Hybrid", value: "hybrid" },
      ],
    },
  ];

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
          { label: "Hybrid", value: "hybrid" },
        ],
      },
      {
    name: "mustPrecede",
    label: "Debe preceder a (IDs separados por coma)",
    placeholder: "Ej: A_INTEG_CONTINUA, A_SPR_REVIEW",
    type: "text",
    },
    ],
    roles: [
      { name: "id", label: "ID", placeholder: "Role ID", type: "text" },
      { name: "name", label: "Nombre", placeholder: "Nombre", type: "text" },
    ],
    rules: [
      {
        name: "rule",
        label: "Regla",
        placeholder: "Regla",
        type: "text",
      },
    ],
    artifacts: [
      { name: "id", label: "ID", placeholder: "Artifact ID", type: "text" },
      { name: "name", label: "Nombre", placeholder: "Nombre", type: "text" },
      {
        name: "category",
        label: "Categoría",
        placeholder: "Categoría",
        type: "text",
      },
    ],
  };

  return (
    <div className="section-card">
      <h3>Prácticas</h3>

      {practices.map((p, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #dcdfe4",
            borderRadius: "10px",
            marginBottom: "20px",
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}
        >
          {/* Encabezado del acordeón */}
          <div
            onClick={() =>
              setOpenPractice(openPractice === i ? null : i)
            }
            style={{
              background: "#f5f7fa",
              padding: "16px 20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>
                {p.name?.trim()
                  ? p.name
                  : `Práctica #${i + 1}`}
              </strong>
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {openPractice === i ? "▲" : "▼"}
            </div>
          </div>

          {/* Contenido */}
          {openPractice === i && (
            <div style={{ padding: "20px" }}>
              {/* Información principal */}
              <FormSection
                title="Información General"
                items={[p]}
                setItems={(items) => {
                  const updated = [...practices];
                  updated[i] =
                    items[0] || {
                      id: "",
                      name: "",
                      type: "agile",
                      activities: [],
                      roles: [],
                      rules: [],
                      artifacts: [],
                    };

                  handlePracticesChange(updated);
                }}
                fields={practiceFields}
                fieldErrors={fieldErrors}
                setFieldErrors={setFieldErrors}
                layout="row"
                showAddButton={false}
                showRemoveButton={false}
              />

              {/* Botón eliminar */}
              <button
                onClick={() => removePractice(i)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                Eliminar Práctica
              </button>

              {/* Actividades */}
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

              {/* Roles */}
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

              {/* Reglas */}
              <FormSection
                title="Reglas"
                items={(p.rules || []).map((r) =>
                  typeof r === "string" ? { rule: r } : r
                )}
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

              {/* Artefactos */}
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
          )}
        </div>
      ))}

      {/* Añadir práctica */}
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

          // abre automáticamente la nueva práctica
          setOpenPractice(practices.length);
        }}
        style={{
          marginTop: "10px",
        }}
      >
        Añadir Práctica
      </button>
    </div>
  );
}
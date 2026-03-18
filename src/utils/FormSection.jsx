import React from "react";

export default function FormSection({
    title,
    items,
    setItems,
    fields,
    fieldErrors,
    setFieldErrors,
    layout = "column", // "column" o "row"
    addButtonText, // Texto personalizado para el botón "Añadir"
    sectionColor = "#3a6ea5", // color del borde lateral
    showAddButton = true,
    showRemoveButton = true,
    helpText
}) {
    const handleChange = (index, fieldName, value) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [fieldName]: value };
        setItems(updated);

        const key = `${index}_${fieldName}`;
        if (fieldErrors[key] && value.trim() !== "") {
            const newErrors = { ...fieldErrors };
            delete newErrors[key];
            setFieldErrors(newErrors);
        }
    };

    const removeItem = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);

        const newErrors = { ...fieldErrors };
        Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`${index}_`)) delete newErrors[key];
        });
        setFieldErrors(newErrors);
    };

    const isInvalid = (index, fieldName) =>
        fieldErrors && fieldErrors[`${index}_${fieldName}`];

    return (
        <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#34495e" }}>{title}</h3>

            {helpText && (
                <p className="section-help">
                    {helpText}
                </p>
            )}

            {(items || []).map((item, i) => (
                <div
                    key={i}
                    className="section-card"
                    style={{
                        borderLeft: `6px solid ${sectionColor}`,
                        padding: "16px",
                        display: "flex",
                        flexDirection: layout === "row" ? "row" : "column",
                        gap: "12px",
                        flexWrap: "wrap",
                    }}
                >
                    {fields.map((f) => (
                        <div
                            key={f.name}
                            className="form-field"
                            style={{
                                flex: f.flex || "1 1 200px",
                                flexDirection: "column",
                            }}
                        >
                            {f.label && <label>{f.label}</label>}

                            {f.type === "select" ? (
                                <select
                                    value={item[f.name] || ""}
                                    onChange={(e) => handleChange(i, f.name, e.target.value)}
                                    style={{
                                        border: isInvalid(i, f.name)
                                            ? "2px solid #e74c3c"
                                            : "1px solid #d6d6d6",
                                    }}
                                >
                                    {f.options.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    value={item[f.name] || ""}
                                    placeholder={f.placeholder || f.label}
                                    onChange={(e) => handleChange(i, f.name, e.target.value)}
                                    style={{
                                        border: isInvalid(i, f.name)
                                            ? "2px solid #e74c3c"
                                            : "1px solid #d6d6d6",
                                    }}
                                />
                            )}

                            {isInvalid(i, f.name) && (
                                <span style={{ color: "#e74c3c", fontSize: 12 }}>
                                    Este campo es requerido
                                </span>
                            )}
                        </div>
                    ))}

                    {showRemoveButton && (
                        <button
                            type="button"
                            onClick={() => removeItem(i)}
                            style={{
                                backgroundColor: "#e74c3c",
                                color: "white",
                                padding: "8px 14px",
                                borderRadius: "6px",
                                height: "40px",
                                alignSelf: layout === "row" ? "center" : "flex-start",
                            }}
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            ))}

            {showAddButton && (
                <button
                    type="button"
                    onClick={() =>
                        setItems([
                            ...(items || []),
                            fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
                        ])
                    }
                    style={{
                        marginTop: "10px",
                        backgroundColor: "#3a6ea5",
                        color: "white",
                        padding: "10px 18px",
                        borderRadius: "6px",
                    }}
                >
                    {addButtonText || `Añadir ${title.slice(0, -1)}`}
                </button>
            )}
        </div>
    );
}
import React, { useState } from "react";
import { useModelContext } from "../context/ModelContext";

import GeneralInfoSection from "./sections/GeneralInfoSection";
import PracticesSection from "./sections/PracticesSection";
import RelationsSection from "./sections/RelationsSection";
import ContextSection from "./sections/ProjectContextSection";

import ICFPairsEditor from "./metrics/ICFPairsEditor";
import CAFEditor from "./metrics/CAFEditor";
import CPTEditor from "./metrics/CPTEditor";
import MismatchEditor from "./metrics/MismatchEditor";

import EvaluationPanel from "./EvaluationPanel";

import "../styles/ModelEditor.css";

export default function ModelEditor() {
  const modelHook = useModelContext();
  const { loading, model, setModel } = modelHook;

  const [step, setStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState({});
  const totalSteps = 6;

  const stepLabels = [
    "General",
    "Prácticas",
    "Relaciones",
    "Contexto",
    "Métricas",
    "Evaluación"
  ];

  if (loading) return <p>Cargando modelo...</p>;

  // ---------------- VALIDACIÓN ----------------
  const validateStep = () => {
    const errors = {};

    switch (step) {
      case 1:
        if (!model.id) errors["0_id"] = true;
        if (!model.name) errors["0_name"] = true;
        break;

      case 2:
        if (!model.practices || model.practices.length === 0) {
          errors.practices = true;
        }
        break;

      case 3:
        const relations = model.compatibilityRelations || [];

        if (relations.length === 0) {
          errors.relations = true;
        }

        relations.forEach((rel, index) => {
          if (!rel.practiceA) errors[`${index}_practiceA`] = true;
          if (!rel.practiceB) errors[`${index}_practiceB`] = true;
          if (!rel.type) errors[`${index}_type`] = true;
        });
        break;

      case 4:
        const contexts = model.projectContext || [];

        const hasValid = contexts.some(c => c && c.trim() !== "");

        if (!hasValid) {
          errors.context = true;
        }
        break;

      default:
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ---------------- NAVEGACIÓN ----------------
  const goToStep = (targetStep) => {
    if (targetStep < step) {
      setStep(targetStep);
      return;
    }

    if (validateStep()) {
      setStep(targetStep);
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // ---------------- HANDLERS ----------------
  const handleFieldChange = (field, value) => {
    setModel({ ...model, [field]: value });

    if (fieldErrors[field]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[field];
      setFieldErrors(newErrors);
    }
  };

  // ---------------- RENDER PASOS ----------------
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="section-card">
            <GeneralInfoSection
              step={step}
              fieldErrors={fieldErrors}
              model={model}
              setModel={setModel}
              handleFieldChange={handleFieldChange}
            />
          </div>
        );

      case 2:
        return (
          <div className="section-card">
            <PracticesSection
              step={step}
              fieldErrors={fieldErrors}
              model={model}
              setModel={setModel}
              handleFieldChange={handleFieldChange}
            />
          </div>
        );

      case 3:
        return (
          <div className="section-card">
            <RelationsSection
              step={step}
              fieldErrors={fieldErrors}
              model={model}
              setModel={setModel}
              handleFieldChange={handleFieldChange}
            />
          </div>
        );

      case 4:
        return (
          <div className="section-card">
            <ContextSection
              step={step}
              fieldErrors={fieldErrors}
              model={model}
              setModel={setModel}
              handleFieldChange={handleFieldChange}
            />
          </div>
        );

      case 5:
        return (
          <>
            <div className="section-card"><ICFPairsEditor /></div>
            <div className="section-card"><CAFEditor /></div>
            <div className="section-card"><CPTEditor /></div>
            <div className="section-card"><MismatchEditor /></div>
          </>
        );

      case 6:
        return (
          <div className="editor-container">
            <EvaluationPanel />
          </div>
        );

      default:
        return null;
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="editor-container">
      <h1 className="editor-title">Herramienta de Evaluación - CHAPLIN</h1>
      <p className="editor-text">Paso {step} de {totalSteps}</p>

      {/* 🔹 Barra de pasos clickeable */}
      <div className="stepper">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div
              key={stepNumber}
              className="stepper-item"
              onClick={() => goToStep(stepNumber)}
            >
              <div
                className={`step-circle 
            ${isActive ? "active" : ""} 
            ${isCompleted ? "completed" : ""}
          `}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              <span className="step-label">{label}</span>

              {stepNumber !== totalSteps && (
                <div
                  className={`step-line ${step > stepNumber ? "completed" : ""
                    }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {renderStep()}

      {/* 🔹 Botones */}
      <div className="navigation-buttons">
        {step > 1 && (
          <button className="button-secondary" onClick={handleBack}>
            Anterior
          </button>
        )}

        {step < totalSteps && (
          <button onClick={handleNext}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
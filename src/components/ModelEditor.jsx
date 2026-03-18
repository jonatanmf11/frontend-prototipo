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
  const { loading, model } = modelHook;

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [evaluationType, setEvaluationType] = useState(null);
  const totalSteps = 6;

  if (loading) return <p>Cargando modelo...</p>;

  const validateStep = () => {
    setError("");

    switch (step) {
      case 1:
        if (!model.name) {
          setError("Debes ingresar el nombre del proceso.");
          return false;
        }
        return true;

      case 2:
        if (!model.practices || model.practices.length === 0) {
          setError("Debes agregar al menos una práctica.");
          return false;
        }
        return true;

      case 3:
        if (!model.compatibilityRelations || model.compatibilityRelations.length === 0) {
          setError("Debes definir relaciones entre prácticas.");
          return false;
        }
        return true;

      case 4:
        if (!model.projectContext || !model.projectContext.projectSize) {
          setError("Debes definir el contexto del proyecto.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {

    switch (step) {

      case 1:
        return <div className="section-card"><GeneralInfoSection {...modelHook} /></div>;

      case 2:
        return <div className="section-card"><PracticesSection {...modelHook} /></div>;

      case 3:
        return <div className="section-card"><RelationsSection {...modelHook} /></div>;

      case 4:
        return <div className="section-card"><ContextSection {...modelHook} /></div>;

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

  return (
    <div className="editor-container">

      <h1 className="editor-title">
        Herramienta de Evaluación - CHAPLIN
      </h1>

      <p className="editor-text">
        Paso {step} de {totalSteps}
      </p>

      <div className="progress-bar">
  <div
    className="progress"
    style={{ width: `${(step / totalSteps) * 100}%` }}
  />
</div>


      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {renderStep()}

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
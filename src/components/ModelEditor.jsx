import { useModelContext } from "../context/ModelContext"

import GeneralInfoSection from "./sections/GeneralInfoSection"
import RolesSection from "./sections/RolesSection"
import PracticesSection from "./sections/PracticesSection"
import RelationsSection from "./sections/RelationsSection"
import ContextSection from "./sections/ProjectContextSection"
import JsonPreview from "./sections/JsonPreview"

import ICFPairsEditor from "./metrics/ICFPairsEditor"
import CAFEditor from "./metrics/CAFEditor"
import CPTEditor from "./metrics/CPTEditor"
import MismatchEditor from "./metrics/MismatchEditor"
import "../styles/ModelEditor.css"

export default function ModelEditor() {

  const modelHook = useModelContext()
  const { loading } = modelHook

  if (loading) {
    return <p>Cargando modelo...</p>
  }

  return (

    <div className="editor-container">

      <h1 className="editor-title">
        Editor del Modelo
      </h1>

      <div className="section-card section-general">
        <GeneralInfoSection {...modelHook} />
      </div>

      <div className="section-card section-roles">
        <RolesSection {...modelHook} />
      </div>

      <div className="section-card section-practices">
        <PracticesSection {...modelHook} />
      </div>

      <div className="section-card section-relations">
        <RelationsSection {...modelHook} />
      </div>

      <div className="section-card section-context">
        <ContextSection {...modelHook} />
      </div>

      {/* editores de métricas */}

      <div className="section-card">
        <ICFPairsEditor />
      </div>

      <div className="section-card">
        <CAFEditor />
      </div>

      <div className="section-card">
        <CPTEditor />
      </div>

      <div className="section-card">
        <MismatchEditor />
      </div>

    </div>
  )
}
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

export default function ModelEditor() {

  const modelHook = useModelContext()

  const { loading } = modelHook

  if (loading) {
    return <p>Cargando modelo...</p>
  }

  return (

    <div>

      <h1>Editor del Modelo</h1>

      <GeneralInfoSection {...modelHook} />
      <RolesSection {...modelHook} />
      <PracticesSection {...modelHook} />
      <RelationsSection {...modelHook} />
      <ContextSection {...modelHook} />

      {/* -------- editores de metricas  -------- */}

      <ICFPairsEditor />

      <CAFEditor />

      <CPTEditor />

      <MismatchEditor />

    </div>

  )

}
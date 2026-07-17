import { createContext, useContext, useState, useEffect } from "react"

import {
  fetchBaseModel,
  fetchICFPairs,
  fetchCAFDocumentation,
  fetchCPTWorkProducts,
  fetchMismatchCharacteristics
} from "../servicest/evaluationService"

const ModelContext = createContext()

/* ---------------- INITIAL MODEL ---------------- */

const initialModel = {
  id: "",
  name: "",
  description: "",
  version: "1.0",
  practices: [],
  roles: [],
  compatibilityRelations: [],
  projectContext: {
    projectSize: "",
    criticality: "",
    regulatory: ""
  }
}

/* ---------------- CONTEXT PROVIDER ---------------- */

export function ModelProvider({ children }) {

  const [model, setModelState] = useState(initialModel)
  const [icfPairs, setIcfPairsState] = useState([])
  const [cafDocumentation, setCafDocumentationState] = useState(null)
  const [cptData, setCptDataState] = useState(null)
  const [mismatchData, setMismatchDataState] = useState(null)
  const [loading, setLoading] = useState(true)

  // Setters simples — sin localStorage
  const setModel = (value) => setModelState(value)
  const setIcfPairs = (value) => setIcfPairsState(value)
  const setCafDocumentation = (value) => setCafDocumentationState(value)
  const setCptData = (value) => setCptDataState(value)
  const setMismatchData = (value) => setMismatchDataState(value)

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {

    async function loadInitialData() {
      try {

        // Siempre carga desde el backend — sin caché
        const baseModel = await fetchBaseModel()
        if (baseModel) setModelState(baseModel)

        const pairs = await fetchICFPairs()
        if (pairs) setIcfPairsState(pairs)

        const caf = await fetchCAFDocumentation()
        if (caf) setCafDocumentationState(caf)

        const cpt = await fetchCPTWorkProducts()
        if (cpt) setCptDataState(cpt)

        const mismatch = await fetchMismatchCharacteristics()
        if (mismatch) setMismatchDataState(mismatch)

      } catch (error) {
        console.error("Error loading initial data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  /* ---------------- CONTEXT VALUE ---------------- */

  return (
    <ModelContext.Provider value={{
      model,
      setModel,
      icfPairs,
      setIcfPairs,
      cafDocumentation,
      setCafDocumentation,
      cptData,
      setCptData,
      mismatchData,
      setMismatchData,
      loading,

      // Reset al estado inicial (sin tocar localStorage)
      clearStorage: () => {
        setModelState(initialModel)
        setIcfPairsState([])
        setCafDocumentationState(null)
        setCptDataState(null)
        setMismatchDataState(null)
      }
    }}>
      {children}
    </ModelContext.Provider>
  )
}

/* ---------------- HOOK ---------------- */

export const useModelContext = () => useContext(ModelContext)
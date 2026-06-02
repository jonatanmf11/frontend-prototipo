import { createContext, useContext, useState, useEffect } from "react"

import {
  fetchBaseModel,
  fetchICFPairs,
  fetchCAFDocumentation,
  fetchCPTWorkProducts,
  fetchMismatchCharacteristics
} from "../servicest/evaluationService"

const ModelContext = createContext()

// Claves para localStorage
const STORAGE_KEYS = {
  model: "chaplin_model",
  icfPairs: "chaplin_icfPairs",
  cafDocumentation: "chaplin_cafDocumentation",
  cptData: "chaplin_cptData",
  mismatchData: "chaplin_mismatchData",
}

//   Helpers para leer/guardar con seguridad
const loadFromStorage = (key) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn("No se pudo guardar en localStorage:", e)
  }
}

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

  //   Wrappers que guardan en localStorage al actualizar
  const setModel = (value) => {
    setModelState(value)
    saveToStorage(STORAGE_KEYS.model, value)
  }

  const setIcfPairs = (value) => {
    setIcfPairsState(value)
    saveToStorage(STORAGE_KEYS.icfPairs, value)
  }

  const setCafDocumentation = (value) => {
    setCafDocumentationState(value)
    saveToStorage(STORAGE_KEYS.cafDocumentation, value)
  }

  const setCptData = (value) => {
    setCptDataState(value)
    saveToStorage(STORAGE_KEYS.cptData, value)
  }

  const setMismatchData = (value) => {
    setMismatchDataState(value)
    saveToStorage(STORAGE_KEYS.mismatchData, value)
  }

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {

    async function loadInitialData() {
      try {

        //   Para cada dato: primero localStorage, si no hay → servicio
        const storedModel = loadFromStorage(STORAGE_KEYS.model)
        if (storedModel) {
          setModelState(storedModel)
        } else {
          const baseModel = await fetchBaseModel()
          if (baseModel) setModel(baseModel) // usa el wrapper para guardarlo
        }

        const storedPairs = loadFromStorage(STORAGE_KEYS.icfPairs)
        if (storedPairs) {
          setIcfPairsState(storedPairs)
        } else {
          const pairs = await fetchICFPairs()
          if (pairs) setIcfPairs(pairs)
        }

        const storedCaf = loadFromStorage(STORAGE_KEYS.cafDocumentation)
        if (storedCaf) {
          setCafDocumentationState(storedCaf)
        } else {
          const caf = await fetchCAFDocumentation()
          if (caf) setCafDocumentation(caf)
        }

        const storedCpt = loadFromStorage(STORAGE_KEYS.cptData)
        if (storedCpt) {
          setCptDataState(storedCpt)
        } else {
          const cpt = await fetchCPTWorkProducts()
          if (cpt) setCptData(cpt)
        }

        const storedMismatch = loadFromStorage(STORAGE_KEYS.mismatchData)
        if (storedMismatch) {
          setMismatchDataState(storedMismatch)
        } else {
          const mismatch = await fetchMismatchCharacteristics()
          if (mismatch) setMismatchData(mismatch)
        }

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

      //   Función para limpiar todo si necesitas un "reset"
      clearStorage: () => {
        Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k))
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
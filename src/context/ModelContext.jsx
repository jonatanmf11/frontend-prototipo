import { createContext, useContext, useState, useEffect } from "react"

import {
  fetchBaseModel,
  fetchICFPairs,
  fetchCAFDocumentation,
  fetchCPTWorkProducts,
  fetchMismatchCharacteristics
} from "../servicest/evaluationService"

const ModelContext = createContext()

const STORAGE_KEYS = {
  model: "chaplin_model",
  icfPairs: "chaplin_icfPairs",
  cafDocumentation: "chaplin_cafDocumentation",
  cptData: "chaplin_cptData",
  mismatchData: "chaplin_mismatchData",
}

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

export function ModelProvider({ children }) {

  const [model, setModelState] = useState(initialModel)
  const [icfPairs, setIcfPairsState] = useState([])
  const [cafDocumentation, setCafDocumentationState] = useState(null)
  const [cptData, setCptDataState] = useState(null)
  const [mismatchData, setMismatchDataState] = useState(null)
  const [loading, setLoading] = useState(true)

  // ── setModel: guarda el modelo Y sincroniza secuencias del CAF ──
  const setModel = (value) => {
    setModelState(value)
    saveToStorage(STORAGE_KEYS.model, value)

    // Patrón funcional: lee el CAF más reciente sin depender de closures
    setCafDocumentationState(prev => {
      if (!prev) return prev

      const relacionesNuevas = value.compatibilityRelations || []

      const nuevasSecuencias = relacionesNuevas.map(rel => {
        const existente = (prev.sequence || []).find(
          s => s.practiceA === rel.practiceA && s.practiceB === rel.practiceB
        )
        return {
          practiceA: rel.practiceA,
          practiceB: rel.practiceB,
          documented: existente ? existente.documented : false
        }
      })

      const cafActualizado = { ...prev, sequence: nuevasSecuencias }

      // Persistir en localStorage también
      saveToStorage(STORAGE_KEYS.cafDocumentation, cafActualizado)

      console.log(
        "[CHAPLIN] Secuencias CAF sincronizadas:",
        nuevasSecuencias.length,
        "→",
        nuevasSecuencias
      )

      return cafActualizado
    })
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

  useEffect(() => {
    async function loadInitialData() {
      try {

        // Cargar CAF primero para que setModel pueda sincronizar
        let cafInicial = null
        const storedCaf = loadFromStorage(STORAGE_KEYS.cafDocumentation)
        if (storedCaf) {
          cafInicial = storedCaf
          setCafDocumentationState(storedCaf)
        } else {
          const caf = await fetchCAFDocumentation()
          if (caf) {
            cafInicial = caf
            setCafDocumentationState(caf)
            saveToStorage(STORAGE_KEYS.cafDocumentation, caf)
          }
        }

        // Cargar modelo y sincronizar secuencias con el CAF ya cargado
        const storedModel = loadFromStorage(STORAGE_KEYS.model)
        if (storedModel) {
          setModelState(storedModel)
          saveToStorage(STORAGE_KEYS.model, storedModel)

          // Sincronizar manualmente en el arranque
          if (cafInicial) {
            const relaciones = storedModel.compatibilityRelations || []
            const nuevasSecuencias = relaciones.map(rel => {
              const existente = (cafInicial.sequence || []).find(
                s => s.practiceA === rel.practiceA && s.practiceB === rel.practiceB
              )
              return {
                practiceA: rel.practiceA,
                practiceB: rel.practiceB,
                documented: existente ? existente.documented : false
              }
            })
            const cafSincronizado = { ...cafInicial, sequence: nuevasSecuencias }
            setCafDocumentationState(cafSincronizado)
            saveToStorage(STORAGE_KEYS.cafDocumentation, cafSincronizado)
            console.log("[CHAPLIN] Arranque: secuencias sincronizadas:", nuevasSecuencias)
          }
        } else {
          const baseModel = await fetchBaseModel()
          if (baseModel) {
            setModelState(baseModel)
            saveToStorage(STORAGE_KEYS.model, baseModel)

            if (cafInicial) {
              const relaciones = baseModel.compatibilityRelations || []
              const nuevasSecuencias = relaciones.map(rel => ({
                practiceA: rel.practiceA,
                practiceB: rel.practiceB,
                documented: false
              }))
              const cafSincronizado = { ...cafInicial, sequence: nuevasSecuencias }
              setCafDocumentationState(cafSincronizado)
              saveToStorage(STORAGE_KEYS.cafDocumentation, cafSincronizado)
            }
          }
        }

        const storedPairs = loadFromStorage(STORAGE_KEYS.icfPairs)
        if (storedPairs) {
          setIcfPairsState(storedPairs)
        } else {
          const pairs = await fetchICFPairs()
          if (pairs) setIcfPairs(pairs)
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

export const useModelContext = () => useContext(ModelContext)
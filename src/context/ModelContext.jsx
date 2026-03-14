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

  const [model,setModel] = useState(initialModel)

  const [icfPairs,setIcfPairs] = useState([])

  const [cafDocumentation,setCafDocumentation] = useState(null)

  const [cptData,setCptData] = useState(null)

  const [loading,setLoading] = useState(true)
  
  const [mismatchData,setMismatchData] = useState(null)

/* ---------------- LOAD DATA ---------------- */

  useEffect(()=>{

    async function loadInitialData(){

      try{

        const baseModel = await fetchBaseModel()

        const pairs = await fetchICFPairs()

        const caf = await fetchCAFDocumentation()

        const cpt = await fetchCPTWorkProducts()

        const mismatch = await fetchMismatchCharacteristics()
        
        if(baseModel) setModel(baseModel)

        if(pairs) setIcfPairs(pairs)

        if(caf) setCafDocumentation(caf)
        
        if(cpt) setCptData(cpt)

        if(mismatch) setMismatchData(mismatch)

      }catch(error){

        console.error("Error loading initial data:",error)

      }finally{

        setLoading(false)

      }

    }

    loadInitialData()

  },[])

/* ---------------- CONTEXT VALUE ---------------- */

  return(

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
      loading

    }}>

      {children}

    </ModelContext.Provider>

  )

}

/* ---------------- HOOK ---------------- */

export const useModelContext = () => useContext(ModelContext)
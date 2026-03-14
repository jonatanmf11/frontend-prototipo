import { useState } from "react"

export function useModel(initialModel) {
  const [model, setModel] = useState(initialModel)

  /* =======================
     UTILIDADES
     ======================= */

  const updateField = (field, value) =>
    setModel(prev => ({ ...prev, [field]: value }))

  /* =======================
     ROLES
     ======================= */

  const addRole = () =>
    setModel(prev => ({
      ...prev,
      roles: [...prev.roles, { id: "", name: "", responsibilities: [] }]
    }))

  const updateRole = (i, field, value) =>
    setModel(prev => {
      const roles = [...prev.roles]
      roles[i][field] = value
      return { ...prev, roles }
    })

  const removeRole = i =>
    setModel(prev => ({
      ...prev,
      roles: prev.roles.filter((_, idx) => idx !== i)
    }))

  /* =======================
     PRACTICES
     ======================= */

  const addPractice = () =>
    setModel(prev => ({
      ...prev,
      practices: [
        ...prev.practices,
        { id: "", name: "", type: "agile", artifacts: [] }
      ]
    }))

  const updatePractice = (i, field, value) =>
    setModel(prev => {
      const practices = [...prev.practices]
      practices[i][field] = value
      return { ...prev, practices }
    })

  const removePractice = i =>
    setModel(prev => ({
      ...prev,
      practices: prev.practices.filter((_, idx) => idx !== i)
    }))

  /* =======================
     ARTEFACTS
     ======================= */

  const addArtifact = pIndex =>
    setModel(prev => {
      const practices = [...prev.practices]
      practices[pIndex].artifacts.push({ id: "", name: "", category: "" })
      return { ...prev, practices }
    })

  const updateArtifact = (pIndex, aIndex, field, value) =>
    setModel(prev => {
      const practices = [...prev.practices]
      practices[pIndex].artifacts[aIndex][field] = value
      return { ...prev, practices }
    })

  const removeArtifact = (pIndex, aIndex) =>
    setModel(prev => {
      const practices = [...prev.practices]
      practices[pIndex].artifacts = practices[pIndex].artifacts.filter(
        (_, idx) => idx !== aIndex
      )
      return { ...prev, practices }
    })

  /* =======================
     RELATIONS
     ======================= */

  const addRelation = () =>
    setModel(prev => ({
      ...prev,
      compatibilityRelations: [
        ...prev.compatibilityRelations,
        { practiceA: "", practiceB: "", type: "" }
      ]
    }))

  const updateRelation = (i, field, value) =>
    setModel(prev => {
      const rels = [...prev.compatibilityRelations]
      rels[i][field] = value
      return { ...prev, compatibilityRelations: rels }
    })

  const removeRelation = i =>
    setModel(prev => ({
      ...prev,
      compatibilityRelations: prev.compatibilityRelations.filter(
        (_, idx) => idx !== i
      )
    }))

  return {
    model,
    updateField,
    addRole,
    updateRole,
    removeRole,
    addPractice,
    updatePractice,
    removePractice,
    addArtifact,
    updateArtifact,
    removeArtifact,
    addRelation,
    updateRelation,
    removeRelation
  }
}
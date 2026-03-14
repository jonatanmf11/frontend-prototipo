const API = "http://localhost:8000/evaluate"

export async function evaluateModelRules(model) {

  const response = await fetch(`${API}/model`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(model)
  })

  return response.json()
}

export async function evaluateMetrics(model) {

  const response = await fetch(`${API}/metrics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(model)
  })

  return response.json()
}

export async function evaluateICF(model, icf_pairs) {

  const response = await fetch(`${API}/icf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      icf_pairs
    })
  })

  return response.json()
}

export const evaluateFull = async (payload) => {

  const response = await fetch("http://localhost:8000/evaluate/full", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(payload)

  })

  return response.json()
}

export async function fetchICFPairs() {

  const response = await fetch("http://localhost:8000/icf/pairs")

  return response.json()
}

export async function fetchBaseModel() {

  const response = await fetch("http://localhost:8000/model/base")

  return response.json()
}

export async function fetchCAFDocumentation(){

  const res = await fetch("http://localhost:8000/caf/documentation")

  return await res.json()

}

export async function fetchCPTWorkProducts(){

  const res = await fetch("http://localhost:8000/cpt/work-products")

  return await res.json()

}


export async function fetchMismatchCharacteristics(){

  const res = await fetch("http://localhost:8000/mismatch/characteristics")

  return await res.json()

}
import { useModelContext } from "../../context/ModelContext"

export default function ICFPairsEditor() {

  const { icfPairs = [], setIcfPairs } = useModelContext()

  const updateEquivalence = (index, value) => {

    const updated = [...icfPairs]

    updated[index] = {
      ...updated[index],
      equivalence: value === "" ? "" : Number(value)
    }

    setIcfPairs(updated)
  }

  const updateAgileName = (index, value) => {

    const updated = [...icfPairs]

    updated[index] = {
      ...updated[index],
      agile: {
        ...updated[index].agile,
        name: value
      }
    }

    setIcfPairs(updated)
  }

  const updateTraditionalName = (index, value) => {

    const updated = [...icfPairs]

    updated[index] = {
      ...updated[index],
      traditional: {
        ...updated[index].traditional,
        name: value
      }
    }

    setIcfPairs(updated)
  }

  const deletePair = (index) => {

    const updated = icfPairs.filter((_, i) => i !== index)

    setIcfPairs(updated)
  }

  const addPair = () => {

    const newPair = {
      agile: {
        id: "",
        name: "",
        category: ""
      },
      traditional: {
        id: "",
        name: "",
        category: ""
      },
      equivalence: 0
    }

    setIcfPairs([...icfPairs, newPair])
  }

  return (

    <div style={{ marginTop:20 }}>

      <h3>Equivalencias ICF</h3>

      <table border="1" cellPadding="5">

        <thead>
          <tr>
            <th>Artefacto agil</th>
            <th>Artefacto tradicional</th>
            <th>Equivalencia</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {icfPairs.map((pair,index)=>(

            <tr key={index}>

              <td>

                <input
                  value={pair.agile?.name || ""}
                  onChange={(e)=>
                    updateAgileName(index,e.target.value)
                  }
                  placeholder="Agile Artifact"
                />

              </td>

              <td>

                <input
                  value={pair.traditional?.name || ""}
                  onChange={(e)=>
                    updateTraditionalName(index,e.target.value)
                  }
                  placeholder="Traditional Artifact"
                />

              </td>

              <td>

                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={pair.equivalence ?? ""}
                  onChange={(e)=>
                    updateEquivalence(index,e.target.value)
                  }
                />

              </td>

              <td>

                <button onClick={()=>deletePair(index)}>
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <button onClick={addPair} style={{marginTop:10}}>
        Añadir par
      </button>

    </div>

  )
}
import { useModelContext } from "../../context/ModelContext"

export default function MismatchEditor(){

  const { mismatchData, setMismatchData } = useModelContext()

  if(!mismatchData){
    return <p>Cargando características del proyecto...</p>
  }

  const updateField = (index, field, value) => {

    const updated = {...mismatchData}

    updated.characteristics[index][field] = Number(value)

    setMismatchData(updated)

  }

  const updateMethodology = (index, method, value) => {

    const updated = {...mismatchData}

    updated.characteristics[index].methodologies[method] = Number(value)

    setMismatchData(updated)

  }

  return(

    <div style={{marginTop:40}}>

      <h2>Methodology Mismatch Configuration</h2>

      <table border="1" cellPadding="5">

        <thead>

          <tr>
            <th>Characteristic</th>
            <th>Project Value</th>
            <th>Weight</th>
            <th>Agile</th>
            <th>Traditional</th>
            <th>Hybrid</th>
          </tr>

        </thead>

        <tbody>

          {mismatchData.characteristics.map((c,i)=>(
            <tr key={i}>

              <td>{c.name}</td>

              <td>
                <input
                  type="number"
                  value={c.projectValue}
                  onChange={(e)=>updateField(i,"projectValue",e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={c.weight}
                  onChange={(e)=>updateField(i,"weight",e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={c.methodologies.agile}
                  onChange={(e)=>updateMethodology(i,"agile",e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={c.methodologies.traditional}
                  onChange={(e)=>updateMethodology(i,"traditional",e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={c.methodologies.hybrid}
                  onChange={(e)=>updateMethodology(i,"hybrid",e.target.value)}
                />
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}
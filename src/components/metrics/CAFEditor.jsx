import { useModelContext } from "../../context/ModelContext"

export default function CAFEditor(){

  const { cafDocumentation, setCafDocumentation } = useModelContext()

  if(!cafDocumentation){
    return <p>Loading CAF data...</p>
  }

  const updateItem = (section,index,field,value)=>{

    const updated = { ...cafDocumentation }

    updated[section][index] = {
      ...updated[section][index],
      [field]: value
    }

    setCafDocumentation(updated)

  }

  const toggleDocumented = (section,index)=>{

    const updated = { ...cafDocumentation }

    updated[section][index].documented =
      !updated[section][index].documented

    setCafDocumentation(updated)

  }

  const renderSection = (title,section,fields)=>{

    return (

      <div style={{marginTop:20}}>

        <h4>{title}</h4>

        <table border="1" cellPadding="5">

          <thead>
            <tr>

              {fields.map(f=>(
                <th key={f}>{f}</th>
              ))}

              <th>Documented</th>

            </tr>
          </thead>

          <tbody>

            {cafDocumentation[section].map((item,i)=>(

              <tr key={i}>

                {fields.map(f=>(

                  <td key={f}>

                    <input
                      value={item[f] || ""}
                      onChange={(e)=>
                        updateItem(section,i,f,e.target.value)
                      }
                    />

                  </td>

                ))}

                <td>

                  <input
                    type="checkbox"
                    checked={item.documented}
                    onChange={()=>toggleDocumented(section,i)}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )

  }

  return (

    <div style={{marginTop:40}}>

      <h3>CAF covertura de documentación</h3>

      {renderSection(
        "Activities",
        "activities",
        ["id"]
      )}

      {renderSection(
        "Rules",
        "rules",
        ["practiceId"]
      )}

      {renderSection(
        "Roles",
        "roles",
        ["id"]
      )}

      {renderSection(
        "Artifacts",
        "artifacts",
        ["id"]
      )}

      {renderSection(
        "Sequence",
        "sequence",
        ["practiceA","practiceB"]
      )}

      {renderSection(
        "Metrics",
        "metrics",
        ["name"]
      )}

    </div>

  )

}
import ModelEditor from "./components/ModelEditor"
import EvaluationPanel from "./components/EvaluationPanel"
import "./styles/ModelEditor.css"

function App() {

  return (
    <div className="editor-container">

      <ModelEditor />

      <EvaluationPanel />

    </div>
  )

}

export default App
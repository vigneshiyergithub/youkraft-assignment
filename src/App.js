import "./App.css";
import FormDataDisplayer from "./components/FormDataDisplayer/FormDataDisplayer";
import FormDetails from "./components/FormDetails/FormDetails";
import React, { useReducer } from "react";
import { formReducer, formState } from "./utils/formReducer";

function App() {
  const [formData, dispatch] = useReducer(formReducer, formState);
  return (
    <div className="App">
      <FormDetails formData={formData} dispatch={dispatch} />
      <FormDataDisplayer formData={formData} />
    </div>
  );
}

export default App;

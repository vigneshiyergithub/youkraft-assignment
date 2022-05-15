import React from "react";

const FormDataDisplayer = ({ formData }) => {
  return <pre id="json">{JSON.stringify(formData, null, 4)}</pre>;
};

export default FormDataDisplayer;

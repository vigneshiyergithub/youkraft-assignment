import React, { useEffect, useState, useRef, useCallback } from "react";
import "./FormDetails.css";

const validateForm = (formKey, formValue) => {
  switch (formKey) {
    case "name": {
      return !!formValue;
    }
    case "email": {
      let mail_format =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return mail_format.test(formValue);
    }
    case "age": {
      return !!formValue && formValue > 0;
    }
    case "phoneNumber": {
      let phoneNumberFormat = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      return phoneNumberFormat.test(formValue);
    }
    default: {
      return true;
    }
  }
};

const FORM_ERROR_MESSAGE = {
  name: "Please enter valid string",
  email: "Invalid email address",
  phoneNumber: "Invalid phone number. Please enter 10 digits",
  age: "Please enter valid age. Age has be greater than 0",
};

const FormDetails = ({ formData, dispatch }) => {
  const [formError, setFormError] = useState({});
  const nameValue = formData?.name ?? "";
  const ageValue = formData?.age ?? "";
  const emailValue = formData?.email ?? "";
  const phoneValue = formData?.phoneNumber ?? "";
  const formChange = (formKey) => (e) => {
    const formValue = e.target.value;
    dispatch({ type: "editForm", payload: { formKey, formValue } });
  };
  const nameChange = formChange("name");
  const ageChange = formChange("age");
  const emailChange = formChange("email");
  const phoneChange = formChange("phoneNumber");

  const validateFormData = (data) => {
    Object.keys(data).forEach((k) => {
      const isValid = validateForm(k, data[k]);
      setFormError((s) => ({ ...s, [k]: isValid }));
    });
  };

  const submitClick = (e) => {
    e.preventDefault();
    console.log("submitClick");
    validateFormData(formData);
  };

  const onReset = useCallback((e) => {
    e.preventDefault();
    console.log("reset called");
    dispatch({ type: "reset" });
  }, []);

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Form Details</h2>
        <button className="reset-button" onClick={onReset}>
          Reset Form
        </button>
      </div>
      <form
        data-testid="input-form"
        id="input-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormElement isValid={formError?.name} formKey={"name"}>
          <label htmlFor="name-input">Name</label>
          <input id="name-input" value={nameValue} onChange={nameChange} />
        </FormElement>
        <FormElement isValid={formError?.age} formKey={"age"}>
          <label htmlFor="name-age">Age</label>
          <input
            id="name-age"
            value={ageValue}
            onChange={ageChange}
            type="number"
          />
        </FormElement>
        <FormElement isValid={formError?.email} formKey={"email"}>
          <label htmlFor="name-email">Email</label>
          <input id="name-email" value={emailValue} onChange={emailChange} />
        </FormElement>
        <FormElement isValid={formError?.phoneNumber} formKey={"phoneNumber"}>
          <label htmlFor="name-phone">Phone Number</label>
          <input
            id="name-phone"
            value={phoneValue}
            onChange={phoneChange}
            type="number"
          />
        </FormElement>
        <button type="submit" className="submit-button" onClick={submitClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

const FormElement = ({ isValid, formKey, showError = true, ...props }) => {
  const classList = ["form-element"];
  !isValid && showError && classList.push("error");
  const errorText =
    (!isValid && showError && FORM_ERROR_MESSAGE[formKey]) ?? "";
  return (
    <div className={classList.join(" ")}>
      <div className="form-element-content">{props.children}</div>
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
};

export default FormDetails;

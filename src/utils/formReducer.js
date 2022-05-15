export const formState = {
  name: "",
  age: "",
  email: "",
  phoneNumber: "",
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "editForm": {
      return { ...state, [action.payload.formKey]: action.payload.formValue };
    }
    case "reset": {
      return { ...formState };
    }
    default:
      return state;
  }
};

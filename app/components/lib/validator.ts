const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export type AuthType = "signUp" | "signIn";

export function validateField(
  field: string,
  value: string,
  type: AuthType,
  formData?: {
    password?: string;
  },
) {
  let error = "";
  switch (field) {
    case "name":
      if (type === "signIn") {
        return "";
      }
      if (!value.trim()) {
        error = "Name is Required.";
      } else if (value.length < 3) {
        error = "Minimum 3 characters are required.";
      }
      break;
    case "email":
      if (!value.trim()) {
        error = "Email is Required";
      } else if (type === "signUp") {
        if (!emailRegex.test(value)) {
          error = "Invalid email format.";
        }
      }
      break;
    case "password":
      if (!value.trim()) {
        error = "Password is required";
      } else if (type === "signUp") {
        if (value.length < 8) {
          error = "must contain atleast 8 characters";
        } else if (!/[A-Z]/.test(value)) {
          error = "must contain an uppercase letter.";
        } else if (!/[a-z]/.test(value)) {
          error = "must contain a lowercase letter";
        } else if (!/[0-9]/.test(value)) {
          error = "must contain a number";
        } else if (!/[!@#$%^&*(),.?"{}|<>_]/.test(value)) {
          error = "must contain a special character";
        }
      }
      break;
    case "confirmPassword":
      if(type === "signIn"){
        return "";
      }
      if (!value.trim()) {
        error = "Confirm password is required";
      } else if (type === "signUp") {
        if (value !== formData?.password) {
          error = "Passwords do not match";
        }
      }
      break;
  }
  return error;
}
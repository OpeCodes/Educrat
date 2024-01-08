import * as Yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your firstname"),
  lastName: Yup.string().required("Enter your lastname"),
  username: Yup.string().required("Enter your username"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Password must include letters and numbers",
    })
    .required("Enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

export const SignInSchema = Yup.object().shape({
  credential: Yup.string().required("Enter username or email"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Password must include letters and numbers",
    })
    .required("Enter your password"),
});


export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Password must include letters and numbers",
    })
    .required("Enter your password"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
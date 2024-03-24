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
      message: "Password must include upper, lower and numbers",
    })
    .required("Enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

export const SignInSchema = Yup.object().shape({
  credential: Yup.string().required("Enter username or email"),
  password: Yup.string().required("Enter your password"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Password must include upper, lower and numbers",
    })
    .required("Enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
export const instructorProfileSchema = Yup.object().shape({
  headline: Yup.string().required("Pls include headline"),
  biography: Yup.string().required("Pls include biography"),
  website: Yup.string(),
  twitter: Yup.string(),
  facebook: Yup.string(),
  linkedin: Yup.string(),
  youtube: Yup.string(),
});
export const createCourseSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  category: Yup.string().required("Select category"),
});
export const courseLandingSchema = Yup.object().shape({
  title: Yup.string().required("pls add title"),
  subtitle: Yup.string().required("pls add subtitle "),
  description: Yup.string(),
  category: Yup.string(),
  // .required("please select category"),
  complexityLevel: Yup.string().required("pls select level"),
  language: Yup.string().required("please select a language"),
  learningObjectives: Yup.array().of(Yup.string().required("please include all the 4 input")),
  preRequisities: Yup.array().of(Yup.string().required("please enter prerequisities")),
});
export const courseModuleSchema = Yup.object().shape({
  title: Yup.string().required("pls add title"),
  learningObjective: Yup.string().required("pls add learning objectives")
})
export const courseEditModuleSchema = Yup.object().shape({
  title: Yup.string().required("pls add title"),
  learningObjective: Yup.string().required("pls add learning objectives")
})
export const curriculumLectureSchema = Yup.object().shape({
  title: Yup.string().required("pls add title"),
})
export const curriculumEditLectureSchema = Yup.object().shape({
  title: Yup.string().required("pls add title"),
})


export const ArticleCreateLectureSchema = Yup.object().shape({
  body: Yup.string().required("pls add body"),
})
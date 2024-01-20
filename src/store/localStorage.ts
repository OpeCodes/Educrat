export const addUserLocalStorage = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
export const getUserLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addCourseLocalStorage = (course: any) => {
  localStorage.setItem("course", JSON.stringify(course));
};
export const removeCourseFromLocalStorage = () => {
  localStorage.removeItem("course");
};
export const getCourseLocalStorage = () => {
  const result = localStorage.getItem("course");
  const course = result ? JSON.parse(result) : null;
  return course;
};

//course module

export const addCourseModuleStorage =(user: any) =>{
  localStorage.setItem("courseModule", JSON.stringify(user))
}

export  const getCourseModuleStorage = () =>{
  const result = localStorage.getItem("courseModule");
  const courseModule= result ? JSON.parse(result) : null;
  return courseModule;
}
export const removeCourseModuleromLocalStorage = () => {
  localStorage.removeItem("courseModule");
};
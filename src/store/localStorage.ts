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



export const addCourseItemToLocalStorage =(course: any) => {
  localStorage.setItem("course", JSON.stringify(course));
};
export const removeCourseItemToLocalStorage  = () => {
  localStorage.removeItem("course");
};
export const getCourseItemToLocalStorage  = () => {
  const result = localStorage.getItem("course");
  const course = result ? JSON.parse(result) : null;
  return course;
};
import { CartInterface } from "../interface/courseInterface";

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



export const CourseItemToLocalStorage =(course: CartInterface) => {
  const result = localStorage.getItem("cartItems");
  const existingCartItems = result ? JSON.parse(result) : []
    const updatedCartItems = [...existingCartItems, course];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};
export const removeCourseItemToLocalStorage  = () => {
  localStorage.removeItem("course");
};
export const getCourseItemToLocalStorage = () => {
  const result = localStorage.getItem("cartItems");
  const course = result ? JSON.parse(result) : [];
  return course;
};


export const addUserSingleCartItem= (singleCartCourseItem: any) => {
  localStorage.setItem("singleCartItem", JSON.stringify(singleCartCourseItem));
};
export const removeUserSingleCartItem = () => {
  localStorage.removeItem("singleCartItem");
};
export const getUserSingleCartItem = () => {
  const result = localStorage.getItem("singleCartItem");
  const singleCartItem = result ? JSON.parse(result) : null;
  return singleCartItem;
};

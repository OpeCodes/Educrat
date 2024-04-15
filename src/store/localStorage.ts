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
export const addStudenCourseWishListorage = (wishlist: any) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const removeStudenCourseWishListorage = () => {
  localStorage.removeItem("wishlist");
};
export const getStudenCourseWishListorage  = () => {
  const result = localStorage.getItem("wishlist");
  const wishlist = result ? JSON.parse(result) : false;
  return wishlist;
};


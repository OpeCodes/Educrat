import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseInterface } from "../../interface/courseInterface";
import { getCourseItemToLocalStorage, getUserSingleCartItem } from "../../store/localStorage";

interface CartState {
  courses: CourseInterface[];
  CheckOut: boolean;
  singleCartCourse: any;
}

const initialState: CartState = {
  courses: getCourseItemToLocalStorage(),
  CheckOut: false,
  singleCartCourse: getUserSingleCartItem(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourseToCart(state, action: PayloadAction<CourseInterface>) {
      state.courses.push(action.payload);
    },
    removeCourseFromCart: (state, action: PayloadAction<string | number>) => {
      const courseId = action.payload;
      const courseIndex = state.courses.findIndex(
        (course: { id: string | number }) => course.id === courseId
      );
      if (courseIndex !== -1) {
        state.courses.splice(courseIndex, 1);
        localStorage.setItem("cartItems", JSON.stringify(state.courses));
      }
    },
    clearCart: () => {
      localStorage.removeItem("cartItems");
    },
    setToggleCheckout: (state: CartState) => {
      state.CheckOut = !state.CheckOut;
    },
    setSingleCartCourse: (state, action: PayloadAction<any>) => {
      state.singleCartCourse = action.payload;
    },
  },
});
export const {
  addCourseToCart,
  removeCourseFromCart,
  clearCart,
  setToggleCheckout,
  setSingleCartCourse,
} = cartSlice.actions;
export default cartSlice.reducer;

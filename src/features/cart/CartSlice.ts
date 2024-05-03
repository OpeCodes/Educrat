import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseInterface } from "../../interface/courseInterface";
import { getCourseItemToLocalStorage } from "../../store/localStorage";

interface CartState {
  courses: CourseInterface[];
  CheckOut: boolean;
}

const initialState: CartState = {
  courses: getCourseItemToLocalStorage(),
  CheckOut: false
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
      localStorage.removeItem('cartItems'); 
  },
  setToggleCheckout: (state: CartState,) => {
    state.CheckOut = !state.CheckOut
  },
  },
});
export const { addCourseToCart, removeCourseFromCart, clearCart , setToggleCheckout} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseInterface } from '../../interface/courseInterface';

interface CartState {
  courses: CourseInterface[];
}

const initialState: CartState = {
  courses: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCourseToCart(state, action: PayloadAction<CourseInterface>) {
      state.courses.push(action.payload);
    },
    removeCourseFromCart(state, action: PayloadAction<string | number>) {
      const courseId = action.payload;
      const courseIndex = state.courses.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        state.courses.splice(courseIndex, 1);
      }
    },
  },
});

export const { addCourseToCart, removeCourseFromCart } = cartSlice.actions;
export default cartSlice.reducer;

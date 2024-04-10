import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllCourseModuleStorage,
  getCourseLocalStorage,
  getCourseModuleStorage,
  getUserLocalStorage,
  removeUserFromLocalStorage,
} from "../../store/localStorage";

interface UserState {
  user: any;
  course: any;
  courseModule: any;
  AllCourseModule: any;
  courseNavigate: number;
}

const initialState: UserState = {
  user: getUserLocalStorage(),
  course: getCourseLocalStorage(),
  courseModule: getCourseModuleStorage(),
  AllCourseModule: getAllCourseModuleStorage(),
  courseNavigate: 0
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logoutUser: (state: UserState) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
    setCourse: (state: UserState, action: PayloadAction<any>) => {
      state.course = action.payload;
    },
    setCourseModule: (state: UserState, action: PayloadAction<any>) => {
      state.courseModule = action.payload;
    },
    setAllCourseModule: (state: UserState, action: PayloadAction<any>) => {
      state.AllCourseModule = action.payload;
    },
    setCourseAuthNavigate : (state: UserState, action: PayloadAction<any>) => {
      state.courseNavigate = action.payload
    },
    // Add more reducers as needed
  },
});

export const {
  setUser,
  logoutUser,
  setCourse,
  setCourseModule,
  setAllCourseModule,
  setCourseAuthNavigate
} = userSlice.actions;
export const selectData = (state: { data: UserState }) => state.data.user;
export default userSlice.reducer;

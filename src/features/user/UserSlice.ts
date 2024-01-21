import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCourseModuleStorage, getCourseLocalStorage, getCourseModuleStorage, getUserLocalStorage, removeUserFromLocalStorage } from "../../store/localStorage";

interface UserState {
  user: any;
  course : any
  courseModule: any
  AllCourseModule: any
}

const initialState: UserState = {
  user: getUserLocalStorage(),
// user: null
course: getCourseLocalStorage(),
courseModule: getCourseModuleStorage(),
AllCourseModule: getAllCourseModuleStorage()
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logoutUser: (state: UserState) =>{
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
    // Add more reducers as needed
  },
});

export const { setUser, logoutUser ,setCourse, setCourseModule,setAllCourseModule} = userSlice.actions;
export const selectData = (state: { data: UserState }) => state.data.user;
export default userSlice.reducer;

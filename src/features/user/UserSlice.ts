import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCourseLocalStorage,
  getUserLocalStorage,
  removeUserFromLocalStorage,
} from "../../store/localStorage";

interface UserState {
  user: any;
  course: any;
  courseNavigate: number;
  markWishList: boolean;
}

const initialState: UserState = {
  user: getUserLocalStorage(),
  course: getCourseLocalStorage(),
  courseNavigate: 0,
  markWishList: false,
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

    setCourseAuthNavigate: (state: UserState, action: PayloadAction<any>) => {
      state.courseNavigate = action.payload;
    },
    setMarkWishList: (state: UserState) => {
      state.markWishList = !state.markWishList
    },
    // Add more reducers as needed
  },
});

export const { setUser, logoutUser, setCourseAuthNavigate , setMarkWishList} = userSlice.actions;
export const selectData = (state: { data: UserState }) => state.data.user;
export default userSlice.reducer;

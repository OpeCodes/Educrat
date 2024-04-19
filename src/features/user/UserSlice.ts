import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserLocalStorage,
  removeUserFromLocalStorage,
} from "../../store/localStorage";

interface UserState {
  user: any;
  courseNavigate: number;
}

const initialState: UserState = {
  user: getUserLocalStorage(),
  courseNavigate: 0,
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
   
  },
});

export const { setUser, logoutUser, setCourseAuthNavigate,  } =
  userSlice.actions;
export const selectData = (state: { data: UserState }) => state.data.user;
export default userSlice.reducer;

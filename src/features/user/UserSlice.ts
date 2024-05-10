import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserLocalStorage,
  removeUserFromLocalStorage,
  removeUserSingleCartItem,
  removeUserCheckoutValue
} from "../../store/localStorage";

interface UserState {
  user: any;
  courseNavigate: number;
  order: any;
  orderBoolean: boolean;
}

const initialState: UserState = {
  user: getUserLocalStorage(),
  courseNavigate: 0,
  order: null,
  orderBoolean: false

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setOrder: (state: UserState, action: PayloadAction<any>) => {
      state.order = action.payload;
    },
    logoutUser: (state: UserState) => {
      state.user = null;
      removeUserFromLocalStorage();
      removeUserSingleCartItem()
      removeUserCheckoutValue()
    },
    setToggleOrder: (state: UserState,) => {
      state.orderBoolean = !state.orderBoolean
    },
    setCourseAuthNavigate: (state: UserState, action: PayloadAction<any>) => {
      state.courseNavigate = action.payload;
    },
   
  },
});

export const { setUser, logoutUser, setCourseAuthNavigate, setOrder, setToggleOrder  } =
  userSlice.actions;
export const selectData = (state: { data: UserState }) => state.data.user;
export default userSlice.reducer;

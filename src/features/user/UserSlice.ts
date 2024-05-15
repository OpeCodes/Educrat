import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserLocalStorage,
  removeUserFromLocalStorage,
  removeUserSingleCartItem,
  removeUserCheckoutValue
} from "../../store/localStorage";
import { default as jwtDecode } from 'jwt-decode';


interface UserState {
  user: any;
  courseNavigate: number;
  order: any;
  orderBoolean: boolean;
  accountDetails: any;
  walletLoading: boolean;
  isTokenExpired: boolean;
}

const initialState: UserState = {
  user: getUserLocalStorage(),
  courseNavigate: 0,
  order: null,
  orderBoolean: false,
  accountDetails: null,
  walletLoading: false,
  isTokenExpired: false

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isTokenExpired = false;

    },
    checkTokenExpiration: (state) => {
    //   // const decodedToken = jwtDecode(state.user);
    //   // const expirationTime = decodedToken.exp * 1000;
    //   // const currentTime = Date.now();

    //   // if (currentTime > expirationTime) {
    //   //   state.isTokenExpired = true;
    //   // }
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
    setAccountBankDetails: (state: UserState, action: PayloadAction<any>) => {
      state.accountDetails = action.payload;
    },
    setWalletLoading: (state: UserState, action: PayloadAction<any>) => {
      state.walletLoading = action.payload;
    },
   
  },
});

export const { setUser, logoutUser, setCourseAuthNavigate, setOrder, setToggleOrder,setAccountBankDetails,setWalletLoading ,checkTokenExpiration } =
  userSlice.actions;
export const selectData = (state: { data: UserState }) => state.data.user;
export default userSlice.reducer;

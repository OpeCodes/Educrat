import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserLocalStorage } from "../../store/localStorage";

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: getUserLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setUser } = userSlice.actions;
export const selectData = (state: { data: UserState }) => state.data.user;
export default userSlice.reducer;

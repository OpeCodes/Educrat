import {  createSlice } from "@reduxjs/toolkit";
// interface UserState {
//   isLoading: boolean;
//   user: null; // Replace 'any' with the actual type of your user data
// }

// interface RegisterUserPayload {
//   user: null; // Replace 'any' with the actual type of your user data
// }

// const initialState: UserState = {
//   isLoading: false,
//   user: null,
//   verificationStatus: string,
// };
const initialState = {
  user: null,
  verificationStatus: "idle",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;

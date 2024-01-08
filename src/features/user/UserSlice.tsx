import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";
import { toast } from "react-toastify";
interface UserState {
  isLoading: boolean;
  user: null; // Replace 'any' with the actual type of your user data
}

// interface RegisterUserPayload {
//   user: null; // Replace 'any' with the actual type of your user data
// }

const initialState: UserState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("auth/register", user);
      return resp.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("auth/login", user);
      return resp.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("auth/password/forgot", user);
      return resp.data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success("Successfull ");
      })
      .addCase(registerUser.rejected, (state) => {
        // toast.error(action.payload);
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success("Successfull ");
      })
      .addCase(loginUser.rejected, (state) => {
        // toast.error(action.payload);
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success("Successfull ");
      })
      .addCase(resetPassword.rejected, (state) => {
        // toast.error(action.payload);
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;

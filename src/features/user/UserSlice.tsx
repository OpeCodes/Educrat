import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";
import { toast } from "react-toastify";
interface UserState {
  isLoading: boolean;
  verificationStatus: "idle" | "loading" | "succeeded" | "failed",
  user: null; // Replace 'any' with the actual type of your user data
}

// interface RegisterUserPayload {
//   user: null; // Replace 'any' with the actual type of your user data
// }

// const initialState: UserState = {
//   isLoading: false,
//   user: null,
//   verificationStatus: string,
// };
const initialState = {
  isLoading: false,
  user: null,
  verificationStatus: "idle",
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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
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

export const verifyAccountThunk = createAsyncThunk(
  "user/verifyAccount", async(user, thunkAPI) =>{
    try {
      const resp = await customFetch.post("auth/verification", user);
      return resp.data
    } catch (error: any) {
      toast.error(error.response.data.error)  
      return thunkAPI.rejectWithValue(error.response.data.error);
      
    }
  }
)
export const resetPasswordThunk = createAsyncThunk(
  "user/resetPassword", async(user, thunkAPI) =>{
    try {
      const resp = await customFetch.patch("auth/password/reset", user);
      return resp.data
    } catch (error: any) {
      toast.error(error.response.data.error)  
      return thunkAPI.rejectWithValue(error.response.data.error);
      
    }
  }
)
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
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success("password reset link sent");
      })
      .addCase(forgotPassword.rejected, (state) => {
        // toast.error(action.payload);
        state.isLoading = false;
      })
      // start
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success("password reset link sent");
      })
      .addCase(resetPasswordThunk.rejected, (state) => {
        // toast.error(action.payload);
        state.isLoading = false;
      })
      //stop

      .addCase(verifyAccountThunk.pending, (state) => {
        state.verificationStatus = 'loading';
      })
      .addCase(verifyAccountThunk.fulfilled, (state) => {
        state.verificationStatus = 'succeeded';
        // Handle successful verification if needed
      })
      .addCase(verifyAccountThunk.rejected, (state) => {
        state.verificationStatus = 'failed';
        // Handle rejection or errors
      })
  
  },
});

export default userSlice.reducer;

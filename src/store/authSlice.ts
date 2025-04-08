import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  phoneNumber: string;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
}

const initialState: AuthState = {
  phoneNumber: "",
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false,
};

// Async thunk for sending OTP
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      // This would be a real API call in production
      // const response = await fetch('/api/auth/phone', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // return data;

      // For now, simulate a successful response
      return { success: true };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to send OTP",
      );
    }
  },
);

// Async thunk for verifying OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (
    { phoneNumber, otp }: { phoneNumber: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      // This would be a real API call in production
      // const response = await fetch('/api/auth/verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber, otp }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // return data;

      // For now, simulate a successful response with a token
      // In a real app, this would come from the backend
      if (otp === "123456") {
        // Simulating correct OTP

        // Mock API call after successful OTP verification
        const mockApiCall = async (phoneNumber: string) => {
          console.log(`Making mock API call with phone number: ${phoneNumber}`);
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 500));
          return {
            success: true,
            message: "User profile updated successfully",
          };
        };

        // Call the mock API with the phone number
        const apiResponse = await mockApiCall(phoneNumber);
        console.log("API response:", apiResponse);

        return { token: "mock-jwt-token", success: true, apiResponse };
      } else {
        return rejectWithValue("Invalid OTP");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to verify OTP",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    resetAuth: (state) => {
      state.phoneNumber = "";
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.otpSent = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP cases
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify OTP cases
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        verifyOTP.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; apiResponse?: any }>,
        ) => {
          state.loading = false;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.otpSent = false;
          // You can handle the API response here if needed
          console.log("API response in reducer:", action.payload.apiResponse);
        },
      )
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPhoneNumber, resetAuth, logout } = authSlice.actions;
export default authSlice.reducer;

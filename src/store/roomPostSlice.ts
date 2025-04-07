import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface RoomPostState {
  building: string;
  apartment: string;
  price: string;
  maxSlots: string;
  availableSlots: string;
  utilities: string;
  description: string;
  roomType: string;
  amenities: {
    wifi: boolean;
    airConditioner: boolean;
    privateBathroom: boolean;
    kitchen: boolean;
    washing: boolean;
    parking: boolean;
  };
  files: File[];
  previewUrls: string[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RoomPostState = {
  building: "",
  apartment: "",
  price: "",
  maxSlots: "",
  availableSlots: "",
  utilities: "Trống",
  description: "",
  roomType: "",
  amenities: {
    wifi: false,
    airConditioner: false,
    privateBathroom: false,
    kitchen: false,
    washing: false,
    parking: false,
  },
  files: [],
  previewUrls: [],
  loading: false,
  error: null,
  success: false,
};

// Async thunk for posting room data
export const postRoom = createAsyncThunk(
  "roomPost/postRoom",
  async (
    formData: Omit<
      RoomPostState,
      "loading" | "error" | "success" | "previewUrls"
    >,
    { rejectWithValue },
  ) => {
    try {
      // This would be a real API call in production
      // const response = await fetch('/api/rooms', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // return data;

      // For now, simulate a successful response
      return { success: true, roomId: "mock-room-id" };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to post room",
      );
    }
  },
);

const roomPostSlice = createSlice({
  name: "roomPost",
  initialState,
  reducers: {
    setFormField: (
      state,
      action: PayloadAction<{
        field: keyof Omit<
          RoomPostState,
          | "amenities"
          | "files"
          | "previewUrls"
          | "loading"
          | "error"
          | "success"
        >;
        value: string;
      }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setAmenity: (
      state,
      action: PayloadAction<{
        name: keyof RoomPostState["amenities"];
        value: boolean;
      }>,
    ) => {
      const { name, value } = action.payload;
      state.amenities[name] = value;
    },
    addFiles: (
      state,
      action: PayloadAction<{ files: File[]; previewUrls: string[] }>,
    ) => {
      state.files = [...state.files, ...action.payload.files];
      state.previewUrls = [...state.previewUrls, ...action.payload.previewUrls];
    },
    removeFile: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.files = state.files.filter((_, i) => i !== index);
      state.previewUrls = state.previewUrls.filter((_, i) => i !== index);
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postRoom.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(postRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFormField, setAmenity, addFiles, removeFile, resetForm } =
  roomPostSlice.actions;
export default roomPostSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAboutDataAPI, submitAboutFormAPI } from "./aboutAPI";

export interface AboutFormData {
  name: string;
  aboutDescription: string;
  signature?: string | null;
  imageUrl?: string | null;
}

interface AboutState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: AboutFormData | null;
}

export const fetchAboutData = createAsyncThunk("adminAbout/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAboutDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch about data");
  }
});

export const submitAboutForm = createAsyncThunk(
  "adminAbout/submit",
  async (data: AboutFormData, { rejectWithValue }) => {
    try {
      const res = await submitAboutFormAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to submit");
    }
  }
);

const initialState: AboutState = {
  status: "idle",
  message: "",
  data: null,
};

const adminAboutSlice = createSlice({
  name: "adminAbout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(submitAboutForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitAboutForm.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(submitAboutForm.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error saving";
      });
  },
});

export default adminAboutSlice.reducer;

import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

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

export const fetchAboutData = createAsyncThunk("about/fetch", async () => {
  const res = await fetch("/api/admin/about");
  if (!res.ok) throw new Error("Failed to fetch about data");
  return await res.json();
});

export const submitAboutForm = createAsyncThunk(
  "about/submit",
  async (data: AboutFormData) => {
    const res = await fetch("/api/admin/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to submit");
    }
    return await res.json();
  }
);

const initialState: AboutState = {
  status: "idle",
  message: "",
  data: null,
};

const aboutSlice = createSlice({
  name: "about",
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
        state.message = action.error.message || "Error saving";
      });
  },
});

export default aboutSlice.reducer;

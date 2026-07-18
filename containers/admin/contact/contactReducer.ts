import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContactDataAPI, submitContactFormAPI } from "./contactAPI";

export interface ContactFormData {
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

interface ContactState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: ContactFormData | null;
}

export const fetchContactData = createAsyncThunk("adminContact/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchContactDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch contact data");
  }
});

export const submitContactForm = createAsyncThunk(
  "adminContact/submit",
  async (data: ContactFormData, { rejectWithValue }) => {
    try {
      const res = await submitContactFormAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to submit contact data");
    }
  }
);

const initialState: ContactState = {
  status: "idle",
  message: "",
  data: null,
};

const adminContactSlice = createSlice({
  name: "adminContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error fetching";
      })
      .addCase(submitContactForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error saving";
      });
  },
});

export default adminContactSlice.reducer;

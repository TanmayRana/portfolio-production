import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchContactData = createAsyncThunk("contact/fetch", async () => {
  const res = await fetch("/api/admin/contact");
  if (!res.ok) throw new Error("Failed to fetch contact data");
  return await res.json();
});

export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (data: ContactFormData) => {
    const res = await fetch("/api/admin/contact", {
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

const initialState: ContactState = {
  status: "idle",
  message: "",
  data: null,
};

const contactSlice = createSlice({
  name: "contact",
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
        state.message = action.error.message || "Error fetching";
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
        state.message = action.error.message || "Error saving";
      });
  },
});

export default contactSlice.reducer;

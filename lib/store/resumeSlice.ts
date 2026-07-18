import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ResumeData {
  id: string;
  fileUrl: string;
  fileName: string | null;
}

interface ResumeState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: ResumeData | null;
}

export const fetchResumeData = createAsyncThunk("resume/fetch", async () => {
  const res = await fetch("/api/admin/resume");
  if (!res.ok) throw new Error("Failed to fetch resume");
  return await res.json();
});

export const saveResumeData = createAsyncThunk(
  "resume/save",
  async (data: { fileUrl: string; fileName: string }) => {
    const res = await fetch("/api/admin/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to save resume");
    }
    return await res.json();
  }
);

export const deleteResumeData = createAsyncThunk(
  "resume/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/resume?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to delete resume");
    }
    return id;
  }
);

const initialState: ResumeState = {
  status: "idle",
  message: "",
  data: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchResumeData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // Save
      .addCase(saveResumeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveResumeData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload; // the API might return the updated resume, or we need to fetch again
      })
      .addCase(saveResumeData.rejected, (state, action) => {
        state.status = "error";
        state.message = action.error.message || "Error saving";
      })
      // Delete
      .addCase(deleteResumeData.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export default resumeSlice.reducer;

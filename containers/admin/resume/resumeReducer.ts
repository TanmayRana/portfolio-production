import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResumeDataAPI, saveResumeDataAPI, deleteResumeDataAPI } from "./resumeAPI";

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

export const fetchResumeData = createAsyncThunk("adminResume/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchResumeDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch resume");
  }
});

export const saveResumeData = createAsyncThunk(
  "adminResume/save",
  async (data: { fileUrl: string; fileName: string }, { rejectWithValue }) => {
    try {
      const res = await saveResumeDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to save resume");
    }
  }
);

export const deleteResumeData = createAsyncThunk(
  "adminResume/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteResumeDataAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to delete resume");
    }
  }
);

const initialState: ResumeState = {
  status: "idle",
  message: "",
  data: null,
};

const adminResumeSlice = createSlice({
  name: "adminResume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumeData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(saveResumeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveResumeData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(saveResumeData.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error saving";
      })
      .addCase(deleteResumeData.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export default adminResumeSlice.reducer;

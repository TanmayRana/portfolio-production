import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkExperience } from "./Hooks";
import {
  fetchWorkExperienceDataAPI,
  saveWorkExperienceDataAPI,
  deleteWorkExperienceDataAPI,
} from "./workExperienceAPI";

interface WorkExperienceState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: WorkExperience[];
}

export const fetchWorkExperienceData = createAsyncThunk("adminWorkExperience/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchWorkExperienceDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch work experience");
  }
});

export const saveWorkExperienceData = createAsyncThunk(
  "adminWorkExperience/save",
  async (data: Partial<WorkExperience>, { rejectWithValue }) => {
    try {
      const res = await saveWorkExperienceDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to save work experience");
    }
  }
);

export const deleteWorkExperienceData = createAsyncThunk(
  "adminWorkExperience/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteWorkExperienceDataAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to delete work experience");
    }
  }
);

const initialState: WorkExperienceState = {
  status: "idle",
  message: "",
  data: [],
};

const adminWorkExperienceSlice = createSlice({
  name: "adminWorkExperience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkExperienceData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(saveWorkExperienceData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveWorkExperienceData.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(saveWorkExperienceData.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error saving";
      })
      .addCase(deleteWorkExperienceData.fulfilled, (state, action) => {
        state.data = state.data.filter((w) => w.id !== action.payload);
      });
  },
});

export default adminWorkExperienceSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkExperience } from "@/containers/admin/work-experience/Hooks";

interface WorkExperienceState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: WorkExperience[];
}

export const fetchWorkExperienceData = createAsyncThunk("workExperience/fetch", async () => {
  const res = await fetch("/api/admin/work-experience");
  if (!res.ok) throw new Error("Failed to fetch work experience");
  return await res.json();
});

export const saveWorkExperienceData = createAsyncThunk(
  "workExperience/save",
  async (data: Partial<WorkExperience>) => {
    const isEdit = !!data.id;
    const res = await fetch("/api/admin/work-experience", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to save work experience");
    }
    return await res.json();
  }
);

export const deleteWorkExperienceData = createAsyncThunk(
  "workExperience/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/work-experience?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to delete work experience");
    }
    return id;
  }
);

const initialState: WorkExperienceState = {
  status: "idle",
  message: "",
  data: [],
};

const workExperienceSlice = createSlice({
  name: "workExperience",
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
        state.message = action.error.message || "Error saving";
      })
      .addCase(deleteWorkExperienceData.fulfilled, (state, action) => {
        state.data = state.data.filter(w => w.id !== action.payload);
      });
  },
});

export default workExperienceSlice.reducer;

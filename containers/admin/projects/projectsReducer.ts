import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "./Hooks";
import { fetchProjectsDataAPI, saveProjectDataAPI, deleteProjectDataAPI } from "./projectsAPI";

interface ProjectsState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: Project[];
}

export const fetchProjectsData = createAsyncThunk("adminProjects/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchProjectsDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch projects");
  }
});

export const saveProjectData = createAsyncThunk(
  "adminProjects/save",
  async (data: Partial<Project>, { rejectWithValue }) => {
    try {
      const res = await saveProjectDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to save project");
    }
  }
);

export const deleteProjectData = createAsyncThunk(
  "adminProjects/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProjectDataAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to delete project");
    }
  }
);

const initialState: ProjectsState = {
  status: "idle",
  message: "",
  data: [],
};

const adminProjectsSlice = createSlice({
  name: "adminProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(saveProjectData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveProjectData.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(saveProjectData.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error saving";
      })
      .addCase(deleteProjectData.fulfilled, (state, action) => {
        state.data = state.data.filter((p) => p.id !== action.payload);
      });
  },
});

export default adminProjectsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "@/containers/admin/projects/Hooks";

interface ProjectsState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: Project[];
}

export const fetchProjectsData = createAsyncThunk("projects/fetch", async () => {
  const res = await fetch("/api/admin/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return await res.json();
});

export const saveProjectData = createAsyncThunk(
  "projects/save",
  async (data: Partial<Project>) => {
    const isEdit = !!data.id;
    const res = await fetch("/api/admin/projects", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to save project");
    }
    return await res.json();
  }
);

export const deleteProjectData = createAsyncThunk(
  "projects/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to delete project");
    }
    return id;
  }
);

const initialState: ProjectsState = {
  status: "idle",
  message: "",
  data: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProjectsData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // Save
      .addCase(saveProjectData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveProjectData.fulfilled, (state, action) => {
        state.status = "success";
        // To be safe, we rely on the component to dispatch fetchProjectsData again,
        // or we could optimistically update the state here.
      })
      .addCase(saveProjectData.rejected, (state, action) => {
        state.status = "error";
        state.message = action.error.message || "Error saving";
      })
      // Delete
      .addCase(deleteProjectData.fulfilled, (state, action) => {
        state.data = state.data.filter(p => p.id !== action.payload);
      });
  },
});

export default projectsSlice.reducer;

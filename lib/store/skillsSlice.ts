import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SkillCategory } from "@/containers/admin/skills/Hooks";

interface SkillsState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: SkillCategory[];
}

export const fetchSkillsData = createAsyncThunk("skills/fetch", async () => {
  const res = await fetch("/api/admin/skills");
  if (!res.ok) throw new Error("Failed to fetch skills");
  return await res.json();
});

export const addCategoryData = createAsyncThunk(
  "skills/addCategory",
  async (data: { name: string; icon: string }) => {
    const res = await fetch("/api/admin/skills/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to add category");
    }
    return await res.json();
  }
);

export const deleteCategoryData = createAsyncThunk(
  "skills/deleteCategory",
  async (id: string) => {
    const res = await fetch(`/api/admin/skills/categories?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to delete category");
    }
    return id;
  }
);

export const addSkillData = createAsyncThunk(
  "skills/addSkill",
  async (data: { name: string; level: number; categoryId: string }) => {
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to add skill");
    }
    return await res.json();
  }
);

export const deleteSkillData = createAsyncThunk(
  "skills/deleteSkill",
  async (id: string) => {
    const res = await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to delete skill");
    }
    return id;
  }
);

export const updateCategoryData = createAsyncThunk(
  "skills/updateCategory",
  async (data: { id: string; name: string; icon: string }) => {
    const res = await fetch("/api/admin/skills/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to update category");
    }
    return await res.json();
  }
);

export const updateSkillData = createAsyncThunk(
  "skills/updateSkill",
  async (data: { id: string; name: string; level: number; categoryId: string }) => {
    const res = await fetch("/api/admin/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to update skill");
    }
    return await res.json();
  }
);


const initialState: SkillsState = {
  status: "idle",
  message: "",
  data: [],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillsData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addCategoryData.fulfilled, () => {
        // usually we'd optimistically update, but we rely on re-fetching in component
      })
      .addCase(addSkillData.fulfilled, () => {
      });
  },
});

export default skillsSlice.reducer;

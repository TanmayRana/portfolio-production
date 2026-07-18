import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SkillCategory } from "./Hooks";
import {
  fetchSkillsDataAPI,
  addCategoryDataAPI,
  deleteCategoryDataAPI,
  addSkillDataAPI,
  deleteSkillDataAPI,
  updateCategoryDataAPI,
  updateSkillDataAPI,
} from "./skillsAPI";

interface SkillsState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: SkillCategory[];
}

export const fetchSkillsData = createAsyncThunk("adminSkills/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchSkillsDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch skills");
  }
});

export const addCategoryData = createAsyncThunk(
  "adminSkills/addCategory",
  async (data: { name: string; icon: string }, { rejectWithValue }) => {
    try {
      const res = await addCategoryDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to add category");
    }
  }
);

export const deleteCategoryData = createAsyncThunk(
  "adminSkills/deleteCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteCategoryDataAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to delete category");
    }
  }
);

export const addSkillData = createAsyncThunk(
  "adminSkills/addSkill",
  async (data: { name: string; level: number; categoryId: string }, { rejectWithValue }) => {
    try {
      const res = await addSkillDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to add skill");
    }
  }
);

export const deleteSkillData = createAsyncThunk(
  "adminSkills/deleteSkill",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteSkillDataAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to delete skill");
    }
  }
);

export const updateCategoryData = createAsyncThunk(
  "adminSkills/updateCategory",
  async (data: { id: string; name: string; icon: string }, { rejectWithValue }) => {
    try {
      const res = await updateCategoryDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to update category");
    }
  }
);

export const updateSkillData = createAsyncThunk(
  "adminSkills/updateSkill",
  async (data: { id: string; name: string; level: number; categoryId: string }, { rejectWithValue }) => {
    try {
      const res = await updateSkillDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to update skill");
    }
  }
);

const initialState: SkillsState = {
  status: "idle",
  message: "",
  data: [],
};

const adminSkillsSlice = createSlice({
  name: "adminSkills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillsData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addCategoryData.fulfilled, () => {})
      .addCase(addSkillData.fulfilled, () => {});
  },
});

export default adminSkillsSlice.reducer;

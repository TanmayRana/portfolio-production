import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMyExperienceDataAPI,
  addMyExperienceAPI,
  updateMyExperienceAPI,
  deleteMyExperienceAPI,
} from "./myExperienceAPI";

export interface MyExperience {
  id: string;
  title: string;
  body: string;
  showIdeaMessage?: boolean;
  order?: number;
}

export interface MyExperienceFormData {
  title: string;
  body: string;
  showIdeaMessage?: boolean;
  order?: number;
}

interface MyExperienceState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: MyExperience[];
}

export const fetchMyExperienceData = createAsyncThunk("adminMyExperience/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchMyExperienceDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch my experience data");
  }
});

export const addMyExperience = createAsyncThunk(
  "adminMyExperience/add",
  async (data: MyExperienceFormData, { rejectWithValue }) => {
    try {
      const res = await addMyExperienceAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to add experience");
    }
  }
);

export const updateMyExperience = createAsyncThunk(
  "adminMyExperience/update",
  async (data: { id: string } & MyExperienceFormData, { rejectWithValue }) => {
    try {
      const res = await updateMyExperienceAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to update experience");
    }
  }
);

export const deleteMyExperience = createAsyncThunk(
  "adminMyExperience/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteMyExperienceAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to delete experience");
    }
  }
);

const initialState: MyExperienceState = {
  status: "idle",
  message: "",
  data: [],
};

const adminMyExperienceSlice = createSlice({
  name: "adminMyExperience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyExperienceData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addMyExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMyExperience.fulfilled, (state, action) => {
        state.status = "success";
        state.data.push(action.payload);
      })
      .addCase(addMyExperience.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error adding";
      })
      .addCase(updateMyExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMyExperience.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateMyExperience.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error updating";
      })
      .addCase(deleteMyExperience.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default adminMyExperienceSlice.reducer;

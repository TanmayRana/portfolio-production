import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

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

export const fetchMyExperienceData = createAsyncThunk("myExperience/fetch", async () => {
  const res = await fetch("/api/admin/my-experience");
  if (!res.ok) throw new Error("Failed to fetch my experience data");
  return await res.json();
});

export const addMyExperience = createAsyncThunk(
  "myExperience/add",
  async (data: MyExperienceFormData) => {
    const res = await fetch("/api/admin/my-experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to add experience");
    }
    return await res.json();
  }
);

export const updateMyExperience = createAsyncThunk(
  "myExperience/update",
  async (data: { id: string } & MyExperienceFormData) => {
    const res = await fetch("/api/admin/my-experience", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to update experience");
    }
    return await res.json();
  }
);

export const deleteMyExperience = createAsyncThunk(
  "myExperience/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/my-experience?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to delete experience");
    }
    return id;
  }
);

const initialState: MyExperienceState = {
  status: "idle",
  message: "",
  data: [],
};

const myExperienceSlice = createSlice({
  name: "myExperience",
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
        state.message = action.error.message || "Error adding";
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
        state.message = action.error.message || "Error updating";
      })
      .addCase(deleteMyExperience.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default myExperienceSlice.reducer;

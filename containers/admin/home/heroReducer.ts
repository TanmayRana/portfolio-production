import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroDataAPI, submitHeroFormAPI } from "./heroAPI";

/* ── Types ─────────────────────────────────────────────── */
export interface HeroFormData {
  name: string;
  tagline: string;
  heroDescription: string;
  imageUrl?: string;
  videoUrl?: string;
}

interface HeroState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  errors: Record<string, string[]>;
  data: HeroFormData | null;
}

/* ── Async Thunk ────────────────────────────────────────── */
export const submitHeroForm = createAsyncThunk<
  { success: boolean; message: string; data?: HeroFormData; errors?: Record<string, string[]> },
  HeroFormData
>("adminHero/submit", async (data, { rejectWithValue }) => {
  try {
    const resData = await submitHeroFormAPI(data);
    return { success: true, message: "Success", data: resData };
  } catch (error: any) {
    return rejectWithValue(error || "Failed to submit");
  }
});

export const fetchHeroData = createAsyncThunk<HeroFormData | null>(
  "adminHero/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchHeroDataAPI();
      return data;
    } catch (error: any) {
      return rejectWithValue(error || "Failed to fetch hero data");
    }
  }
);

/* ── Slice ──────────────────────────────────────────────── */
const initialState: HeroState = {
  status: "idle",
  message: "",
  errors: {},
  data: null,
};

const adminHeroSlice = createSlice({
  name: "adminHero",
  initialState,
  reducers: {
    resetHeroState(state) {
      state.status = "idle";
      state.message = "";
      state.errors = {};
    },
    setHeroData(state, action: PayloadAction<HeroFormData>) {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitHeroForm.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.errors = {};
      })
      .addCase(submitHeroForm.fulfilled, (state, action) => {
        state.status = action.payload.success ? "success" : "error";
        state.message = action.payload.message;
        state.errors = action.payload.errors ?? {};
        if (action.payload.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(submitHeroForm.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message ?? "Something went wrong.";
        state.errors = {};
      })
      .addCase(fetchHeroData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }
      });
  },
});

export const { resetHeroState, setHeroData } = adminHeroSlice.actions;
export default adminHeroSlice.reducer;

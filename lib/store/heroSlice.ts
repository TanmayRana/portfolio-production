import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

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
>("hero/submit", async (data) => {
  const res = await fetch("/api/admin/hero", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.error || "Failed to submit");
  }
  return { success: true, message: "Success", data: resData };
});

export const fetchHeroData = createAsyncThunk<HeroFormData | null>(
  "hero/fetch",
  async () => {
    const res = await fetch("/api/admin/hero");
    if (!res.ok) {
      throw new Error("Failed to fetch hero data");
    }
    const data = await res.json();
    return data;
  }
);

/* ── Slice ──────────────────────────────────────────────── */
const initialState: HeroState = {
  status: "idle",
  message: "",
  errors: {},
  data: null,
};

const heroSlice = createSlice({
  name: "hero",
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
        state.message = action.error.message ?? "Something went wrong.";
        state.errors = {};
      })
      .addCase(fetchHeroData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }
      });
  },
});

export const { resetHeroState, setHeroData } = heroSlice.actions;
export default heroSlice.reducer;

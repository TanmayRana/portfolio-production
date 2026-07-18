import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeroAPI } from "./homeAPI";

export interface HeroData {
  name: string;
  tagline: string;
  heroDescription: string;
  videoUrl?: string | null;
}

interface HomeState {
  data: HeroData | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchHero = createAsyncThunk("home/fetchHero", async (_, { rejectWithValue }) => {
  try {
    const res = await getHeroAPI();
    if (res.success) {
      return res.data;
    }
    return rejectWithValue(res.message || "Failed to fetch hero data");
  } catch (err: any) {
    return rejectWithValue(err.message || "An error occurred");
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHero.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;

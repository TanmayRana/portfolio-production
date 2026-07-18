import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Certification } from "./Hooks";
import {
  fetchCertificationsDataAPI,
  saveCertificationDataAPI,
  deleteCertificationDataAPI,
} from "./certificationsAPI";

interface CertificationsState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: Certification[];
}

export const fetchCertificationsData = createAsyncThunk("adminCertifications/fetch", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchCertificationsDataAPI();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch certifications");
  }
});

export const saveCertificationData = createAsyncThunk(
  "adminCertifications/save",
  async (data: Partial<Certification>, { rejectWithValue }) => {
    try {
      const res = await saveCertificationDataAPI(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to save certification");
    }
  }
);

export const deleteCertificationData = createAsyncThunk(
  "adminCertifications/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteCertificationDataAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err || "Failed to delete certification");
    }
  }
);

const initialState: CertificationsState = {
  status: "idle",
  message: "",
  data: [],
};

const adminCertificationsSlice = createSlice({
  name: "adminCertifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificationsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCertificationsData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchCertificationsData.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error fetching certifications";
      })
      .addCase(saveCertificationData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveCertificationData.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(saveCertificationData.rejected, (state, action) => {
        state.status = "error";
        state.message = (action.payload as any)?.message || "Error saving";
      })
      .addCase(deleteCertificationData.fulfilled, (state, action) => {
        state.data = state.data.filter((c) => c.id !== action.payload);
      });
  },
});

export default adminCertificationsSlice.reducer;

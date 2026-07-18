import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Certification } from "@/containers/admin/certifications/Hooks";

interface CertificationsState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  data: Certification[];
}

export const fetchCertificationsData = createAsyncThunk("certifications/fetch", async () => {
  const res = await fetch("/api/admin/certifications");
  if (!res.ok) throw new Error("Failed to fetch certifications");
  return await res.json();
});

export const saveCertificationData = createAsyncThunk(
  "certifications/save",
  async (data: Partial<Certification>) => {
    const isEdit = !!data.id;
    const res = await fetch("/api/admin/certifications", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to save certification");
    }
    return await res.json();
  }
);

export const deleteCertificationData = createAsyncThunk(
  "certifications/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/certifications?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error || "Failed to delete certification");
    }
    return id;
  }
);

const initialState: CertificationsState = {
  status: "idle",
  message: "",
  data: [],
};

const certificationsSlice = createSlice({
  name: "certifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificationsData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(saveCertificationData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveCertificationData.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(saveCertificationData.rejected, (state, action) => {
        state.status = "error";
        state.message = action.error.message || "Error saving";
      })
      .addCase(deleteCertificationData.fulfilled, (state, action) => {
        state.data = state.data.filter(c => c.id !== action.payload);
      });
  },
});

export default certificationsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "../../api/uploadService";

const initialState = {
  files: [],
  loading: false,
  error: null,
};

export const fetchStoreFiles = createAsyncThunk(
  "uploads/fetchStoreFiles",
  async (storeId, thunkAPI) => {
    try {
      const data = await uploadService.getStoreFiles(storeId);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "uploads/uploadFile",
  async ({ storeId, formData }, thunkAPI) => {
    try {
      const data = await uploadService.uploadFile(storeId, formData);
      return data.file; // the saved file object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "uploads/deleteFile",
  async (fileId, thunkAPI) => {
    try {
      await uploadService.deleteFile(fileId);
      return fileId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    clearUploads(state) {
      state.files = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStoreFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchStoreFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Error";
      })
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.unshift(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Upload failed";
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter((f) => f._id !== action.payload);
      });
  },
});

export const { clearUploads } = slice.actions;
export default slice.reducer;

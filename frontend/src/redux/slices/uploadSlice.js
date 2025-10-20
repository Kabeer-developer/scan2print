import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as uploadService from "../../api/uploadService";

export const uploadFile = createAsyncThunk("upload/file", async ({ storeId, formData }, thunkAPI) => {
  try {
    return await uploadService.uploadFile(storeId, formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Upload failed");
  }
});

export const fetchFiles = createAsyncThunk("upload/fetchFiles", async (storeId, thunkAPI) => {
  try {
    return await uploadService.getFiles(storeId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch failed");
  }
});

export const deleteFile = createAsyncThunk("upload/deleteFile", async (fileId, thunkAPI) => {
  try {
    await uploadService.deleteFile(fileId);
    return fileId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
  }
});

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    uploads: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => { state.loading = true; })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.uploads.push(action.payload);
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.uploads = action.payload;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.uploads = state.uploads.filter((f) => f._id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;

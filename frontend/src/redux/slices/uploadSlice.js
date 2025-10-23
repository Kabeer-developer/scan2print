import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as uploadService from "../../api/uploadService";

export const fetchStoreUploads = createAsyncThunk(
  "upload/fetch",
  async (storeId) => {
    const res = await uploadService.getStoreUploads(storeId);
    return res.data;
  }
);

export const uploadFile = createAsyncThunk(
  "upload/uploadFile",
  async ({ storeId, formData }) => {
    const res = await uploadService.uploadFile(storeId, formData);
    return res.data;
  }
);

export const deleteUploadFile = createAsyncThunk(
  "upload/deleteFile",
  async (fileId) => {
    await uploadService.deleteUploadFile(fileId);
    return fileId;
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: { files: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreUploads.fulfilled, (state, action) => { state.files = action.payload; })
      .addCase(uploadFile.fulfilled, (state, action) => { state.files.push(action.payload); })
      .addCase(deleteUploadFile.fulfilled, (state, action) => {
        state.files = state.files.filter((f) => f._id !== action.payload);
      });
  },
});

export default uploadSlice.reducer;

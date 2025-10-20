import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as storeService from "../../api/storeService";

// Create Store
export const createStore = createAsyncThunk("store/create", async (data, thunkAPI) => {
  try {
    return await storeService.createStore(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Store creation failed");
  }
});

// Get Store by ID
export const fetchStoreById = createAsyncThunk("store/getById", async (id, thunkAPI) => {
  try {
    return await storeService.getStoreById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch store");
  }
});

// Get Files for Store
export const fetchStoreFiles = createAsyncThunk("store/getFiles", async (id, thunkAPI) => {
  try {
    return await storeService.getStoreFiles(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch files");
  }
});

// Delete Store File
export const deleteStoreFile = createAsyncThunk("store/deleteFile", async ({ storeId, fileId }, thunkAPI) => {
  try {
    await storeService.deleteStoreFile(storeId, fileId);
    return fileId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete file");
  }
});

const storeSlice = createSlice({
  name: "store",
  initialState: {
    store: null,
    files: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStore.pending, (state) => { state.loading = true; })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.store = action.payload;
      })
      .addCase(fetchStoreFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(deleteStoreFile.fulfilled, (state, action) => {
        state.files = state.files.filter((f) => f._id !== action.payload);
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

export default storeSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as storeService from "../../api/storeService";

export const fetchAllStores = createAsyncThunk(
  "store/fetchAll",
  async () => {
    const res = await storeService.getAllStores();
    return res.data;
  }
);

export const createStore = createAsyncThunk(
  "store/create",
  async (formData) => {
    const res = await storeService.createStore(formData);
    return res.data;
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState: { stores: [], myStore: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStores.fulfilled, (state, action) => { state.stores = action.payload; })
      .addCase(createStore.fulfilled, (state, action) => { state.myStore = action.payload; });
  },
});

export default storeSlice.reducer;

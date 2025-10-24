import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeService from "../../api/storeService";

const initialState = {
  store: null,
  token: null,
  loading: false,
  error: null,
};

export const registerStore = createAsyncThunk(
  "store/register",
  async (formData, thunkAPI) => {
    try {
      const data = await storeService.registerStore(formData);
      // backend returns { store, token }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginStore = createAsyncThunk(
  "store/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await storeService.loginStore(credentials);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: "store",
  initialState,
  reducers: {
    logout(state) {
      state.store = null;
      state.token = null;
      localStorage.removeItem("storeInfo");
    },
    loadUserFromStorage(state) {
      const raw = localStorage.getItem("storeInfo");
      if (raw) {
        try {
          const { store, token } = JSON.parse(raw);
          state.store = store;
          state.token = token;
        } catch (e) {}
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStore.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload.store;
        state.token = action.payload.token;
        localStorage.setItem(
          "storeInfo",
          JSON.stringify({ store: action.payload.store, token: action.payload.token })
        );
      })
      .addCase(registerStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Error";
      })
      .addCase(loginStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStore.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload.store;
        state.token = action.payload.token;
        localStorage.setItem(
          "storeInfo",
          JSON.stringify({ store: action.payload.store, token: action.payload.token })
        );
      })
      .addCase(loginStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Login failed";
      });
  },
});

export const { logout, loadUserFromStorage } = slice.actions;
export default slice.reducer;

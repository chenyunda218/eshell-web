import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    count: 0,
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.count++;
      if (state.count > 0) {
        state.loading = true;
      }
    },
    stopLoading: (state) => {
      state.count--;
      if (state.count <= 0) {
        state.loading = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

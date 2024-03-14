import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    opened: false,
  },
  reducers: {
    open: (state) => {
      state.opened = true;
    },
    close: (state) => {
      state.opened = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = sidebarSlice.actions;

export default sidebarSlice.reducer;

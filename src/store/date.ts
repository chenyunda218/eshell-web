import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SuperDatePicker {
  start: string;
  end: string;
}

export const loadingSlice = createSlice({
  name: "loading",
  initialState: () => {
    return {
      start: "now/d",
      end: "now/d",
    } as SuperDatePicker;
  },
  reducers: {
    setStart: (state, start: PayloadAction<string>) => {
      state.start = start.payload;
    },
    setEnd: (state, end: PayloadAction<string>) => {
      state.end = end.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStart, setEnd } = loadingSlice.actions;

export default loadingSlice.reducer;

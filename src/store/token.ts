import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: () =>{
    const token = localStorage.getItem("token");
    return {
      token: token,
    } as { token: string | null }
  },
  reducers: {
    setToken: (state, token: PayloadAction<string>) => {
      localStorage.setItem("token", token.payload);
      state.token = token.payload;
    },
    removeToken: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;

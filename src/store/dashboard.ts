import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Dashboard } from "../api/models";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: () => {
    return {
      dashboards: [],
    } as {
      dashboards: Dashboard[];
    }
  },
  reducers: {
    setDashboards: (state, dashboards: PayloadAction<Dashboard[]>) => {
      state.dashboards = dashboards.payload;
    },
    addDashboard: (state, dashboard: PayloadAction<Dashboard[]>) => {
      state.dashboards.push(...dashboard.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDashboard, setDashboards } = dashboardSlice.actions;

export default dashboardSlice.reducer;

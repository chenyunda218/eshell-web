import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Root from "./pages";
import Dashboard from "./pages/dashboard";
import Query from "./pages/query";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import "@elastic/eui/dist/eui_theme_light.css";
import CreateDashboard from "./pages/dashboard/create";
import DashboardDetail from "./pages/dashboard/detail";
import CreateVisualization from "./pages/dashboard/detail/create-visualization";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Query /> },
      {
        path: "dashboard", element: <Dashboard />,
      },
      {
        path: "dashboard/create", element: <CreateDashboard />,
      },
      {
        path: "dashboard/:id", element: <DashboardDetail />,
      },
      {
        path: "dashboard/:id/create-visualization", element: <CreateVisualization />,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

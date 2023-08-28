import { RouteKeys } from "@Constants";
import Layout from "@Pages/Layout";
import { ThemeProvider } from "@emotion/react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import PaginatedImageList from "./pages/PaginatedImageList";
import Uploader from "./pages/Uploader";
import theme from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    ),
    // errorElement: <ErrorPage />, // using toasts instead of a dedicated error page
    children: [
      {
        path: RouteKeys.Home,
        element: <PaginatedImageList />,
      },
      {
        path: RouteKeys.Upload,
        element: <Uploader />,
      },
      {
        path: "*", // Match any path that isn't caught by the above routes
        element: <Navigate to={RouteKeys.Home} replace />, // Redirect to home
      },
    ],
  },
]);

export default router;

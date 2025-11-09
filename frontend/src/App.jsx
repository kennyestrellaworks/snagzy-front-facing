import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { Home } from "./pages/home/Home";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import Products from "./pages/Products";
import Stores from "./pages/Stores";
import "./App.css";

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="stores" element={<Stores />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

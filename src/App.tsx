import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import OrderHistory from "./components/Ecommerce/OrderHistory";
import NewProduct from "./components/Ecommerce/NewProduct";
import ProductList from "./components/Ecommerce/ProductList";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import List from "./components/Category/ParentCategory/List";
import AddParentCategory from "./components/Category/ParentCategory/AddParentCategory";
import AddCategory from "./components/Category/Category/AddCategory";
import CategoryList from "./components/Category/Category/List";
import Clarity from "./components/Clarity";
import InnerCategoryList from "./components/Category/InnerCategory/InnerCategoryList";
import AddInnerCategory from "./components/Category/InnerCategory/AddInnerCategory";
import AuthLayout from "./components/Layout/AuthLayout";
import Login from "./components/LoginPage/Login";
import ForgotPassword from "./components/LoginPage/ForgotPassword";
import NewPassword from "./components/LoginPage/NewPassword";
import Verification from "./components/LoginPage/Verification";
import Cut from "./components/Cut/index";
import Color from "./components/Color/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Shape from "./components/Shape";
import { Toaster } from "./components/ui/toaster";
import User from "./components/User";
import AdminUser from "./components/User/AdminUser";
import BlogList from "./components/blog/BlogList";
import BannerList from "./components/banner/BannerList";
import MyProfile from "./components/MyProfile/MyProfile";
import BulkUpload from "./components/BulkUpload/BulkUpload";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "new-password",
        element: <NewPassword />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/myprofile",
        element: <MyProfile />,
      },
    ],
  },
  // Gems Routes
  {
    path: "/gems",
    element: <RootLayout />,
    children: [
      {
        path: "cut",
        element: <Cut />,
      },
      {
        path: "color",
        element: <Color />,
      },
      {
        path: "clarity",
        element: <Clarity />,
      },
      {
        path: "shape",
        element: <Shape />,
      },
      {
        path: "banner",
        element: <BannerList />,
      },
      {
        path: "blog",
        element: <BlogList />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "new-product",
        element: <NewProduct />,
      },
      {
        path: "edit-product/:editId",
        element: <NewProduct />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "bulk-upload",
        element: <BulkUpload />,
      },
    ],
  },
  //  Category Routes
  {
    path: "category",
    element: <RootLayout />,
    children: [
      {
        path: "category",
        element: <List />,
      },
      {
        path: "category/add_parent_category",
        element: <AddParentCategory />,
      },
      {
        path: "sub-category",
        element: <CategoryList />,
      },
      {
        path: "sub-category/add_category",
        element: <AddCategory />,
      },
      {
        path: "inner-category",
        element: <InnerCategoryList />,
      },
      {
        path: "inner-category/add_inner_category",
        element: <AddInnerCategory />,
      },
    ],
  },
  //  Customer Routes
  {
    path: "/customer-contact",
    element: <RootLayout />,
    children: [
      {
        path: "customer",
        element: <Customers />,
      },
    ],
  },
  // User Routes
  {
    path: "/user",
    element: <RootLayout />,
    children: [
      {
        path: "user-list",
        element: <User />,
      },
      {
        path: "admin",
        element: <AdminUser />,
      },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;

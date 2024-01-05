import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import OrderHistory from "./components/Ecommerce/OrderHistory";
import OrderSummary from "./components/Ecommerce/OrderSummary";
import CheckoutForm from "./components/Ecommerce/CheckoutForm";
import NewProduct from "./components/Ecommerce/NewProduct";
import ShoppingCart from "./components/Ecommerce/ShoppingCart";
import ProductOverview from "./components/Ecommerce/ProductOverview";
import ProductList from "./components/Ecommerce/ProductList";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import AddCustomer from "./components/Customers/AddCustomer";
import List from "./components/Category/ParentCategory/List";
import AddParentCategory from "./components/Category/ParentCategory/AddParentCategory";
import AddCategory from "./components/Category/Category/AddCategory";
import CategoryList from "./components/Category/Category/List";
import Clarity from "./components/Clarity";
import InnerCategoryList from "./components/Category/InnerCategory/InnerCategoryList";
import AddInnerCategory from "./components/Category/InnerCategory/AddInnerCategory";
import AuthLayout from "./components/Layout/AuthLayout";
import Login from "./components/LoginPage/Login";
import SignUp from "./components/LoginPage/SignUp";
import ForgotPassword from "./components/LoginPage/ForgotPassword";
import NewPassword from "./components/LoginPage/NewPassword";
import Verification from "./components/LoginPage/Verification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Shape from "./components/Shape";
import { Toaster } from "./components/ui/toaster";

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
        path: "signup",
        element: <SignUp />,
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
    ],
  },
  // Gems Routes
  {
    path: "/gems",
    element: <RootLayout />,
    children: [
      {
        path: "clarity",
        element: <Clarity />,
      },
      {
        path: "shape",
        element: <Shape />,
      },
      {
        path: "product-overview",
        element: <ProductOverview />,
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
        path: "shopping-cart",
        element: <ShoppingCart />,
      },
      {
        path: "checkout-form",
        element: <CheckoutForm />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "order-summary",
        element: <OrderSummary />,
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
      {
        path: "add_customer",
        element: <AddCustomer />,
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

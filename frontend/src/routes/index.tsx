import { createBrowserRouter } from "react-router-dom";

// Layouts
import CustomerLayout from "../layouts/CustomerLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Route Protection
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";

// Public Page
import LandingPage from "../pages/LandingPage";

// Customer Pages
import Home from "../pages/customer/Home";
import Books from "../pages/customer/Books";
import Journals from "../pages/customer/Journals";
import Magazines from "../pages/customer/Magazines";
import Research from "../pages/customer/Research";
import OtherPublications from "../pages/customer/OtherPublications";
import Search from "../pages/customer/Search";
import BookDetails from "../pages/customer/BookDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Profile from "../pages/customer/Profile";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import Publications from "../pages/admin/Publications";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Users from "../pages/admin/Users";
import AddPublication from "../pages/admin/AddPublication";

// Error Page
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  // ================= PUBLIC WEBSITE =================

  {
    path: "/",
    element: <LandingPage />,
  },

  // ================= CUSTOMER PORTAL =================

  {
    path: "/customer",
    element: (
      <ProtectedRoute>
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "journals",
        element: <Journals />,
      },
      {
        path: "magazines",
        element: <Magazines />,
      },
      {
        path: "research",
        element: <Research />,
      },
      {
        path: "other-publications",
        element: <OtherPublications />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "book/:id",
        element: <BookDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  // ================= AUTH =================

  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // ================= ADMIN LOGIN =================

  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // ================= ADMIN PANEL =================

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "publications",
        element: <Publications />,
      },
      {
        path: "publications/add",
        element: <AddPublication />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },

  // ================= 404 =================

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
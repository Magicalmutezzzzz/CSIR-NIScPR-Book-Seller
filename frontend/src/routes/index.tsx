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
import Wishlist from "../pages/customer/Wishlist";
import Addresses from "../pages/customer/Addresses";
import EditProfile from "../pages/customer/EditProfile";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import Publications from "../pages/admin/Publications";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Users from "../pages/admin/Users";
import AddPublication from "../pages/admin/AddPublication";
import AdminEmptyPage from "../pages/admin/AdminEmptyPage";
import ChangePassword from "../pages/customer/ChangePassword";
import DeleteAccount from "../pages/customer/DeleteAccount";
import MyOrders from "../pages/customer/MyOrders";
import TrackOrder from "../pages/customer/TrackOrder";
import Payment from "../pages/customer/Payment";
import OrderPlaced from "../pages/customer/OrderPlaced";

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
        <CustomerLayout />
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
        element: (
          <ProtectedRoute requiredRole="customer">
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute requiredRole="customer">
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "addresses",
        element: (
          <ProtectedRoute requiredRole="customer">
            <Addresses />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-profile",
        element: (
          <ProtectedRoute requiredRole="customer">
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoute requiredRole="customer">
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "delete-account",
        element: (
          <ProtectedRoute requiredRole="customer">
            <DeleteAccount />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute requiredRole="customer">
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "track-order/:orderId",
        element: (
          <ProtectedRoute requiredRole="customer">
            <TrackOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute requiredRole="customer">
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-placed/:orderId",
        element: (
          <ProtectedRoute requiredRole="customer">
            <OrderPlaced />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
            <Wishlist />
        ),
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



  // ================= ADMIN PANEL =================

  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
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
      { path: "books", element: <Publications typeFilter="Book" /> },
      { path: "journals", element: <Publications typeFilter="Journal" /> },
      { path: "magazines", element: <Publications typeFilter="Magazine" /> },
      { path: "research", element: <Publications typeFilter="Research" /> },
      { path: "other-publications", element: <Publications typeFilter="Other" /> },
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
      { path: "inventory", element: <AdminEmptyPage title="Inventory" description="Stock levels for published catalogue items will be managed here." actionLabel="Manage publications" actionPath="/admin/publications" /> },
      { path: "reports", element: <AdminEmptyPage title="Reports" description="Sales, catalogue, and customer reports will appear here once real activity is recorded." /> },
      { path: "settings", element: <AdminEmptyPage title="Settings" description="Configure publication platform settings and integrations here." /> },
    ],
  },

  // ================= 404 =================

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import { getAuthenticatedUser, logout } from "../../services/authService";
import { wishlistService } from "../../services/wishlistService";
import { cartService } from "../../services/cartService";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/customer/books" },
  { name: "Journals", path: "/customer/journals" },
  { name: "Magazines", path: "/customer/magazines" },
  { name: "Other Publications", path: "/customer/other-publications" },
];

const GlobalNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = getAuthenticatedUser();
  const cartCount = cartService.getCartCount();
  const wishlistCount = wishlistService.count();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const username =
    user && user.email ? user.email.split("@")[0] : "";

  const customerNavItems = user
    ? [...navItems, { name: "Orders", path: "/customer/orders" }]
    : navItems;

  const navLinkClass =
    "px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition";
  const navLinkActiveClass =
    "px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/DefaultHeaderLogo.jpg"
              alt="Logo"
              className="h-18 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden items-center gap-8 lg:flex">
          {customerNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive ? navLinkActiveClass : navLinkClass
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/customer/search"
            className="rounded-full p-2 transition hover:bg-gray-100"
            title="Search"
          >
            <Search size={22} />
          </Link>
          <Link
            to="/customer/wishlist"
            className="relative rounded-full p-2 transition hover:bg-gray-100"
            title="Wishlist"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/customer/cart"
            className="relative rounded-full p-2 transition hover:bg-gray-100"
            title="Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {!user ? (
            <>
              <Link
                to="/auth/login"
                className="flex items-center gap-2 rounded-xl border border-[#003366] px-5 py-2 font-medium text-[#003366] transition hover:bg-[#003366] hover:text-white"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-2 font-medium text-white transition hover:bg-[#002855]"
              >
                <UserPlus size={18} /> Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/customer/profile"
                className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-2 font-medium text-white transition hover:bg-[#002855]"
                title="Profile"
              >
                <User size={18} />
                {username}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-[#003366] px-4 py-2 font-medium text-[#003366]"
                title="Logout"
              >
                <X size={18} /> Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="rounded-lg p-2 lg:hidden flex items-center">
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-lg p-2 lg:hidden"
            aria-label="Open Menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navbar */}
        {mobileOpen && (
          <div className="border-t bg-white lg:hidden">
            <nav className="flex flex-col px-6 py-4">
              {customerNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 text-blue-600 font-semibold border-l-4 border-blue-600 bg-blue-50 rounded"
                      : "block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded"
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="flex space-x-3 mt-2">
                <Link
                  to="/customer/search"
                  className="rounded-full p-2 transition hover:bg-gray-100"
                  title="Search"
                  onClick={() => setMobileOpen(false)}
                >
                  <Search size={22} />
                </Link>
                <Link
                  to="/customer/wishlist"
                  className="relative rounded-full p-2 transition hover:bg-gray-100"
                  title="Wishlist"
                  onClick={() => setMobileOpen(false)}
                >
                  <Heart size={22} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/customer/cart"
                  className="relative rounded-full p-2 transition hover:bg-gray-100"
                  title="Cart"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
              {!user ? (
                <div className="flex flex-col space-y-2 mt-3">
                  <Link
                    to="/auth/login"
                    className="w-full px-3 py-2 text-blue-700 border border-blue-600 rounded hover:bg-blue-50 flex items-center justify-center gap-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogIn size={18} /> Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="w-full px-3 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 flex items-center justify-center gap-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    <UserPlus size={18} /> Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-3">
                  <Link
                    to="/customer/profile"
                    className="w-full px-3 py-2 text-blue-700 border border-blue-600 rounded hover:bg-blue-50 flex items-center justify-center gap-1"
                    title="Profile"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User size={18} /> {username}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-3 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 flex items-center justify-center gap-1"
                    title="Logout"
                  >
                    <X size={18} /> Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

export default GlobalNavbar;
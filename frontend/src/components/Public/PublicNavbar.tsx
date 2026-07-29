import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { getAuthenticatedUser, getDashboardPath, logout } from "../../services/authService";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getAuthenticatedUser();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Publications", path: "/customer/books" },
    { name: "Journals", path: "/customer/journals" },
    { name: "Magazines", path: "/customer/magazines" },
    { name: "Research", path: "/customer/research" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <img
            src="/DefaultHeaderLogo.jpg"
            alt="CSIR-NIScPR"
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-[#003366]"
                    : "text-gray-700 hover:text-[#003366]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Buttons */}

        <div className="hidden items-center gap-3 lg:flex">

          {user ? <>
          <Link
            to={getDashboardPath(user.role)}
            className="flex items-center gap-2 rounded-lg border border-[#003366] px-5 py-2 font-medium text-[#003366] transition hover:bg-[#003366] hover:text-white"
          >
            <LogIn size={18} />
            Dashboard
          </Link>
          <button onClick={() => { logout(); navigate("/auth/login"); }} className="rounded-lg bg-[#003366] px-5 py-2 font-medium text-white transition hover:bg-[#002855]">Logout</button>
          </> : <>
            <Link to="/auth/login" className="flex items-center gap-2 rounded-lg border border-[#003366] px-5 py-2 font-medium text-[#003366] transition hover:bg-[#003366] hover:text-white"><LogIn size={18} />Login</Link>
            <Link to="/auth/register" className="flex items-center gap-2 rounded-lg bg-[#003366] px-5 py-2 font-medium text-white transition hover:bg-[#002855]"><UserPlus size={18} />Sign Up</Link>
          </>}

        </div>

        {/* Mobile Button */}

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t bg-white lg:hidden">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 hover:bg-gray-100"
            >
              {item.name}
            </NavLink>
          ))}

          <div className="flex gap-3 p-6">

            <Link
              to="/auth/login"
              className="flex-1 rounded-lg border border-[#003366] py-3 text-center font-semibold text-[#003366]"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="flex-1 rounded-lg bg-[#003366] py-3 text-center font-semibold text-white"
            >
              Sign Up
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}

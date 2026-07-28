import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "Journals", path: "/journals" },
  { name: "Magazines", path: "/magazines" },
  { name: "Research", path: "/research" },
  { name: "Publications", path: "/other-publications" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/DefaultHeaderLogo.jpg"
            alt="CSIR-NIScPR"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">

          {navLinks.map((item) => (
            <NavLink
              key={item.path}
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
              {/* Right Actions */}

        <div className="hidden items-center gap-4 lg:flex">

          <Link
            to="/search"
            className="rounded-full p-2 transition hover:bg-gray-100"
            title="Search"
          >
            <Search size={22} />
          </Link>

          <Link
            to="/cart"
            className="relative rounded-full p-2 transition hover:bg-gray-100"
            title="Cart"
          >
            <ShoppingCart size={22} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              0
            </span>

          </Link>

          <Link
            to="/auth/login"
            className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-2 font-medium text-white transition hover:bg-[#002855]"
          >
            <User size={18} />
            Login
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Navigation */}

      {menuOpen && (

        <div className="border-t bg-white lg:hidden">

          <nav className="flex flex-col px-6 py-4">

            {navLinks.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 transition ${
                    isActive
                      ? "bg-[#003366] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>

            ))}
                    <div className="mt-4 border-t pt-4">

              <Link
                to="/search"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 transition hover:bg-gray-100"
              >
                <Search size={20} />
                Search
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 transition hover:bg-gray-100"
              >
                <ShoppingCart size={20} />
                Cart
              </Link>

              <Link
                to="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#003366] px-4 py-3 font-semibold text-white transition hover:bg-[#002855]"
              >
                <User size={18} />
                Login
              </Link>

            </div>

          </nav>

        </div>

      )}

    </header>
  );
}
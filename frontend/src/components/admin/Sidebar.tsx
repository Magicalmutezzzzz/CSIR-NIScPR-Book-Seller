import {
  LayoutDashboard,
  FolderTree,
  BookOpen,
  Library,
  Newspaper,
  FileText,
  ScrollText,
  Users,
  UserRound,
  ShoppingCart,
  Boxes,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Categories", icon: FolderTree, path: "/admin/categories" },
  { name: "Publications", icon: BookOpen, path: "/admin/publications" },
  { name: "Books", icon: BookOpen, path: "/admin/books" },
  { name: "Journals", icon: Library, path: "/admin/journals" },
  { name: "Magazines", icon: Newspaper, path: "/admin/magazines" },
  { name: "Research Articles", icon: FileText, path: "/admin/research" },
  {
    name: "Other Publications",
    icon: ScrollText,
    path: "/admin/other-publications",
  },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Customers", icon: UserRound, path: "/admin/customers" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Inventory", icon: Boxes, path: "/admin/inventory" },
  { name: "Reports", icon: BarChart3, path: "/admin/reports" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img
          src="/DefaultHeaderLogo.jpg"
          alt="CSIR-NIScPR"
          className="h-12 mx-auto object-contain"
        />

        <h2 className="mt-4 text-center text-xl font-bold text-[#003366]">
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#003366] text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-[#003366]"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button onClick={() => { logout(); navigate("/", { replace: true }); }} className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

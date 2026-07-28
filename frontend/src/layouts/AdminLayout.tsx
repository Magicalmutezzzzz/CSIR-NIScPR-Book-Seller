import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
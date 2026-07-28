import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/Navbar";
import Footer from "../components/customer/Footer";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
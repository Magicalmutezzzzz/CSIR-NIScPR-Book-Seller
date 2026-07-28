import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-[#003366]">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Welcome to the CSIR-NIScPR Admin Portal
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-xl px-4 py-2 w-72">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-full outline-none text-sm"
          />
        </div>

        {/* Notification */}
        <button className="relative p-3 rounded-xl hover:bg-gray-100 transition">
          <Bell size={22} className="text-gray-600" />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Admin */}
        <div className="flex items-center gap-3">

          <UserCircle2
            size={42}
            className="text-[#003366]"
          />

          <div className="hidden md:block">
            <p className="font-semibold text-gray-800">
              Administrator
            </p>

            <p className="text-sm text-gray-500">
              admin@csir.res.in
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}
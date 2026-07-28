import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

        <div className="text-center mb-8">
          <img
            src="/DefaultHeader.png"
            alt="CSIR NIScPR"
            className="h-16 mx-auto mb-5"
          />

          <h1 className="text-3xl font-bold text-[#003366]">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to access the Admin Dashboard
          </p>
        </div>

        <form className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#003366]">
              <Mail className="text-gray-400 mr-3" size={20} />
              <input
                type="email"
                placeholder="admin@csir.res.in"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#003366]">
              <Lock className="text-gray-400 mr-3" size={20} />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#003366] hover:bg-blue-900 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-[#003366] hover:underline text-sm font-medium"
          >
            ← Back to Website
          </Link>
        </div>

      </div>
    </div>
  );
}
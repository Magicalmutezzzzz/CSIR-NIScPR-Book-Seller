import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-xl text-center">
        <div className="flex justify-center">
          <SearchX
            size={90}
            className="text-[#003366]"
          />
        </div>

        <h1 className="mt-6 text-7xl font-extrabold text-[#003366]">
          404
        </h1>

        <h2 className="mt-3 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600 leading-7">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#003366] px-6 py-3 font-semibold text-white transition hover:bg-[#002855]"
          >
            <Home size={20} />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
}
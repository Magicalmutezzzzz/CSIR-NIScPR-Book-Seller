import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex bg-[#003366] text-white items-center justify-center p-12">

        <div className="max-w-lg">

          <img
            src="/DefaultHeaderLogo.jpg"
            alt="CSIR-NIScPR"
            className="h-35 mb-10"
          />

          <h1 className="text-5xl font-bold leading-tight">
            CSIR-NIScPR
          </h1>

          <h2 className="mt-4 text-2xl font-semibold">
            Online Publications Portal
          </h2>

          <p className="mt-8 text-lg leading-8 text-blue-100">
            Discover books, journals, magazines and research publications from
            the Council of Scientific & Industrial Research.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center bg-gray-100 p-8">

        <Outlet />

      </div>

    </div>
  );
}
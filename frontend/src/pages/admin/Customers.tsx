export default function Customers() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#003366]">
        Customers
      </h1>

      <div className="mt-6 rounded-xl border bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">
          Customer Module
        </h2>

        <p className="mt-3 text-gray-500">
          This page will display customers fetched
          from the backend.
        </p>
      </div>
    </div>
  );
}
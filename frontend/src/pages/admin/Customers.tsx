import { useMemo, useState } from "react";
import {
  Search,
  UserRound,
  Eye,
  Pencil,
  Trash2,
  Ban,
  UserCheck,
  IndianRupee,
  ShoppingCart,
} from "lucide-react";

interface Customer {
  id: number;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joined: string;
  lastOrder: string;
  status: "Active" | "Blocked";
  avatar: string;
}

const demoCustomers: Customer[] = [
  {
    id: 1,
    customerId: "CUS1001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    orders: 12,
    totalSpent: 18540,
    joined: "12 Jan 2026",
    lastOrder: "25 Jul 2026",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    customerId: "CUS1002",
    name: "Priya Singh",
    email: "priya@gmail.com",
    phone: "9876501234",
    orders: 5,
    totalSpent: 6540,
    joined: "20 Feb 2026",
    lastOrder: "18 Jul 2026",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    customerId: "CUS1003",
    name: "Amit Verma",
    email: "amit@gmail.com",
    phone: "9811122233",
    orders: 2,
    totalSpent: 1998,
    joined: "05 Apr 2026",
    lastOrder: "10 Jun 2026",
    status: "Blocked",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 4,
    customerId: "CUS1004",
    name: "Sneha Kapoor",
    email: "sneha@gmail.com",
    phone: "9898989898",
    orders: 18,
    totalSpent: 31250,
    joined: "08 Jan 2026",
    lastOrder: "Today",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
];

export default function Customers() {
  const [customers] = useState<Customer[]>(demoCustomers);

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.customerId.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search)
    );
  }, [customers, search]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (c) => c.status === "Active"
  ).length;

  const blockedCustomers = customers.filter(
    (c) => c.status === "Blocked"
  ).length;

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#003366]">
            Customer Management
          </h1>

          <p className="mt-2 text-gray-500">
            View, manage and monitor all registered customers and their purchase activity.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-3 text-white transition hover:bg-[#002855]">

          <UserRound size={18} />

          Customer Insights

        </button>

      </div>
          {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {/* Total Customers */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Customers
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#003366]">
                {totalCustomers}
              </h2>

            </div>

            <div className="rounded-2xl bg-blue-100 p-4">

              <UserRound
                size={28}
                className="text-[#003366]"
              />

            </div>

          </div>

        </div>

        {/* Active Customers */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Active Customers
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeCustomers}
              </h2>

            </div>

            <div className="rounded-2xl bg-green-100 p-4">

              <UserCheck
                size={28}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        {/* Blocked Customers */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Blocked Customers
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {blockedCustomers}
              </h2>

            </div>

            <div className="rounded-2xl bg-red-100 p-4">

              <Ban
                size={28}
                className="text-red-600"
              />

            </div>

          </div>

        </div>

        {/* Total Revenue */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Customer Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h2>

            </div>

            <div className="rounded-2xl bg-purple-100 p-4">

              <IndianRupee
                size={28}
                className="text-purple-600"
              />

            </div>

          </div>

        </div>

        {/* Total Orders */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="mt-2 text-3xl font-bold text-orange-600">
                {customers.reduce((sum, customer) => sum + customer.orders, 0)}
              </h2>

            </div>

            <div className="rounded-2xl bg-orange-100 p-4">

              <ShoppingCart
                size={28}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

        {/* Average Spend */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Average Spend
              </p>

              <h2 className="mt-2 text-3xl font-bold text-cyan-600">
                ₹
                {Math.round(
                  totalRevenue / totalCustomers
                ).toLocaleString("en-IN")}
              </h2>

            </div>

            <div className="rounded-2xl bg-cyan-100 p-4">

              <IndianRupee
                size={28}
                className="text-cyan-600"
              />

            </div>

          </div>

        </div>

      </div>
          {/* Search & Filters */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-4">

          {/* Search */}

          <div className="relative lg:col-span-2">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by customer name, email, phone or Customer ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-[#003366]"
            />

          </div>

          {/* Status */}

          <select className="rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]">

            <option>All Customers</option>
            <option>Active</option>
            <option>Blocked</option>

          </select>

          {/* Sort */}

          <select className="rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]">

            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Highest Spending</option>
            <option>Most Orders</option>

          </select>

        </div>

      </div>

      {/* Customers Table */}

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-sm font-semibold text-[#003366]">

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Contact
                </th>

                <th className="px-6 py-4">
                  Orders
                </th>

                <th className="px-6 py-4">
                  Total Spent
                </th>

                <th className="px-6 py-4">
                  Last Order
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y">
                              {filteredCustomers.map((customer) => (

                <tr
                  key={customer.id}
                  className="transition hover:bg-gray-50"
                >

                  {/* Customer */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="h-12 w-12 rounded-full border object-cover"
                      />

                      <div>

                        <h3 className="font-semibold text-[#003366]">
                          {customer.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {customer.customerId}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}

                  <td className="px-6 py-5">

                    <p className="font-medium">
                      {customer.email}
                    </p>

                    <p className="text-sm text-gray-500">
                      {customer.phone}
                    </p>

                  </td>

                  {/* Orders */}

                  <td className="px-6 py-5">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {customer.orders} Orders
                    </span>

                  </td>

                  {/* Total Spent */}

                  <td className="px-6 py-5">

                    <span className="font-semibold text-green-700">
                      ₹{customer.totalSpent.toLocaleString("en-IN")}
                    </span>

                  </td>

                  {/* Last Order */}

                  <td className="px-6 py-5">

                    <p className="font-medium">
                      {customer.lastOrder}
                    </p>

                    <p className="text-sm text-gray-500">
                      Joined {customer.joined}
                    </p>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <button
                        className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        title="View Customer"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="rounded-xl bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"
                        title="Edit Customer"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="rounded-xl bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-100"
                        title="Block Customer"
                      >
                        <Ban size={18} />
                      </button>

                      <button
                        className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        title="Delete Customer"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
          {/* Pagination */}

      <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-gray-500">
          Showing
          <span className="mx-1 font-semibold text-[#003366]">
            {filteredCustomers.length}
          </span>
          of
          <span className="mx-1 font-semibold text-[#003366]">
            {customers.length}
          </span>
          customers
        </p>

        <div className="flex items-center gap-2">

          <button className="rounded-xl border px-4 py-2 transition hover:bg-gray-50">
            Previous
          </button>

          <button className="rounded-xl bg-[#003366] px-4 py-2 text-white">
            1
          </button>

          <button className="rounded-xl border px-4 py-2 transition hover:bg-gray-50">
            Next
          </button>

        </div>

      </div>

      {/* Customer Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        {/* Total Customers */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <UserRound
              size={28}
              className="text-[#003366]"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Registered Customers
              </h3>

              <p className="mt-1 text-2xl font-bold">
                {totalCustomers}
              </p>

            </div>

          </div>

        </div>

        {/* Revenue */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <IndianRupee
              size={28}
              className="text-green-600"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Customer Revenue
              </h3>

              <p className="mt-1 text-2xl font-bold text-green-600">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </div>

        {/* Orders */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <ShoppingCart
              size={28}
              className="text-orange-600"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Total Orders
              </h3>

              <p className="mt-1 text-2xl font-bold text-orange-600">
                {customers.reduce(
                  (sum, customer) => sum + customer.orders,
                  0
                )}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Empty State */}

      {filteredCustomers.length === 0 && (

        <div className="rounded-3xl border border-dashed bg-white py-16 text-center shadow-sm">

          <UserRound
            size={56}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-5 text-2xl font-semibold text-[#003366]">
            No Customers Found
          </h3>

          <p className="mt-2 text-gray-500">
            No registered customers match your current search.
          </p>

        </div>

      )}
          {/* Customer Overview */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-xl font-semibold text-[#003366]">
              Customer Overview
            </h3>

            <p className="mt-2 text-gray-500">
              Monitor registered customers, purchase activity and account
              status from a single dashboard.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#003366]">
              Total Customers : {totalCustomers}
            </span>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Active : {activeCustomers}
            </span>

            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              Blocked : {blockedCustomers}
            </span>

            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              Revenue : ₹{totalRevenue.toLocaleString("en-IN")}
            </span>

          </div>

        </div>

      </div>

      {/* Quick Insights */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <h4 className="font-semibold text-[#003366]">
            Top Customer
          </h4>

          <p className="mt-3 text-lg font-bold">
            Sneha Kapoor
          </p>

          <p className="text-sm text-gray-500">
            Highest purchase value
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <h4 className="font-semibold text-[#003366]">
            Highest Orders
          </h4>

          <p className="mt-3 text-lg font-bold">
            18 Orders
          </p>

          <p className="text-sm text-gray-500">
            Most active customer
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <h4 className="font-semibold text-[#003366]">
            Average Revenue
          </h4>

          <p className="mt-3 text-lg font-bold">
            ₹
            {Math.round(
              totalRevenue / totalCustomers
            ).toLocaleString("en-IN")}
          </p>

          <p className="text-sm text-gray-500">
            Per registered customer
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <h4 className="font-semibold text-[#003366]">
            Customer Health
          </h4>

          <p className="mt-3 text-lg font-bold text-green-600">
            Excellent
          </p>

          <p className="text-sm text-gray-500">
            Most customers are active
          </p>

        </div>

      </div>
          {/* Upcoming Customer Features */}

      <div className="rounded-3xl border border-dashed bg-gray-50 p-6">

        <h3 className="text-lg font-semibold text-[#003366]">
          Upcoming Customer Features
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          These modules will become available after backend integration.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <h4 className="font-semibold text-[#003366]">
              📍 Address Management
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              View billing and shipping addresses, default address and delivery
              history for every customer.
            </p>

          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <h4 className="font-semibold text-[#003366]">
              📦 Order History
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Complete purchase history with invoices, shipment tracking and
              order status timeline.
            </p>

          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <h4 className="font-semibold text-[#003366]">
              💳 Payment Methods
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Saved payment methods, successful transactions and refund
              information.
            </p>

          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <h4 className="font-semibold text-[#003366]">
              ❤️ Wishlist
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Publications saved by customers for future purchase and research.
            </p>

          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <h4 className="font-semibold text-[#003366]">
              ⭐ Reviews & Ratings
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Customer reviews, ratings and feedback for books, journals and
              magazines.
            </p>

          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <h4 className="font-semibold text-[#003366]">
              🎁 Loyalty Program
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Reward points, membership tiers, coupons and promotional offers
              for returning customers.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
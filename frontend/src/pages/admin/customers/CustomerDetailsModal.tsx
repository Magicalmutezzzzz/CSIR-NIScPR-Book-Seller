import {
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  BadgeIndianRupee,
  ShoppingCart,
  Clock,
  Shield,
  CreditCard,
} from "lucide-react";

import type { Customer } from "./customerData";

interface CustomerDetailsModalProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}

export default function CustomerDetailsModal({
  open,
  customer,
  onClose,
}: CustomerDetailsModalProps) {
  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>
            <h2 className="text-3xl font-bold text-[#003366]">
              Customer Details
            </h2>

            <p className="mt-1 text-gray-500">
              Complete customer profile and account information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        <div className="space-y-8 p-8">

          {/* Profile & Overview */}

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left Profile */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <div className="flex flex-col items-center text-center">

                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="h-32 w-32 rounded-full border-4 border-blue-100 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x200";
                  }}
                />

                <h3 className="mt-5 text-2xl font-bold text-[#003366]">
                  {customer.name}
                </h3>

                <p className="mt-1 text-gray-500">
                  {customer.customerId}
                </p>

                <span
                  className={`mt-5 rounded-full px-5 py-2 text-sm font-semibold ${
                    customer.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : customer.status === "Inactive"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {customer.status}
                </span>

              </div>

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[#003366]" />
                  <span className="text-gray-700">
                    {customer.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-[#003366]" />
                  <span className="text-gray-700">
                    {customer.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 size={20} className="text-[#003366]" />
                  <span className="text-gray-700">
                    {customer.institution}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-[#003366]" />
                  <span className="text-gray-700">
                    {customer.type}
                  </span>
                </div>

              </div>

            </div>

            {/* Right Overview */}

            <div className="lg:col-span-2">

              <div className="grid gap-6 md:grid-cols-2">
                                <div className="rounded-3xl border bg-blue-50 p-6">

                  <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-blue-100 p-4">
                      <ShoppingCart
                        size={28}
                        className="text-[#003366]"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Total Orders
                      </p>

                      <h3 className="text-3xl font-bold text-[#003366]">
                        {customer.orders}
                      </h3>
                    </div>

                  </div>

                </div>

                <div className="rounded-3xl border bg-green-50 p-6">

                  <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-green-100 p-4">
                      <BadgeIndianRupee
                        size={28}
                        className="text-green-700"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Total Spent
                      </p>

                      <h3 className="text-3xl font-bold text-green-700">
                        ₹{customer.totalSpent.toLocaleString("en-IN")}
                      </h3>
                    </div>

                  </div>

                </div>

                <div className="rounded-3xl border bg-purple-50 p-6">

                  <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-purple-100 p-4">
                      <Calendar
                        size={28}
                        className="text-purple-700"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Joined On
                      </p>

                      <h3 className="text-xl font-bold text-purple-700">
                        {customer.joined}
                      </h3>
                    </div>

                  </div>

                </div>

                <div className="rounded-3xl border bg-orange-50 p-6">

                  <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-orange-100 p-4">
                      <Clock
                        size={28}
                        className="text-orange-700"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Last Order
                      </p>

                      <h3 className="text-xl font-bold text-orange-700">
                        {customer.lastOrder}
                      </h3>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Contact & Account Information */}

          <div className="grid gap-8 lg:grid-cols-2">
                        {/* Contact Information */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <h3 className="mb-6 text-2xl font-bold text-[#003366]">
                Contact Information
              </h3>

              <div className="space-y-6">

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">
                    <Mail
                      size={22}
                      className="text-[#003366]"
                    />
                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Email Address
                    </p>

                    <p className="font-semibold text-gray-800">
                      {customer.email}
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-green-100 p-3">
                    <Phone
                      size={22}
                      className="text-green-700"
                    />
                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Mobile Number
                    </p>

                    <p className="font-semibold text-gray-800">
                      {customer.phone}
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-purple-100 p-3">
                    <Building2
                      size={22}
                      className="text-purple-700"
                    />
                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Institution
                    </p>

                    <p className="font-semibold text-gray-800">
                      {customer.institution}
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-orange-100 p-3">
                    <MapPin
                      size={22}
                      className="text-orange-700"
                    />
                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      State
                    </p>

                    <p className="font-semibold text-gray-800">
                      {customer.state}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Account Information */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <h3 className="mb-6 text-2xl font-bold text-[#003366]">
                Account Information
              </h3>

              <div className="space-y-5">

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Customer ID
                  </span>

                  <span className="font-semibold text-gray-800">
                    {customer.customerId}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Customer Type
                  </span>

                  <span className="font-semibold text-gray-800">
                    {customer.type}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Account Status
                  </span>

                  <span className="font-semibold text-gray-800">
                    {customer.status}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Registration Date
                  </span>

                  <span className="font-semibold text-gray-800">
                    {customer.joined}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Last Purchase
                  </span>

                  <span className="font-semibold text-gray-800">
                    {customer.lastOrder}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    Lifetime Value
                  </span>

                  <span className="text-xl font-bold text-green-700">
                    ₹{customer.totalSpent.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Recent Orders & Payment Summary */}

          <div className="grid gap-8 lg:grid-cols-2">
                        {/* Recent Orders */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <h3 className="mb-6 text-2xl font-bold text-[#003366]">
                Recent Orders
              </h3>

              <div className="space-y-4">

                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border p-4"
                  >

                    <div>

                      <h4 className="font-semibold text-gray-800">
                        ORD-2026-10{item}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Scientific Publications Bundle
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-[#003366]">
                        ₹{(3500 * item).toLocaleString("en-IN")}
                      </p>

                      <p className="text-sm text-green-600">
                        Delivered
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Payment Summary */}

            <div className="rounded-3xl border bg-white p-8 shadow-sm">

              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#003366]">

                <CreditCard
                  size={28}
                />

                Payment Summary

              </h3>

              <div className="space-y-5">

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Total Payments
                  </span>

                  <span className="font-semibold">
                    ₹{customer.totalSpent.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Outstanding Amount
                  </span>

                  <span className="font-semibold text-green-600">
                    ₹0
                  </span>

                </div>

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">
                    Preferred Payment
                  </span>

                  <span className="font-semibold">
                    Online Payment
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Last Payment
                  </span>

                  <span className="font-semibold">
                    {customer.lastOrder}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Customer Statistics */}

          <div>

            <h3 className="mb-6 text-2xl font-bold text-[#003366]">
              Customer Statistics
            </h3>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-3xl border bg-blue-50 p-6">

                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#003366]">
                  {customer.orders}
                </h2>

              </div>

              <div className="rounded-3xl border bg-green-50 p-6">

                <p className="text-sm text-gray-500">
                  Lifetime Value
                </p>

                <h2 className="mt-2 text-3xl font-bold text-green-700">
                  ₹{customer.totalSpent.toLocaleString("en-IN")}
                </h2>

              </div>

              <div className="rounded-3xl border bg-purple-50 p-6">

                <p className="text-sm text-gray-500">
                  Customer Since
                </p>

                <h2 className="mt-2 text-xl font-bold text-purple-700">
                  {customer.joined}
                </h2>

              </div>

              <div className="rounded-3xl border bg-orange-50 p-6">

                <p className="text-sm text-gray-500">
                  Current Status
                </p>

                <h2 className="mt-2 text-xl font-bold text-orange-700">
                  {customer.status}
                </h2>

              </div>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="rounded-3xl border bg-gray-50 p-8">

            <h3 className="mb-6 text-2xl font-bold text-[#003366]">
              Quick Actions
            </h3>

            <div className="flex flex-wrap gap-4">

              <button className="rounded-xl bg-[#003366] px-6 py-3 font-medium text-white transition hover:bg-[#002855]">
                Edit Customer
              </button>

              <button className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700">
                View Orders
              </button>

              <button className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700">
                Download Report
              </button>

              <button className="rounded-xl bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700">
                Print Profile
              </button>

            </div>

          </div>
                  </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex justify-end border-t bg-white px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
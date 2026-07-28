import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { Customer } from "./customerData";

interface EditCustomerModalProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}

export default function EditCustomerModal({
  open,
  customer,
  onClose,
  onSave,
}: EditCustomerModalProps) {
  const [formData, setFormData] = useState<Customer | null>(null);

useEffect(() => {
  if (customer) {
    setFormData(customer);
  }
}, [customer]);

  if (!open || !formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "orders" || name === "totalSpent"
                ? Number(value)
                : value,
          }
        : prev
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#003366]">
              Edit Customer
            </h2>

            <p className="mt-1 text-gray-500">
              Update customer information
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >

          <div className="grid gap-6 md:grid-cols-2">
                        {/* Customer Name */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Customer Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
                required
              />

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
                required
              />

            </div>

            {/* Phone */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
                required
              />

            </div>

            {/* Institution */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Institution
              </label>

              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
              />

            </div>
                    {/* State */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
                required
              />

            </div>

            {/* Customer Type */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Customer Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
              >
                <option value="Institution">
                  Institution
                </option>

                <option value="Individual">
                  Individual
                </option>

              </select>

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

                <option value="Blocked">
                  Blocked
                </option>

              </select>

            </div>

            {/* Orders */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Total Orders
              </label>

              <input
                type="number"
                name="orders"
                value={formData.orders}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
                min={0}
              />

            </div>

            {/* Total Spent */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Total Spent (₹)
              </label>

              <input
                type="number"
                name="totalSpent"
                value={formData.totalSpent}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
                min={0}
              />

            </div>
                    {/* Customer ID */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Customer ID
              </label>

              <input
                type="text"
                value={formData.customerId}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border bg-gray-100 px-4 py-3 text-gray-500"
              />

            </div>

            {/* Joined Date */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Joined Date
              </label>

              <input
                type="text"
                value={formData.joined}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border bg-gray-100 px-4 py-3 text-gray-500"
              />

            </div>

            {/* Last Order */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Last Order
              </label>

              <input
                type="text"
                value={formData.lastOrder}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border bg-gray-100 px-4 py-3 text-gray-500"
              />

            </div>

            {/* Avatar URL */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Avatar URL
              </label>

              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
              />

            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex justify-end gap-4 border-t pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#003366] px-6 py-3 font-medium text-white transition hover:bg-[#002855]"
            >
              Save Changes
            </button>

          </div>
                </form>

      </div>

    </div>
  );
}
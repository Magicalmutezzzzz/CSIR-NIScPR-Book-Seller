import { AlertTriangle, Trash2, X } from "lucide-react";
import type { Customer } from "./customerData";

interface DeleteCustomerModalProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function DeleteCustomerModal({
  open,
  customer,
  onClose,
  onDelete,
}: DeleteCustomerModalProps) {
  if (!open || !customer) return null;

  const handleDelete = () => {
    onDelete(customer.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-red-700">
                Delete Customer
              </h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <div className="flex items-center gap-4">

            <img
              src={customer.avatar}
              alt={customer.name}
              className="h-20 w-20 rounded-full border object-cover"
            />

            <div>

              <h3 className="text-xl font-semibold text-[#003366]">
                {customer.name}
              </h3>

              <p className="text-gray-500">
                {customer.customerId}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {customer.email}
              </p>

            </div>

          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

            <p className="text-sm leading-6 text-red-700">
              You are about to permanently delete this customer record.
              All associated information will be removed from the system.
            </p>

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
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
            >
              <Trash2 size={18} />
              Delete Customer
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

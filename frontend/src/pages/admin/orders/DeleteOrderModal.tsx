import { Trash2, X } from "lucide-react";

interface Order {
  id: number;
  orderId: string;
  invoiceNo: string;

  customer: string;
  email: string;
  phone: string;

  publications: number;
  quantity: number;

  total: number;

  paymentMethod:
    | "Razorpay"
    | "UPI"
    | "Card"
    | "Net Banking"
    | "COD";

  paymentStatus:
    | "Paid"
    | "Pending"
    | "Failed"
    | "Refunded";

  orderStatus:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";

  courier: string;
  tracking: string;

  orderDate: string;
  deliveryDate: string;
}

interface DeleteOrderModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onDelete: (order: Order) => void;
}

export default function DeleteOrderModal({
  open,
  order,
  onClose,
  onDelete,
}: DeleteOrderModalProps) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-red-100 p-3">

              <Trash2
                size={28}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-[#003366]">
                Delete Order
              </h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        <div className="rounded-2xl border bg-gray-50 p-5">

          <p className="text-gray-600">
            Are you sure you want to delete this order?
          </p>

          <div className="mt-5 space-y-2">

            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>

            <p>
              <strong>Invoice:</strong> {order.invoiceNo}
            </p>

            <p>
              <strong>Customer:</strong> {order.customer}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {order.total.toLocaleString()}
            </p>

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(order)}
            className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            Delete Order
          </button>

        </div>

      </div>

    </div>
  );
}
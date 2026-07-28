import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Save } from "lucide-react";

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

interface EditOrderModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSave: (order: Order) => void;
}

export default function EditOrderModal({
  open,
  order,
  onClose,
  onSave,
}: EditOrderModalProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Order>();

  useEffect(() => {
    if (order) {
      reset(order);
    }
  }, [order, reset]);

  if (!open || !order) return null;

  const submit = (data: Order) => {
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#003366]">
              Edit Order
            </h2>

            <p className="mt-2 text-gray-500">
              Update order information
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
          onSubmit={handleSubmit(submit)}
          className="space-y-8 p-8"
        >
                  {/* Customer Information */}

          <div className="rounded-3xl border bg-white p-6">

            <h3 className="mb-6 text-xl font-bold text-[#003366]">
              Customer Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Customer Name
                </label>

                <input
                  {...register("customer")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>

                <input
                  {...register("phone")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Delivery Date
                </label>

                <input
                  type="date"
                  {...register("deliveryDate")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                />

              </div>

            </div>

          </div>

          {/* Order Information */}

          <div className="rounded-3xl border bg-white p-6">

            <h3 className="mb-6 text-xl font-bold text-[#003366]">
              Order Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Order Status
                </label>

                <select
                  {...register("orderStatus")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Payment Status
                </label>

                <select
                  {...register("paymentStatus")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                >
                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Failed">
                    Failed
                  </option>

                  <option value="Refunded">
                    Refunded
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Payment Method
                </label>

                <select
                  {...register("paymentMethod")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                >
                  <option value="Razorpay">
                    Razorpay
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Card">
                    Card
                  </option>

                  <option value="Net Banking">
                    Net Banking
                  </option>

                  <option value="COD">
                    Cash on Delivery
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Total Amount
                </label>

                <input
                  type="number"
                  {...register("total", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3 outline-none"
                  readOnly
                />

              </div>

            </div>

          </div>

                    {/* Shipping & Tracking */}

          <div className="rounded-3xl border bg-white p-6">

            <h3 className="mb-6 text-xl font-bold text-[#003366]">
              Shipping Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Courier Partner
                </label>

                <input
                  {...register("courier")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                  placeholder="Blue Dart, DTDC, India Post..."
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Tracking Number
                </label>

                <input
                  {...register("tracking")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
                  placeholder="Enter Tracking Number"
                />

              </div>

            </div>

          </div>

          {/* Order Summary */}

          <div className="rounded-3xl border bg-gray-50 p-6">

            <h3 className="mb-6 text-xl font-bold text-[#003366]">
              Order Summary
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Order ID
                </label>

                <input
                  value={order.orderId}
                  readOnly
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Invoice Number
                </label>

                <input
                  value={order.invoiceNo}
                  readOnly
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Order Date
                </label>

                <input
                  value={order.orderDate}
                  readOnly
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Publications
                </label>

                <input
                  value={order.publications}
                  readOnly
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Quantity
                </label>

                <input
                  value={order.quantity}
                  readOnly
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Total Amount
                </label>

                <input
                  value={`₹${order.total.toLocaleString()}`}
                  readOnly
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3 font-semibold text-[#003366]"
                />

              </div>

            </div>

          </div>

                    {/* Action Buttons */}

          <div className="flex flex-col-reverse gap-4 border-t pt-8 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#003366] px-6 py-3 font-medium text-white transition hover:bg-[#002855]"
            >
              <Save size={18} />
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
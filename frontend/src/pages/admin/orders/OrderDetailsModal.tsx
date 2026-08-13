import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Truck,
  Package,
  Download,
  Printer,
  IndianRupee,
} from "lucide-react";

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

interface OrderDetailsModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsModal({
  open,
  order,
  onClose,
}: OrderDetailsModalProps) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#003366]">
              Order Details
            </h2>

            <p className="mt-2 text-gray-500">
              Complete order information
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        <div className="space-y-8 p-8">

          {/* Top Summary */}

          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl border bg-blue-50 p-5">

              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#003366]">
                {order.orderId}
              </h3>

            </div>

            <div className="rounded-2xl border bg-green-50 p-5">

              <p className="text-sm text-gray-500">
                Invoice
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {order.invoiceNo}
              </h3>

            </div>

            <div className="rounded-2xl border bg-purple-50 p-5">

              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <h3 className="mt-2 text-xl font-bold text-purple-600">
                {order.total.toLocaleString()}
              </h3>

            </div>

            <div className="rounded-2xl border bg-orange-50 p-5">

              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {order.paymentMethod}
              </h3>

            </div>

          </div>
                  {/* Customer & Address Information */}

          <div className="grid gap-8 lg:grid-cols-2">

            {/* Customer Details */}

            <div className="rounded-3xl border bg-white p-6">

              <h3 className="mb-6 text-xl font-bold text-[#003366]">
                Customer Information
              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

                    <User
                      size={26}
                      className="text-[#003366]"
                    />

                  </div>

                  <div>

                    <h4 className="text-lg font-semibold">
                      {order.customer}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Institutional Customer
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Mail
                    size={18}
                    className="text-[#003366]"
                  />

                  <span>{order.email}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-[#003366]"
                  />

                  <span>{order.phone}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Building2
                    size={18}
                    className="text-[#003366]"
                  />

                  <span>
                    CSIR / Government Institution
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Package
                    size={18}
                    className="text-[#003366]"
                  />

                  <span>
                    {order.publications} Publications
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <IndianRupee
                    size={18}
                    className="text-[#003366]"
                  />

                  <span>
                    Total Purchase :
                    <strong>
                      {" "}
                      {order.total.toLocaleString()}
                    </strong>
                  </span>

                </div>

              </div>

            </div>

            {/* Address Details */}

            <div className="rounded-3xl border bg-white p-6">

              <h3 className="mb-6 text-xl font-bold text-[#003366]">
                Billing & Shipping Address
              </h3>

              <div className="space-y-6">

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <MapPin
                      size={18}
                      className="text-red-500"
                    />

                    <h4 className="font-semibold">
                      Billing Address
                    </h4>

                  </div>

                  <p className="ml-7 text-gray-600">
                    Department of Biotechnology
                    <br />
                    Institutional Campus
                    <br />
                    New Delhi – 110067
                    <br />
                    India
                  </p>

                </div>

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <Truck
                      size={18}
                      className="text-green-600"
                    />

                    <h4 className="font-semibold">
                      Shipping Address
                    </h4>

                  </div>

                  <p className="ml-7 text-gray-600">
                    Same as Billing Address
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Order Information */}

          <div className="rounded-3xl border bg-white p-6">

            <h3 className="mb-6 text-xl font-bold text-[#003366]">
              Order Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              <div>

                <p className="text-sm text-gray-500">
                  Order Date
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <Calendar
                    size={18}
                    className="text-[#003366]"
                  />

                  <span>{order.orderDate}</span>

                </div>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Delivery Date
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <Truck
                    size={18}
                    className="text-green-600"
                  />

                  <span>{order.deliveryDate}</span>

                </div>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Courier Partner
                </p>

                <p className="mt-2 font-semibold">
                  {order.courier}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Tracking Number
                </p>

                <p className="mt-2 font-semibold">
                  {order.tracking}
                </p>

              </div>

            </div>

          </div>

                  {/* Ordered Publications */}

          <div className="rounded-3xl border bg-white p-6">

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold text-[#003366]">
                Ordered Publications
              </h3>

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#003366]">
                {order.quantity} Items
              </span>

            </div>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="border-b bg-gray-50">

                  <tr>

                    <th className="px-4 py-3 text-left">
                      Publication
                    </th>

                    <th className="px-4 py-3 text-left">
                      Type
                    </th>

                    <th className="px-4 py-3 text-center">
                      Qty
                    </th>

                    <th className="px-4 py-3 text-right">
                      Unit Price
                    </th>

                    <th className="px-4 py-3 text-right">
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {[
                    {
                      title: "Artificial Intelligence in Healthcare",
                      type: "Book",
                      qty: 2,
                      price: 950,
                    },
                    {
                      title: "Nature Biotechnology",
                      type: "Journal",
                      qty: 1,
                      price: 650,
                    },
                    {
                      title: "Science Today",
                      type: "Magazine",
                      qty: 3,
                      price: 250,
                    },
                  ].map((item, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-4">

                          <img
                            src="https://placehold.co/60x80"
                            alt={item.title}
                            className="h-16 w-12 rounded object-cover"
                          />

                          <div>

                            <h4 className="font-semibold">
                              {item.title}
                            </h4>

                            <p className="text-sm text-gray-500">
                              CSIR-NIScPR Publication
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-4 py-4">
                        {item.type}
                      </td>

                      <td className="px-4 py-4 text-center">
                        {item.qty}
                      </td>

                      <td className="px-4 py-4 text-right">
                        {item.price.toLocaleString()}
                      </td>

                      <td className="px-4 py-4 text-right font-semibold text-[#003366]">
                        ₹
                        {(item.qty * item.price).toLocaleString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Payment Details */}

          <div className="grid gap-8 lg:grid-cols-2">

            <div className="rounded-3xl border bg-white p-6">

              <h3 className="mb-6 text-xl font-bold text-[#003366]">
                Payment Information
              </h3>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Payment Method
                  </span>

                  <span className="font-semibold">
                    {order.paymentMethod}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Payment Status
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {order.paymentStatus}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Transaction ID
                  </span>

                  <span className="font-semibold">
                    TXN7845621987
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Razorpay Payment ID
                  </span>

                  <span className="font-semibold">
                    pay_Rzp45896231
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    GST
                  </span>

                  <span className="font-semibold">
                    ₹450
                  </span>

                </div>

                <div className="flex justify-between border-t pt-4">

                  <span className="font-semibold">
                    Grand Total
                  </span>

                  <span className="text-xl font-bold text-[#003366]">
                    {order.total.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

                    {/* Shipping Details */}

            <div className="rounded-3xl border bg-white p-6">

              <h3 className="mb-6 text-xl font-bold text-[#003366]">
                Shipping Details
              </h3>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Courier Partner
                  </span>

                  <span className="font-semibold">
                    {order.courier}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Tracking Number
                  </span>

                  <span className="font-semibold">
                    {order.tracking}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Shipping Status
                  </span>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    {order.orderStatus}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Estimated Delivery
                  </span>

                  <span className="font-semibold">
                    {order.deliveryDate}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Shipping Charges
                  </span>

                  <span className="font-semibold">
                    Free
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Order Timeline */}

          <div className="rounded-3xl border bg-white p-6">

            <h3 className="mb-8 text-xl font-bold text-[#003366]">
              Order Timeline
            </h3>

            <div className="space-y-8">

              {[
                {
                  title: "Order Placed",
                  date: order.orderDate,
                  completed: true,
                },
                {
                  title: "Payment Confirmed",
                  date: order.orderDate,
                  completed: true,
                },
                {
                  title: "Processing",
                  date: "Within 24 Hours",
                  completed: true,
                },
                {
                  title: "Shipped",
                  date:
                    order.orderStatus === "Pending"
                      ? "-"
                      : order.deliveryDate,
                  completed:
                    order.orderStatus === "Shipped" ||
                    order.orderStatus === "Delivered",
                },
                {
                  title: "Delivered",
                  date: order.deliveryDate,
                  completed:
                    order.orderStatus === "Delivered",
                },
              ].map((step, index) => (

                <div
                  key={index}
                  className="flex gap-5"
                >

                  <div
                    className={`mt-1 h-5 w-5 rounded-full ${
                      step.completed
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />

                  <div>

                    <h4 className="font-semibold">
                      {step.title}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {step.date}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex flex-col gap-4 border-t pt-8 md:flex-row md:justify-end">

            <button
              className="flex items-center justify-center gap-2 rounded-xl border px-6 py-3 transition hover:bg-gray-100"
            >

              <Printer size={18} />

              Print Invoice

            </button>

            <button
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
            >

              <Download size={18} />

              Download Invoice

            </button>

            <button
              onClick={onClose}
              className="rounded-xl bg-[#003366] px-8 py-3 font-medium text-white transition hover:bg-[#002855]"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

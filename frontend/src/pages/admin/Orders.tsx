import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  Package,
  Truck,
  CreditCard,
  IndianRupee,
  Calendar,
  Download,
  Plus,
} from "lucide-react";

import OrderDetailsModal from "./orders/OrderDetailsModal";
import EditOrderModal from "./orders/EditOrderModal";
import DeleteOrderModal from "./orders/DeleteOrderModal";
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

const demoOrders: Order[] = [
  {
    id: 1,
    orderId: "ORD-1001",
    invoiceNo: "INV-2026-001",
    customer: "IIT Delhi",
    email: "library@iitd.ac.in",
    phone: "9876543210",
    publications: 4,
    quantity: 8,
    total: 7850,
    paymentMethod: "Razorpay",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    courier: "Blue Dart",
    tracking: "BD458742698IN",
    orderDate: "21 Jul 2026",
    deliveryDate: "24 Jul 2026",
  },

  {
    id: 2,
    orderId: "ORD-1002",
    invoiceNo: "INV-2026-002",
    customer: "NII New Delhi",
    email: "purchase@nii.res.in",
    phone: "9811122233",
    publications: 3,
    quantity: 5,
    total: 4350,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    courier: "DTDC",
    tracking: "DT782311298",
    orderDate: "22 Jul 2026",
    deliveryDate: "27 Jul 2026",
  },
    {
    id: 3,
    orderId: "ORD-1003",
    invoiceNo: "INV-2026-003",
    customer: "AIIMS Delhi",
    email: "admin@aiims.edu",
    phone: "9990011223",
    publications: 2,
    quantity: 2,
    total: 1890,
    paymentMethod: "Card",
    paymentStatus: "Pending",
    orderStatus: "Processing",
    courier: "-",
    tracking: "-",
    orderDate: "23 Jul 2026",
    deliveryDate: "-",
  },

  {
    id: 4,
    orderId: "ORD-1004",
    invoiceNo: "INV-2026-004",
    customer: "CSIR Lab",
    email: "store@csir.res.in",
    phone: "9887766554",
    publications: 6,
    quantity: 12,
    total: 12500,
    paymentMethod: "Net Banking",
    paymentStatus: "Paid",
    orderStatus: "Pending",
    courier: "-",
    tracking: "-",
    orderDate: "24 Jul 2026",
    deliveryDate: "-",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);

  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.orderId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.invoiceNo
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [orders, search]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const handleSaveOrder = (updatedOrder: Order) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === updatedOrder.id
          ? updatedOrder
          : order
      )
    );
  };

  const handleDeleteOrder = (deletedOrder: Order) => {
    setOrders((prev) =>
      prev.filter(
        (order) => order.id !== deletedOrder.id
      )
    );
  };

  return (
    <div className="space-y-8">
            {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#003366]">
            Orders Management
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer orders, invoices, shipping and payments.
          </p>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-50 transition">

            <Download size={18} />

            Export Orders

          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-3 text-white hover:bg-[#002855] transition">

            <Plus size={18} />

            New Order

          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#003366]">
                {totalOrders}
              </h2>

            </div>

            <div className="rounded-2xl bg-blue-100 p-4">

              <Package
                size={28}
                className="text-[#003366]"
              />

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pending Orders
              </p>

              <h2 className="mt-2 text-3xl font-bold text-orange-600">
                {pendingOrders}
              </h2>

            </div>

            <div className="rounded-2xl bg-orange-100 p-4">

              <Truck
                size={28}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Delivered Orders
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {deliveredOrders}
              </h2>

            </div>

            <div className="rounded-2xl bg-green-100 p-4">

              <Package
                size={28}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                ₹{totalRevenue.toLocaleString()}
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

      </div>
            {/* Filters */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-5">

          <div className="relative lg:col-span-2">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search order, customer or invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-[#003366]"
            />

          </div>

          <select className="rounded-xl border px-4 py-3 outline-none focus:border-[#003366]">

            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>

          </select>

          <select className="rounded-xl border px-4 py-3 outline-none focus:border-[#003366]">

            <option>Payment Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Refunded</option>
            <option>Failed</option>

          </select>

          <button className="flex items-center justify-center gap-2 rounded-xl border transition hover:bg-gray-50">

            <Filter size={18} />

            More Filters

          </button>

        </div>

      </div>

      {/* Orders Table */}

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-sm font-semibold text-[#003366]">

                <th className="px-6 py-4">Order</th>

                <th className="px-6 py-4">Customer</th>

                <th className="px-6 py-4">Amount</th>

                <th className="px-6 py-4">Payment</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4">Shipping</th>

                <th className="px-6 py-4">Actions</th>

              </tr>

            </thead>

            <tbody className="divide-y">
                            {filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="transition hover:bg-gray-50"
                >

                  {/* Order */}

                  <td className="px-6 py-5">

                    <div>

                      <h3 className="font-semibold text-[#003366]">
                        {order.orderId}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {order.invoiceNo}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                        <Calendar size={14} />

                        {order.orderDate}

                      </div>

                    </div>

                  </td>

                  {/* Customer */}

                  <td className="px-6 py-5">

                    <h3 className="font-semibold">
                      {order.customer}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {order.email}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.phone}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {order.publications} Publications • {order.quantity} Items
                    </p>

                  </td>

                  {/* Amount */}

                  <td className="px-6 py-5">

                    <h3 className="text-lg font-bold text-[#003366]">
                      ₹{order.total.toLocaleString()}
                    </h3>

                  </td>

                  {/* Payment */}

                  <td className="px-6 py-5">

                    <p className="font-medium">
                      {order.paymentMethod}
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.paymentStatus === "Refunded"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Processing"
                          ? "bg-purple-100 text-purple-700"
                          : order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  {/* Shipping */}

                  <td className="px-6 py-5">

                    <p className="font-medium">
                      {order.courier}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.tracking}
                    </p>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setViewOpen(true);
                        }}
                        className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setEditOpen(true);
                        }}
                        className="rounded-xl bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setDeleteOpen(true);
                        }}
                        className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
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
            {filteredOrders.length}
          </span>
          of
          <span className="mx-1 font-semibold text-[#003366]">
            {orders.length}
          </span>
          orders
        </p>

        <div className="flex items-center gap-2">

          <button className="rounded-xl border px-4 py-2 hover:bg-gray-50">
            Previous
          </button>

          <button className="rounded-xl bg-[#003366] px-4 py-2 text-white">
            1
          </button>

          <button className="rounded-xl border px-4 py-2 hover:bg-gray-50">
            Next
          </button>

        </div>

      </div>

      {/* Quick Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <CreditCard
              size={28}
              className="text-green-600"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Paid Orders
              </h3>

              <p className="text-2xl font-bold text-green-600">
                {
                  orders.filter(
                    (o) => o.paymentStatus === "Paid"
                  ).length
                }
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Truck
              size={28}
              className="text-blue-600"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Shipped Orders
              </h3>

              <p className="text-2xl font-bold text-blue-600">
                {
                  orders.filter(
                    (o) => o.orderStatus === "Shipped"
                  ).length
                }
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <IndianRupee
              size={28}
              className="text-purple-600"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Average Order Value
              </h3>

              <p className="text-2xl font-bold text-purple-600">
                ₹
                {Math.round(
                  totalRevenue /
                  Math.max(totalOrders, 1)
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Modals */}

      <OrderDetailsModal
        open={viewOpen}
        order={selectedOrder}
        onClose={() => {
          setViewOpen(false);
          setSelectedOrder(null);
        }}
      />

      <EditOrderModal
        open={editOpen}
        order={selectedOrder}
        onClose={() => {
          setEditOpen(false);
          setSelectedOrder(null);
        }}
        onSave={(updatedOrder: Order) => {
          handleSaveOrder(updatedOrder);
          setEditOpen(false);
          setSelectedOrder(null);
        }}
      />

      <DeleteOrderModal
        open={deleteOpen}
        order={selectedOrder}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedOrder(null);
        }}
        onDelete={(deletedOrder: Order) => {
          handleDeleteOrder(deletedOrder);
          setDeleteOpen(false);
          setSelectedOrder(null);
        }}
      />

    </div>
  );
}
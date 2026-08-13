import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { orderService } from "../../services/orderService";
import type { Order } from "../../types/order";
import OrderDetailsModal from "../../components/admin/orders/OrderDetailsModal";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(orderService.getOrders());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");

  const refreshOrders = () => {
    setOrders(orderService.getOrders());
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = search.toLowerCase();

      return (
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query)
      );
    });
  }, [orders, search]);

  const requestOrders = orders.filter(
    (o) => o.status === "REQUEST_SENT"
  ).length;

  const invoiceOrders = orders.filter(
    (o) => o.status === "INVOICE_SENT"
  ).length;

  const paymentOrders = orders.filter(
    (o) => o.status === "PAYMENT_RECEIVED"
  ).length;

  const shippedOrders = orders.filter(
    (o) => o.status === "SHIPPED"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "DELIVERED"
  ).length;

  const badgeClass = (status: Order["status"]) => {
    switch (status) {
      case "REQUEST_SENT":
        return "bg-yellow-100 text-yellow-700";

      case "INVOICE_SENT":
        return "bg-blue-100 text-blue-700";

      case "PAYMENT_RECEIVED":
        return "bg-purple-100 text-purple-700";

      case "SHIPPED":
        return "bg-orange-100 text-orange-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <h1 className="mb-8 text-3xl font-bold text-[#003366]">
        Orders Management
      </h1>

      {/* Statistics */}

      <div className="mb-8 grid gap-5 md:grid-cols-5">

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-[#003366]">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-orange-50 p-6 shadow">
          <p className="text-gray-500">Shipped</p>

          <h2 className="mt-2 text-3xl font-bold text-orange-700">
            {shippedOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-6 shadow">
          <p className="text-gray-500">Request Sent</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-700">
            {requestOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-50 p-6 shadow">
          <p className="text-gray-500">Invoice Sent</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-700">
            {invoiceOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-purple-50 p-6 shadow">
          <p className="text-gray-500">Payment Received</p>
          <h2 className="mt-2 text-3xl font-bold text-purple-700">
            {paymentOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-50 p-6 shadow">
          <p className="text-gray-500">Delivered</p>
          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {deliveredOrders}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="mb-6 flex items-center rounded-2xl bg-white px-5 py-3 shadow">

        <Search className="mr-3 text-gray-500" size={20} />

        <input
          type="text"
          placeholder="Search by Order ID, Customer or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-none outline-none"
        />

      </div>

      {/* Orders Table */}

      <div className="overflow-x-auto rounded-2xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Order ID</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-center">Books</th>

              <th className="p-4 text-center">Books Total</th>

              <th className="p-4 text-center">Status</th>

              <th className="p-4 text-center">Date</th>

              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-12 text-center text-gray-500"
                >
                  No Orders Found
                </td>

              </tr>

            ) : (

              filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4 font-medium">
                    {order.id}
                  </td>

                  <td className="p-4">
                    <div className="font-semibold">
                      {order.customerName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {order.customerEmail}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    {order.items.length}
                  </td>

                  <td className="p-4 text-center font-semibold text-[#003366]">
                    {order.booksTotal}
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(
                        order.status
                      )}`}
                    >
                      {order.status.replaceAll("_", " ")}
                    </span>

                  </td>

                  <td className="p-4 text-center">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg bg-[#003366] px-5 py-2 text-white transition hover:bg-[#002855]"
                    >
                      Manage
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {selectedOrder && (

        <OrderDetailsModal
          order={selectedOrder}
          refresh={() => {
            refreshOrders();
            setSelectedOrder(
              orderService.getOrder(selectedOrder.id) ?? null
            );
          }}
          onClose={() => setSelectedOrder(null)}
        />

      )}

    </div>
  );
}
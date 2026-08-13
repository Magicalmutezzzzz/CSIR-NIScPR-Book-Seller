import { Link } from "react-router-dom";
import GlobalNavbar from "../../components/common/GlobalNavbar";
import { orderService } from "../../services/orderService";

export default function MyOrders() {
  const orders = orderService.getOrders();

  return (
    <>
      <GlobalNavbar />

      <div className="min-h-screen bg-slate-50">

        <div className="bg-[#003366] text-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h1 className="text-4xl font-bold">
              My Orders
            </h1>

            <p className="mt-2 text-blue-100">
              View and track all your publication orders.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">

          {orders.length === 0 ? (

            <div className="rounded-2xl bg-white p-12 text-center shadow">

              <h2 className="text-2xl font-bold text-[#003366]">
                No Orders Yet
              </h2>

              <p className="mt-3 text-gray-500">
                Browse publications and place your first order.
              </p>

              <Link
                to="/customer/books"
                className="mt-6 inline-block rounded-xl bg-[#003366] px-6 py-3 text-white"
              >
                Browse Books
              </Link>

            </div>

          ) : (

            <div className="space-y-6">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="rounded-2xl bg-white p-6 shadow"
                >

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                      <h2 className="text-xl font-bold text-[#003366]">
                        {order.id}
                      </h2>

                      <p className="mt-2 text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Books
                      </p>

                      <p className="text-lg font-semibold">
                        {order.items.length}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Total
                      </p>

                      <p className="text-lg font-bold text-[#003366]">
                        {order.grandTotal}
                      </p>

                    </div>

                    <div>

                      <StatusBadge status={order.status} />

                    </div>

                    <div>

                      <Link
                        to={`/customer/track-order/${order.id}`}
                        className="rounded-xl bg-[#003366] px-5 py-3 font-semibold text-white"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </>
  );
}

function StatusBadge({
  status,
            }: {
            status: string;
            }) {

            const styles: Record<string, string> = {
                REQUEST_SENT:
                "bg-yellow-100 text-yellow-800",

                INVOICE_SENT:
                "bg-orange-100 text-orange-800",

                PAYMENT_RECEIVED:
                "bg-blue-100 text-blue-800",

                SHIPPED:
                "bg-purple-100 text-purple-800",

                DELIVERED:
                "bg-green-100 text-green-800",
            };

            return (
                <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${styles[status]}`}
                >
                {status.replaceAll("_", " ")}
                </span>
            );
            }

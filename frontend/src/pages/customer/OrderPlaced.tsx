import { Link, useParams } from "react-router-dom";
import GlobalNavbar from "../../components/common/GlobalNavbar";
import { orderService } from "../../services/orderService";

export default function OrderPlaced() {
  const { orderId } = useParams();

  const order = orderService.getOrder(orderId ?? "");

  if (!order) {
    return (
      <>
        <GlobalNavbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="rounded-2xl bg-white p-10 shadow text-center">

            <h1 className="text-3xl font-bold text-red-600">
              Order Not Found
            </h1>

            <Link
              to="/customer/books"
              className="mt-6 inline-block rounded-xl bg-[#003366] px-6 py-3 text-white"
            >
              Continue Shopping
            </Link>

          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalNavbar />

      <div className="min-h-screen bg-slate-100">

        {/* Success Header */}

        <div className="bg-green-600 text-white">

          <div className="mx-auto max-w-7xl px-6 py-10">

            <h1 className="text-4xl font-bold">
              Order Request Submitted Successfully
            </h1>

            <p className="mt-2 text-green-100">
              Thank you for choosing CSIR–NIScPR Publications.
            </p>

          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-6 lg:col-span-2">

            {/* Order Details */}

            <div className="rounded-2xl bg-white p-6 shadow">

              <h2 className="text-2xl font-bold text-[#003366]">
                Order Details
              </h2>

              <div className="mt-6 space-y-3">

                <p>
                  <strong>Order ID :</strong> {order.id}
                </p>

                <p>
                  <strong>Customer :</strong> {order.customerName}
                </p>

                <p>
                  <strong>Email :</strong> {order.customerEmail}
                </p>

                <p>
                  <strong>Order Date :</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>

              </div>

            </div>

            {/* Ordered Books */}

            <div className="rounded-2xl bg-white p-6 shadow">

              <h2 className="text-2xl font-bold text-[#003366]">
                Books Ordered
              </h2>

              <div className="mt-6 space-y-5">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-4"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.publication.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Quantity : {item.quantity}
                      </p>

                    </div>

                    <div className="font-bold">
                      {item.price * item.quantity}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="sticky top-28 rounded-2xl bg-white p-6 shadow">

              <h2 className="text-2xl font-bold text-[#003366]">
                Order Timeline
              </h2>

              <div className="mt-8 space-y-6">

                <Timeline
                  active={true}
                  title="Order Request Submitted"
                  desc="Your order has been received."
                />

                <Timeline
                  active={false}
                  title="Invoice Will Be Sent"
                  desc="Postal charges will be calculated and invoice emailed."
                />

                <Timeline
                  active={false}
                  title="Payment Verification"
                  desc="Upload payment receipt after payment."
                />

                <Timeline
                  active={false}
                  title="Order Shipped"
                  desc="India Post tracking number will appear here."
                />

                <Timeline
                  active={false}
                  title="Delivered"
                  desc="Order delivered successfully."
                />

              </div>

              <div className="mt-8 rounded-xl bg-blue-50 p-4">

                <h3 className="font-semibold text-[#003366]">
                  Next Step
                </h3>

                <p className="mt-2 text-sm text-gray-700">
                  Our team will verify stock availability,
                  calculate postal charges and email an invoice.
                  Please complete payment only after receiving
                  the invoice.
                </p>

              </div>

              <div className="mt-8 space-y-3">

                <Link
                  to="/customer/orders"
                  className="block rounded-xl bg-[#003366] py-3 text-center font-semibold text-white"
                >
                  My Orders
                </Link>

                <Link
                  to="/customer/books"
                  className="block rounded-xl border border-[#003366] py-3 text-center font-semibold text-[#003366]"
                >
                  Continue Shopping
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

function Timeline({
  active,
  title,
  desc,
}: {
  active: boolean;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">

      <div
        className={`mt-2 h-4 w-4 rounded-full ${
          active ? "bg-green-600" : "bg-gray-300"
        }`}
      />

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {desc}
        </p>

      </div>

    </div>
  );
}
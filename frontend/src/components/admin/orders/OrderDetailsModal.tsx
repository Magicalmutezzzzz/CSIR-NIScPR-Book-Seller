import { useState } from "react";
import type { Order } from "../../../types/order";
import { orderService } from "../../../services/orderService";

interface Props {
  order: Order;
  onClose: () => void;
  refresh: () => void;
}

export default function OrderDetailsModal({
  order,
  onClose,
  refresh,
}: Props) {
  const [postalCharges, setPostalCharges] = useState(order.postalCharges);
  const [invoiceNumber, setInvoiceNumber] = useState(
    order.invoiceNumber ?? ""
  );

  const [trackingNumber, setTrackingNumber] = useState(
    order.trackingNumber ?? ""
  );

  const courier = "India Post";

  const [expectedDelivery, setExpectedDelivery] = useState(
    order.expectedDelivery ?? ""
  );

  const [status, setStatus] = useState(order.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8">

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[#003366]">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Close
          </button>
        </div>

        {/* Order Summary */}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold break-all">{order.id}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Books Total</p>
            <p className="font-semibold text-[#003366]">{order.booksTotal}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="font-semibold">{order.status.replaceAll("_", " ")}</p>
          </div>
        </div>

        {/* Customer */}

        <div className="mt-8">

          <h3 className="text-xl font-semibold text-[#003366]">
            Customer
          </h3>

          <div className="mt-3 rounded-xl border p-4">

            <p>
              <strong>Name:</strong> {order.customerName}
            </p>

            <p>
              <strong>Email:</strong> {order.customerEmail}
            </p>

          </div>

        </div>

      {/* Delivery Address */}

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#003366]">
            Delivery Address
          </h3>

          {order.shippingAddress ? (
            <div className="mt-3 rounded-xl border p-4 space-y-2">
              <p><strong>Name:</strong> {order.shippingAddress.fullName}</p>
              <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
              <p><strong>Email:</strong> {order.shippingAddress.email}</p>

              <hr />

              <p>
                {order.shippingAddress.addressLine1}
              </p>

              {order.shippingAddress.addressLine2 && (
                <p>{order.shippingAddress.addressLine2}</p>
              )}

              {order.shippingAddress.landmark && (
                <p>Landmark : {order.shippingAddress.landmark}</p>
              )}

              <p>
                {order.shippingAddress.city},
                {" "}
                {order.shippingAddress.district}
              </p>

              <p>
                {order.shippingAddress.state},
                {" "}
                {order.shippingAddress.country}
              </p>

              <p>
                PIN : {order.shippingAddress.pincode}
              </p>

              <p>
                <strong>Address Type:</strong>{" "}
                {order.shippingAddress.addressType}
              </p>
            </div>
          ) : (
            <div className="mt-3 rounded-xl bg-yellow-50 p-4 text-yellow-700">
              No delivery address was saved with this order.
            </div>
          )}
        </div>

        {/* Books */}

        <div className="mt-8">

          <h3 className="text-xl font-semibold text-[#003366]">
            Ordered Books
          </h3>

          <div className="mt-4 space-y-3">

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-semibold">
                    {item.publication.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty : {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  {item.price * item.quantity}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* Invoice */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#003366]">
            Invoice
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              value={invoiceNumber}
              onChange={(e) =>
                setInvoiceNumber(e.target.value)
              }
              placeholder="Invoice Number"
              className="rounded-lg border p-3"
            />
            <input
              type="number"
              value={postalCharges}
              onChange={(e) =>
                setPostalCharges(Number(e.target.value))
              }
              placeholder="Postal Charges"
              className="rounded-lg border p-3"
            />
          </div>
          <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800 mt-4">
            Customer will receive the invoice through the registered email after it is generated. Postal charges entered here will be included in the invoice.
          </div>
          <div className="rounded-xl border bg-slate-50 p-4 mt-4">
            <div className="flex justify-between">
              <span>Books Total</span>
              <span>{order.booksTotal}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span>Postal Charges</span>
              <span>{postalCharges}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-[#003366]">
              <span>Invoice Total</span>
              <span>{order.booksTotal + postalCharges}</span>
            </div>
          </div>
          <button
            className={`mt-4 rounded-xl px-6 py-3 text-white ${order.invoiceSent ? "cursor-not-allowed bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            onClick={() => {
              orderService.updateInvoice(
                order.id,
                invoiceNumber,
                postalCharges
              );
              refresh();
            }}
            disabled={order.invoiceSent}
          >
            Save Invoice
          </button>
        </div>

        {/* Payment */}
        <div className="mt-8">
          <button
            className={`rounded-xl px-6 py-3 text-white ${order.paymentVerified ? "cursor-not-allowed bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            onClick={() => {
              orderService.verifyPayment(order.id);
              refresh();
            }}
            disabled={order.paymentVerified}
          >
            Verify Payment
          </button>
        </div>

        {/* Shipment */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#003366]">
            Shipment
          </h3>
          <div className="mt-4 grid gap-4">
            <input
              value="India Post"
              readOnly
              className="rounded-lg border bg-slate-100 p-3"
            />
            <input
              value={trackingNumber}
              onChange={(e) =>
                setTrackingNumber(e.target.value)
              }
              placeholder="Tracking Number"
              className="rounded-lg border p-3"
            />
            <input
              type="date"
              value={expectedDelivery}
              onChange={(e) =>
                setExpectedDelivery(e.target.value)
              }
              className="rounded-lg border p-3"
            />
          </div>
          <button
            className="mt-4 rounded-xl bg-purple-600 px-6 py-3 text-white"
            onClick={() => {
              orderService.updateTracking(
                order.id,
                courier,
                trackingNumber,
                expectedDelivery
              );
              refresh();
            }}
          >
            Save Shipment
          </button>
          {order.trackingNumber && (
            <div className="mt-4 rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-700">Tracking Number</p>
              <p>{order.trackingNumber}</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#003366]">Order Progress</h3>
          <div className="mt-4 space-y-2 rounded-xl border p-4">
            <p>{["REQUEST_SENT","INVOICE_SENT","PAYMENT_RECEIVED","SHIPPED","DELIVERED"].includes(order.status) ? "✅" : "⚪"} Request Sent</p>
            <p>{["INVOICE_SENT","PAYMENT_RECEIVED","SHIPPED","DELIVERED"].includes(order.status) ? "✅" : "⚪"} Invoice Sent</p>
            <p>{["PAYMENT_RECEIVED","SHIPPED","DELIVERED"].includes(order.status) ? "✅" : "⚪"} Payment Received</p>
            <p>{["SHIPPED","DELIVERED"].includes(order.status) ? "✅" : "⚪"} Shipped</p>
            <p>{order.status === "DELIVERED" ? "✅" : "⚪"} Delivered</p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8">
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as Order["status"])
            }
            className="rounded-lg border p-3"
          >
            <option value="REQUEST_SENT">
              Request Sent
            </option>
            <option value="INVOICE_SENT">
              Invoice Sent
            </option>
            <option value="PAYMENT_RECEIVED">
              Payment Received
            </option>
            <option value="SHIPPED">
              Shipped
            </option>
            <option value="DELIVERED">
              Delivered
            </option>
          </select>
          <button
            className="ml-4 rounded-xl bg-[#003366] px-6 py-3 text-white"
            onClick={() => {
              orderService.updateStatus(order.id, status);
              refresh();
            }}
          >
            Update Status
          </button>
        </div>

      </div>

    </div>
  );
}
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalNavbar from "../../components/common/GlobalNavbar";
import { cartService } from "../../services/cartService";
import { orderService } from "../../services/orderService";
import { getAuthenticatedUser } from "../../services/authService";
import { addressService } from "../../services/addressService";
import type { Address } from "../../types/address";

export default function Checkout() {
  const navigate = useNavigate();

  const user = getAuthenticatedUser();

  const summary = cartService.getSummary();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    const data = addressService.getAddresses();
    setAddresses(data);
    const def = data.find(a => a.isDefault);
    if (def) setSelectedAddressId(def.id);
  }, []);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address.");
      return;
    }
    const selectedAddress = addressService.getAddressById(selectedAddressId);
    if (!selectedAddress) {
      alert("Please select a valid delivery address.");
      return;
    }

    const order = orderService.placeOrder(selectedAddress);

    if (!order) {
      alert("Unable to place order.");
      return;
    }

    navigate(`/customer/order-placed/${order.id}`);
  };

  return (
    <>
      <GlobalNavbar />

      <div className="min-h-screen bg-slate-50">

        {/* Header */}

        <div className="bg-[#003366] text-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h1 className="text-4xl font-bold">
              Checkout
            </h1>

            <p className="mt-3 text-blue-100">
              Review your order before submitting your request.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="grid gap-8 lg:grid-cols-3">

            {/* LEFT */}

            <div className="space-y-6 lg:col-span-2">

              {/* Customer */}

              <div className="rounded-2xl bg-white p-6 shadow">

                <h2 className="text-2xl font-bold text-[#003366]">
                  Customer Details
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>

                    <input
                      readOnly
                      value={
                        user?.email.split("@")[0] ?? ""
                      }
                      className="mt-2 w-full rounded-xl border bg-gray-50 p-3"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>

                    <input
                      readOnly
                      value={user?.email ?? ""}
                      className="mt-2 w-full rounded-xl border bg-gray-50 p-3"
                    />
                  </div>

                </div>

              </div>

              {/* Shipping */}

              <div className="rounded-2xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#003366]">Select Delivery Address</h2>
                  <Link to="/customer/addresses" className="rounded-lg bg-[#003366] px-4 py-2 text-white">Manage</Link>
                </div>

                {addresses.length === 0 ? (
                  <div className="mt-5 rounded-xl bg-yellow-50 p-5">
                    <p>No saved address found.</p>
                    <Link to="/customer/addresses" className="mt-3 inline-block font-semibold text-[#003366]">+ Add New Address</Link>
                  </div>
                ) : (
                  <div className="mt-5 space-y-4">
                    {addresses.map(address => (
                      <label key={address.id} className={`block cursor-pointer rounded-xl border p-4 ${selectedAddressId===address.id?"border-[#003366] bg-blue-50":""}`}>
                        <div className="flex items-start gap-3">
                          <input type="radio" checked={selectedAddressId===address.id} onChange={()=>setSelectedAddressId(address.id)} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{address.fullName}</span>
                              {address.isDefault && <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">Default</span>}
                            </div>
                            <p>{address.phone}</p>
                            <p>{address.addressLine1}{address.addressLine2?`, ${address.addressLine2}`:""}</p>
                            <p>{address.city}, {address.state} - {address.pincode}</p>
                            <Link to="/customer/addresses" className="mt-2 inline-block text-sm font-medium text-[#003366]">Edit Address</Link>
                          </div>
                        </div>
                      </label>
                    ))}
                    <Link to="/customer/addresses" className="inline-block font-semibold text-[#003366]">+ Add New Address</Link>
                  </div>
                )}
              </div>

              {/* Order Items */}

              <div className="rounded-2xl bg-white p-6 shadow">

                <h2 className="text-2xl font-bold text-[#003366]">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-5">

                  {summary.items.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >

                      <div>

                        <h3 className="font-semibold text-[#003366]">
                          {item.publication.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantity : {item.quantity}
                        </p>

                      </div>

                      <div className="font-bold text-[#003366]">
                        {item.publication.price * item.quantity}
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
                  Payment Summary
                </h2>

                  <div className="mt-6 space-y-4">

                    <div className="flex justify-between">
                      <span>Books Total</span>
                      <span className="font-semibold">
                        {summary.subtotal}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated Postal Charges</span>
                      <span className="font-semibold">
                        {summary.shipping}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span className="font-semibold">
                        {summary.gst.toFixed(2)}
                      </span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold">

                      <span>Estimated Grand Total</span>

                      <span className="text-[#003366]">
                        {summary.grandTotal.toFixed(2)}
                      </span>

                    </div>

                  </div>

                {/* Invoice Notice */}

                <div className="mt-8 rounded-xl border border-yellow-300 bg-yellow-50 p-4">

                  <h3 className="font-semibold text-yellow-800">
                    Payment Process
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-yellow-700">

                    <li>
                      Your order request will be submitted immediately.
                    </li>

                    <li>
                      CSIR–NIScPR will calculate postal / shipping charges.
                    </li>

                    <li>
                      An invoice containing the total payable amount will be
                      sent to your registered email address.
                    </li>

                    <li>
                      After receiving the invoice, complete the payment using
                      the instructions provided.
                    </li>

                    <li>
                      Email your payment receipt/screenshot for verification.
                    </li>

                    <li>
                      Once payment is verified, your order will be dispatched
                      through India Post.
                    </li>

                  </ul>

                </div>

                {/* Status Timeline */}

                <div className="mt-8">

                  <h3 className="font-semibold text-[#003366]">
                    Order Status
                  </h3>

                  <div className="mt-5 space-y-4">

                    <div className="flex gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-600 mt-1.5"></div>
                      <div>
                        <p className="font-semibold">
                          Order Request
                        </p>
                        <p className="text-sm text-gray-500">
                          Your request will be submitted.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="h-3 w-3 rounded-full bg-gray-300 mt-1.5"></div>
                      <div>
                        <p className="font-semibold">
                          Invoice Sent
                        </p>
                        <p className="text-sm text-gray-500">
                          Waiting for payment.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="h-3 w-3 rounded-full bg-gray-300 mt-1.5"></div>
                      <div>
                        <p className="font-semibold">
                          Payment Verified & Order Shipped
                        </p>
                        <p className="text-sm text-gray-500">
                          India Post tracking number will appear here.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="h-3 w-3 rounded-full bg-gray-300 mt-1.5"></div>
                      <div>
                        <p className="font-semibold">
                          Delivered
                        </p>
                        <p className="text-sm text-gray-500">
                          Final delivery confirmation.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="mt-8 w-full rounded-xl bg-[#003366] py-4 text-lg font-semibold text-white transition hover:bg-[#002855]"
                >
                  Place Order Request
                </button>

              </div>

            </div>
                    </div>

        </div>

      </div>

    </>
  );
}
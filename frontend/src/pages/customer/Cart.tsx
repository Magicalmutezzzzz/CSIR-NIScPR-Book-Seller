import { Link } from "react-router-dom";
import { cartService } from "../../services/cartService";

export default function Cart() {
  const summary = cartService.getSummary();
  const items = summary.items;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-[#003366]">
        Your cart
      </h1>

      {items.length === 0 ? (
        <Empty message="Your cart is empty." />
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.publication.id}
              className="flex items-center justify-between rounded-2xl border bg-white p-5"
            >
              <div>
                <h2 className="font-semibold text-[#003366]">
                  {item.publication.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {item.publication.price} each
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    cartService.decreaseQuantity(
                      item.publication.id
                    );
                    window.location.reload();
                  }}
                  className="rounded border px-3 py-1"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => {
                    cartService.increaseQuantity(
                      item.publication.id
                    );
                    window.location.reload();
                  }}
                  className="rounded border px-3 py-1"
                >
                  +
                </button>

                <button
                  onClick={() => {
                    cartService.removeFromCart(
                      item.publication.id
                    );
                    window.location.reload();
                  }}
                  className="text-sm text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between rounded-2xl bg-slate-50 p-5 text-lg font-bold">
            <span>Total</span>

            <span>
              {summary.grandTotal.toFixed(2)}
            </span>
          </div>

          <Link
            to="/customer/checkout"
            className="float-right rounded-xl bg-[#003366] px-5 py-3 font-medium text-white"
          >
            Proceed to checkout
          </Link>
        </div>
      )}
    </main>
  );
}

export function Empty({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mt-8 rounded-3xl border bg-white p-12 text-center">
      <p className="text-gray-500">
        {message}
      </p>

      <Link
        to="/customer/books"
        className="mt-5 inline-block font-semibold text-[#003366]"
      >
        Browse publications
      </Link>
    </div>
  );
}
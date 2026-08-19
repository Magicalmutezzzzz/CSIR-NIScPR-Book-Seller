import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Heart,
  ShoppingCart,
} from "lucide-react";

import GlobalNavbar from "../../components/common/GlobalNavbar";

import {
  publicationService,
} from "../../services/publicationService";

import {
  cartService,
} from "../../services/cartService";

import {
  wishlistService,
} from "../../services/wishlistService";

import type {
  Publication,
} from "../../types/publication";

export default function Books() {

  const [books, setBooks] =
    useState<Publication[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("latest");

  const [, forceUpdate] =
    useState(0);

  useEffect(() => {

    async function loadBooks() {

      try {

        setLoading(true);

        const data =
          await publicationService.getBooks();

        setBooks(data);

      } catch (error) {

        console.error(
          "Failed to load books:",
          error
        );

        setBooks([]);

      } finally {

        setLoading(false);

      }
    }

    loadBooks();

  }, []);

  const filteredBooks =
    useMemo(() => {

      let items =
        [...books];

      const query =
        search.trim().toLowerCase();

      if (query) {

        items =
          items.filter(
            (book) =>
              book.title
                .toLowerCase()
                .includes(query) ||
              book.description
                ?.toLowerCase()
                .includes(query)
          );
      }

      switch (sortBy) {

        case "priceLow":

          items.sort(
            (a, b) =>
              Number(a.price) -
              Number(b.price)
          );

          break;

        case "priceHigh":

          items.sort(
            (a, b) =>
              Number(b.price) -
              Number(a.price)
          );

          break;

        case "name":

          items.sort(
            (a, b) =>
              a.title.localeCompare(
                b.title
              )
          );

          break;

        default:

          items.sort(
            (a, b) =>
              new Date(
                b.publication_date || ""
              ).getTime() -
              new Date(
                a.publication_date || ""
              ).getTime()
          );
      }

      return items;

    }, [
      books,
      search,
      sortBy,
    ]);

  const handleWishlist = (
    book: Publication
  ) => {

    wishlistService.toggle(book);

    forceUpdate(
      (value) => value + 1
    );
  };

  const handleCart = (
    book: Publication
  ) => {

    cartService.addToCart(book);

    forceUpdate(
      (value) => value + 1
    );
  };

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-50">

        <GlobalNavbar />

        <div className="flex min-h-[60vh] items-center justify-center">

          <div className="text-xl font-semibold text-[#003366]">
            Loading books...
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <GlobalNavbar />

      {/* Hero */}

      <div className="bg-[#003366] text-white">

        <div className="mx-auto max-w-7xl px-6 py-14">

          <h1 className="text-4xl font-bold">
            Scientific Books
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Explore authentic CSIR–NIScPR books
            in Computer Science, Biotechnology,
            Physics, Chemistry and many other
            disciplines.
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="grid gap-4 md:grid-cols-2">

            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              className="rounded-xl border p-3 outline-none focus:border-[#003366]"
            />

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value
                )
              }
              className="rounded-xl border p-3 outline-none focus:border-[#003366]"
            >

              <option value="latest">
                Latest
              </option>

              <option value="name">
                A - Z
              </option>

              <option value="priceLow">
                Price : Low to High
              </option>

              <option value="priceHigh">
                Price : High to Low
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Results */}

      <div className="mx-auto max-w-7xl px-6 pb-12">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#003366]">
            Available Books
          </h2>

          <p className="text-gray-500">
            {filteredBooks.length} Publication(s)
          </p>

        </div>

        {filteredBooks.length === 0 ? (

          <div className="rounded-2xl bg-white p-16 text-center shadow">

            <h2 className="text-2xl font-semibold text-[#003366]">
              No Books Found
            </h2>

            <p className="mt-2 text-gray-500">
              No books are currently available.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredBooks.map(
              (book) => {

                const isWishlisted =
                  wishlistService.isInWishlist(
                    book.id
                  );

                const cartItem =
                  cartService
                    .getItems()
                    .find(
                      (item) =>
                        item.id === book.id
                    );

                return (

                  <div
                    key={book.id}
                    className="mx-auto flex h-full w-[220px] flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
                   >
                    <div className="flex h-[340px] items-center justify-center bg-gray-100 p-3">
                      <img
                        src={book.cover_image || "/DefaultBook.jpg"}
                        alt={book.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">

                      <h3 className="mt-3 line-clamp-2 min-h-[60px] text-lg font-semibold text-[#003366]">
                        {book.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        {book.publication_date
                          ? new Date(
                              book.publication_date
                            ).getFullYear()
                          : "Year unavailable"}
                      </p>

                      <div className="mt-auto pt-4 flex items-center justify-between">

                        <span className="text-lg font-bold text-[#003366]">
                          ₹{book.price}
                        </span>

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleWishlist(book)
                            }
                            className={`rounded-lg p-2 ${
                              isWishlisted
                                ? "bg-red-500 text-white"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                            title="Wishlist"
                          >
                            <Heart
                              size={18}
                              fill={
                                isWishlisted
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleCart(book)
                            }
                            className="flex items-center gap-2 rounded-lg bg-[#003366] px-3 py-2 text-white hover:bg-[#00264d]"
                            title="Add to Cart"
                          >
                            <ShoppingCart size={18} />

                            {cartItem
                              ? cartItem.quantity
                              : "Add"}
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}
import { useEffect, useMemo, useState } from "react";

import {
  Search,
  BookOpen,
} from "lucide-react";

import GlobalNavbar from "../../components/common/GlobalNavbar";
import BookCard from "../../components/customer/BookCard";

import { publicationService } from "../../services/publicationService";

import type { Publication } from "../../types/publication";

export default function Books() {

  const [books, setBooks] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {

    async function loadBooks() {

      try {

        setLoading(true);

        const data = await publicationService.getBooks();

        setBooks(data);

      } catch (error) {

        console.error("Failed to load books:", error);

        setBooks([]);

      } finally {

        setLoading(false);

      }
    }

    loadBooks();

  }, []);

  const categories = useMemo(() => {

    return [

      "All",

      ...Array.from(

        new Set(

          books.flatMap(

            (book) =>
              book.categories?.map((c) => c.name) ?? []

          )

        )

      ),

    ];

  }, [books]);

  const filteredBooks = useMemo(() => {

    let filtered = [...books];

    if (category !== "All") {

      filtered = filtered.filter((book) =>

        book.categories?.some(

          (c) => c.name === category

        )

      );

    }

    if (search.trim() !== "") {

      filtered = filtered.filter(

        (book) =>

          book.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||

          (book.author ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

          (book.description ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())

      );

    }

    switch (sortBy) {

      case "name":

        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        break;

      case "priceLow":

        filtered.sort(
          (a, b) => a.price - b.price
        );

        break;

      case "priceHigh":

        filtered.sort(
          (a, b) => b.price - a.price
        );

        break;

      case "latest":
      default:

        filtered.sort(

          (a, b) =>

            new Date(
              b.publication_date ?? ""
            ).getTime()

            -

            new Date(
              a.publication_date ?? ""
            ).getTime()

        );

        break;

    }

    return filtered;

  }, [

    books,

    category,

    search,

    sortBy,

  ]);

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-50">

        <GlobalNavbar />

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-xl font-semibold text-[#003366]">

            Loading Books...

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-50">

      <GlobalNavbar />

      {/* Hero */}

      <section className="bg-[#003366] py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="flex items-center gap-4">

            <BookOpen
              className="text-white"
              size={42}
            />

            <div>

              <h1 className="text-5xl font-bold text-white">

                Scientific Books

              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">

                Explore authentic CSIR–NIScPR books
                across multiple scientific disciplines.

              </p>

            </div>

          </div>

        </div>

      </section>

      <div className="mx-auto max-w-7x1 px-6 py-10">
            {/* Filters */}

        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Search */}

            <div className="relative">

              <Search
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
              />

            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
            >

              {categories.map((cat) => (

                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>

              ))}

            </select>

            {/* Sort */}

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-xl border px-4 py-3 outline-none focus:border-[#003366]"
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

        {/* Heading */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

          <h2 className="text-3xl font-bold text-[#003366]">

            Available Books

          </h2>

          <div className="rounded-full bg-[#003366] px-5 py-2 font-semibold text-white">

            {filteredBooks.length} Publications

          </div>

        </div>
                  {/* Content */}

        {filteredBooks.length === 0 ? (

          <div className="mt-12 text-center">

            <div className="text-lg font-semibold text-[#003366]">
              Loading Books...
            </div>

          </div>

        ) : filteredBooks.length === 0 ? (

          <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow">

            <h3 className="text-2xl font-bold text-[#003366]">
              No Books Found
            </h3>

            <p className="mt-3 text-gray-500">
              Try another search keyword or category.
            </p>

          </div>

        ) : (

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredBooks.map((book) => (

              <BookCard
                key={book.id}

                id={book.id}

                title={book.title}

                author={
                  book.author ?? "Unknown Author"
                }

                description={
                  book.description ??
                  "No description available."
                }

                image={
                  book.cover_image ||
                  "/DefaultBook.jpg"
                }

                category={
                  book.categories?.length
                    ? book.categories
                        .map((c) => c.name)
                        .join(", ")
                    : "General"
                }

                price={book.price}

                stock={book.stock}

                year={
                  book.publication_date
                    ? new Date(
                        book.publication_date
                      ).getFullYear()
                    : undefined
                }
              />

            ))}

          </div>
        )}

        </div>

</div>
  )}

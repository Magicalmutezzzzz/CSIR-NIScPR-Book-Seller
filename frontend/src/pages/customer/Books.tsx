import { useMemo, useState } from "react";
import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";
import type { Publication } from "../../types/publication";

export default function Books() {
  const allBooks = publicationService.getBooks();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

const categories: string[] = [
  "All",
  ...Array.from(
    new Set<string>(allBooks.map((book: Publication) => book.category))
  ),
];

  const filteredBooks = useMemo(() => {
    let books = [...allBooks];

    if (category !== "All") {
      books = books.filter((book) => book.category === category);
    }

    if (search.trim() !== "") {
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortBy) {
      case "priceLow":
        books.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        books.sort((a, b) => b.price - a.price);
        break;

      case "name":
        books.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        books.sort((a, b) => b.year - a.year);
    }

    return books;
  }, [allBooks, category, search, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-[#003366] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h1 className="text-4xl font-bold">
            Scientific Books
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Explore authentic CSIR–NIScPR publications in Computer Science,
            Biotechnology, Physics, Chemistry and many other disciplines.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border p-3 outline-none focus:border-[#003366]"
            />

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border p-3 outline-none focus:border-[#003366]"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border p-3 outline-none focus:border-[#003366]"
            >
              <option value="latest">Latest</option>
              <option value="name">A - Z</option>
              <option value="priceLow">Price : Low to High</option>
              <option value="priceHigh">Price : High to Low</option>
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
              No books found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                category={book.category}
                price={book.price}
                image={book.coverImage}
                stock={book.stock}
                year={book.year}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
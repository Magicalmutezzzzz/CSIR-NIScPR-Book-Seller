import { useMemo, useState } from "react";
import { Search as SearchIcon, Filter } from "lucide-react";
import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";

export default function Search() {
  const publications = publicationService.getAll();

  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const results = useMemo(() => {
    return publications.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());

      const matchesType =
        type === "All" || item.type === type;

      return matchesQuery && matchesType;
    });
  }, [publications, query, type]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}

      <div className="bg-[#003366] py-14 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-bold">
            Search Publications
          </h1>

          <p className="mt-3 text-blue-100">
            Search books, journals, magazines and research publications.
          </p>

        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Search Box */}

        <div className="rounded-3xl bg-white p-6 shadow">

          <div className="grid gap-4 md:grid-cols-4">

            <div className="relative md:col-span-3">

              <SearchIcon
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search by title, author or category..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
              />

            </div>

            <div className="relative">

              <Filter
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
              >
                <option>All</option>
                <option>Book</option>
                <option>Journal</option>
                <option>Magazine</option>
                <option>Research</option>
              </select>

            </div>

          </div>

        </div>

        {/* Count */}

        <div className="mt-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#003366]">
            Search Results
          </h2>

          <span className="rounded-full bg-[#003366] px-4 py-2 text-sm text-white">
            {results.length} Result(s)
          </span>

        </div>

        {/* Results */}

        {results.length === 0 ? (

          <div className="mt-14 rounded-3xl bg-white p-16 text-center shadow">

            <h2 className="text-3xl font-bold text-[#003366]">
              No Publications Found
            </h2>

            <p className="mt-4 text-gray-600">
              Try another keyword or publication type.
            </p>

          </div>

        ) : (

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {results.map((publication) => (

              <BookCard
                key={publication.id}
                id={publication.id}
                title={publication.title}
                author={publication.author}
                category={publication.category}
                price={publication.price}
                image={publication.coverImage}
                stock={publication.stock}
                year={publication.year}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
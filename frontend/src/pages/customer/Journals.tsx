import { useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";
import GlobalNavbar from "../../components/common/GlobalNavbar";
import type { Publication } from "../../types/publication";

export default function Journals() {
  const journals = publicationService.getJournals();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const categories: string[] = [
    "All",
    ...Array.from(
      new Set<string>(journals.map((item: Publication) => item.category))
    ),
  ];

  const filteredJournals = useMemo(() => {
    let filtered = journals;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "name":
        filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "priceLow":
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
        break;
      case "latest":
      default:
        filtered = filtered.slice().sort((a, b) => b.year - a.year);
        break;
    }

    return filtered;
  }, [journals, search, category, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavbar />
      <section className="bg-[#003366] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4">
            <BookOpen className="text-white" size={42} />
            <div>
              <h1 className="text-5xl font-bold text-white">
                Scientific Journals
              </h1>
              <p className="mt-3 max-w-3xl text-blue-100">
                Browse peer-reviewed journals published by CSIR–NIScPR.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search journals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
              />
            </div>

            <select
              className="w-full rounded-xl border py-3 px-4 outline-none focus:border-[#003366]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl border py-3 px-4 outline-none focus:border-[#003366]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="name">A - Z</option>
              <option value="priceLow">Price : Low to High</option>
              <option value="priceHigh">Price : High to Low</option>
            </select>
          </div>
        </div>
       {/* Statistics */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-[#003366]">
            Available Magazines
          </h2>

          <div className="rounded-full bg-[#003366] px-5 py-2 text-white font-semibold">
            {filteredJournals.length} Publications
          </div>
        </div>

        {/* Grid */}

        {filteredJournals.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow">
            <h3 className="text-2xl font-bold text-[#003366]">
              No Magazine Found
            </h3>

            <p className="mt-3 text-gray-500">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredJournals.map((journal) => (
            <BookCard
              key={journal.id}
              id={journal.id}
              title={journal.title}
              author={journal.author}
              category={journal.category}
              image={journal.coverImage}
              price={journal.price}
              stock={journal.stock}
              year={journal.year}
            />
          ))}
        </div>
        )}
        </div>
    </div>
  );
}
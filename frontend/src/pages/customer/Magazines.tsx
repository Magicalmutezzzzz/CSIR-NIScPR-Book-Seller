import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import type { Publication } from "../../types/publication";
import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";
import GlobalNavbar from "../../components/common/GlobalNavbar";
export default function Magazines() {
  const magazines = publicationService.getMagazines();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const categories: string[] = [
    "All",
    ...Array.from(
      new Set<string>(magazines.map((item: Publication) => item.category))
    ),
  ];

  const filteredMagazines = useMemo(() => {
    let filtered = magazines;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.author.toLowerCase().includes(search.toLowerCase())
      );
    }

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
  }, [magazines, category, search, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavbar />
      {/* Hero */}

      <section className="bg-[#003366] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4">
            <BookOpen className="text-white" size={42} />

            <div>
              <h1 className="text-5xl font-bold text-white">
                Scientific Magazines
              </h1>

              <p className="mt-3 text-blue-100 max-w-2xl">
                Explore popular science magazines published by CSIR–NIScPR.
                Stay updated with emerging technologies, innovations,
                environmental research, health sciences, and scientific
                discoveries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Magzines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
              />
            </div>
            <select
              className="rounded-xl border py-3 px-4 outline-none focus:border-[#003366]"
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
              className="rounded-xl border py-3 px-4 outline-none focus:border-[#003366]"
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
            {filteredMagazines.length} Publications
          </div>
        </div>

        {/* Grid */}

        {filteredMagazines.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow">
            <h3 className="text-2xl font-bold text-[#003366]">
              No Magazine Found
            </h3>

            <p className="mt-3 text-gray-500">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMagazines.map((magazine) => (
              <BookCard
                key={magazine.id}
                id={magazine.id}
                title={magazine.title}
                author={magazine.author}
                category={magazine.category}
                image={magazine.coverImage}
                price={magazine.price}
                stock={magazine.stock}
                year={magazine.year}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
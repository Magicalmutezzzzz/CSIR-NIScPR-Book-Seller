import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";

export default function Magazines() {
  const magazines = publicationService.getMagazines();

  const [search, setSearch] = useState("");

  const filteredMagazines = useMemo(() => {
    return magazines.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [magazines, search]);

  return (
    <div className="min-h-screen bg-slate-50">
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
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search magazines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
            />
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
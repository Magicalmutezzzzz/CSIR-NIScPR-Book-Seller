import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";

import type { Publication } from "../../types/publication";

import BookCard from "../../components/customer/BookCard";
import GlobalNavbar from "../../components/common/GlobalNavbar";
import { publicationService } from "../../services/publicationService";

export default function Magazines() {
  const [magazines, setMagazines] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    async function loadMagazines() {
      try {
        const data = await publicationService.getMagazines();
        setMagazines(data);
      } catch (error) {
        console.error("Failed to load magazines:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMagazines();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          magazines.flatMap((item) =>
            item.categories?.map((c) => c.name) ?? []
          )
        )
      ),
    ];
  }, [magazines]);

  const filteredMagazines = useMemo(() => {
    let filtered = [...magazines];

    if (category !== "All") {
      filtered = filtered.filter((item) =>
        item.categories?.some((c) => c.name === category)
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          (item.author ?? "")
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
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "latest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.publication_date ?? "").getTime() -
            new Date(a.publication_date ?? "").getTime()
        );
        break;
    }

    return filtered;
  }, [magazines, search, category, sortBy]);

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
                Scientific Magazines
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Explore popular science magazines
                published by CSIR–NIScPR.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Search */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-3">

            <div className="relative">
              <Search
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search magazines..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
              />
            </div>

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
            Available Magazines
          </h2>

          <div className="rounded-full bg-[#003366] px-5 py-2 font-semibold text-white">
            {filteredMagazines.length} Publications
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="mt-12 text-center">
            Loading...
          </div>
        ) : filteredMagazines.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow">
            <h3 className="text-2xl font-bold text-[#003366]">
              No Magazine Found
            </h3>

            <p className="mt-3 text-gray-500">
              Try another search keyword.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {filteredMagazines.map(
              (magazine) => (
                <BookCard
                  key={magazine.id}
                  id={magazine.id}
                  title={magazine.title}
                  author={
                    magazine.author ?? "Unknown"
                  }
                  category={
                    magazine.categories
                      ?.map((c) => c.name)
                      .join(", ") ?? "General"
                  }
                  image={
                    magazine.cover_image ||
                    "/DefaultBook.jpg"
                  }
                  price={magazine.price}
                  stock={magazine.stock}
                  year={
                    magazine.publication_date
                      ? new Date(
                          magazine.publication_date
                        ).getFullYear()
                      : undefined
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
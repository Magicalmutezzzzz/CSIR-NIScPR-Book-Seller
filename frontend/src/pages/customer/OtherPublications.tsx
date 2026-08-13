import { useEffect, useMemo, useState } from "react";
import { Search, LibraryBig } from "lucide-react";

import BookCard from "../../components/customer/BookCard";
import GlobalNavbar from "../../components/common/GlobalNavbar";

import { publicationService } from "../../services/publicationService";
import { getPublicationTypes } from "../../api/publicationTypes";

type BackendPublication = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;

  publication_type_id: string;

  price: number | string;
  discount_price?: number | string | null;
  stock: number;

  cover_image?: string | null;
  publication_date?: string | null;

  categories?: Array<{
    id: string;
    name: string;
  }>;

  authors?: Array<{
    id: string;
    name: string;
  }>;
};

type PublicationType = {
  id: string;
  name: string;
};

type DisplayPublication = {
  id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  price: number;
  stock: number;
  year: number;
};

export default function OtherPublications() {
  const [publications, setPublications] = useState<DisplayPublication[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    async function loadPublications() {
      try {
        setLoading(true);

        const [rawPublications, publicationTypes] = await Promise.all([
          publicationService.getAll(),
          getPublicationTypes(),
        ]);

        const publicationsData =
          rawPublications as unknown as BackendPublication[];

        const types = publicationTypes as PublicationType[];

        // Find the backend ID for "Other"
        const otherType = types.find(
          (type) => type.name.toLowerCase() === "other"
        );

        if (!otherType) {
          console.warn(
            'Publication type "Other" was not found in the backend.'
          );
          setPublications([]);
          return;
        }

        // Keep only Other Publications
        const otherPublications = publicationsData.filter(
          (publication) =>
            publication.publication_type_id === otherType.id
        );

        // Convert backend data into the shape required by BookCard
        const formattedPublications: DisplayPublication[] =
          otherPublications.map((publication) => {
            const firstAuthor =
              publication.authors?.[0]?.name ?? "CSIR-NIScPR";

            const firstCategory =
              publication.categories?.[0]?.name ?? "Other";

            const year = publication.publication_date
              ? new Date(publication.publication_date).getFullYear()
              : 0;

            return {
              id: publication.id,
              title: publication.title,
              author: firstAuthor,
              category: firstCategory,
              image:
                publication.cover_image || "/DefaultBook.jpg",
              price: Number(publication.price),
              stock: publication.stock,
              year,
            };
          });

        setPublications(formattedPublications);
      } catch (error) {
        console.error(
          "Failed to load other publications:",
          error
        );

        setPublications([]);
      } finally {
        setLoading(false);
      }
    }

    loadPublications();
  }, []);

  const categories = useMemo<string[]>(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          publications.map(
            (publication) => publication.category
          )
        )
      ),
    ];
  }, [publications]);

  const filteredPublications = useMemo(() => {
    let filtered = [...publications];

    // Category
    if (category !== "All") {
      filtered = filtered.filter(
        (item) => item.category === category
      );
    }

    // Search
    const query = search.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === "latest") {
      filtered.sort((a, b) => b.year - a.year);
    }

    if (sortBy === "name") {
      filtered.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortBy === "priceLow") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHigh") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [publications, search, category, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavbar />

      {/* Hero */}
      <section className="bg-[#003366] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4">
            <LibraryBig
              size={42}
              className="text-white"
            />

            <div>
              <h1 className="text-5xl font-bold text-white">
                Other Publications
              </h1>

              <p className="mt-3 max-w-3xl text-blue-100">
                Browse conference proceedings, technical
                reports, scientific monographs, patents,
                policy documents and other research
                publications published by CSIR–NIScPR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search other publications..."
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
              className="w-full cursor-pointer rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#003366]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
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
              className="w-full cursor-pointer rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#003366]"
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

        {/* Header */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[#003366]">
            Other Publications
          </h2>

          <div className="rounded-full bg-[#003366] px-5 py-2 font-semibold text-white">
            {filteredPublications.length} Publications
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow">
            <p className="text-gray-500">
              Loading publications...
            </p>
          </div>
        ) : filteredPublications.length === 0 ? (
          /* Empty */
          <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow">
            <h3 className="text-2xl font-bold text-[#003366]">
              No Publications Found
            </h3>

            <p className="mt-3 text-gray-500">
              Please try another search keyword.
            </p>
          </div>
        ) : (
          /* Grid */
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPublications.map(
              (publication) => (
                <BookCard
                  key={publication.id}
                  id={publication.id}
                  title={publication.title}
                  author={publication.author}
                  category={publication.category}
                  image={publication.image}
                  price={publication.price}
                  stock={publication.stock}
                  year={publication.year}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
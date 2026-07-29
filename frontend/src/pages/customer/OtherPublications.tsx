import { useMemo, useState } from "react";
import { Search, LibraryBig } from "lucide-react";
import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";

export default function OtherPublications() {
  const publications = publicationService
    .getAll()
    .filter((item) => item.type === "Other");

  const [search, setSearch] = useState("");

  const filteredPublications = useMemo(() => {
    return publications.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [publications, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}

      <section className="bg-[#003366] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4">
            <LibraryBig size={42} className="text-white" />

            <div>
              <h1 className="text-5xl font-bold text-white">
                Other Publications
              </h1>

              <p className="mt-3 max-w-3xl text-blue-100">
                Browse conference proceedings, technical reports, scientific
                monographs, patents, policy documents and other research
                publications published by CSIR–NIScPR.
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
              placeholder="Search other publications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-[#003366]"
            />
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

        {/* Grid */}

        {filteredPublications.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow">
            <h3 className="text-2xl font-bold text-[#003366]">
              No Publications Found
            </h3>

            <p className="mt-3 text-gray-500">
              Please try another search keyword.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPublications.map((publication) => (
              <BookCard
                key={publication.id}
                id={publication.id}
                title={publication.title}
                author={publication.author}
                category={publication.category}
                image={publication.coverImage}
                price={publication.price}
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

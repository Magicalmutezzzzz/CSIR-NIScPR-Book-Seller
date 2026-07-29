import { useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";

export default function Journals() {
  const journals = publicationService.getJournals();
  const [search, setSearch] = useState("");

  const filteredJournals = useMemo(() => {
    return journals.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [journals, search]);

  return (
    <div className="min-h-screen bg-slate-50">
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
        </div>

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
      </div>
    </div>
  );
}
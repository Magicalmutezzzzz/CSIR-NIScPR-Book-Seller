import { useState, type JSX } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  FlaskConical,
  Newspaper,
  Microscope,
  Layers3,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: JSX.Element;
  publications: number;
  status: "Active" | "Inactive";
}

const demoCategories: Category[] = [
  {
    id: 1,
    name: "Medical",
    description: "Medical and Clinical Science Publications",
    icon: <BookOpen size={22} />,
    publications: 32,
    status: "Active",
  },
  {
    id: 2,
    name: "Biotechnology",
    description: "Biotechnology Research Journals",
    icon: <FlaskConical size={22} />,
    publications: 18,
    status: "Active",
  },
  {
    id: 3,
    name: "Science",
    description: "General Science Magazines",
    icon: <Newspaper size={22} />,
    publications: 24,
    status: "Active",
  },
  {
    id: 4,
    name: "Neuroscience",
    description: "Brain and Neurodegenerative Research",
    icon: <Microscope size={22} />,
    publications: 11,
    status: "Active",
  },
  {
    id: 5,
    name: "Engineering",
    description: "Engineering & Technology Publications",
    icon: <Layers3 size={22} />,
    publications: 15,
    status: "Inactive",
  },
];

export default function Categories() {
  const [categories, setCategories] =
    useState<Category[]>(demoCategories);

  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#003366]">
            Categories
          </h1>

          <p className="mt-2 text-gray-500">
            Manage publication categories.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-3 font-medium text-white transition hover:bg-[#002855]">

          <Plus size={18} />

          Add Category

        </button>

      </div>

      {/* Search */}

      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-[#003366] focus:outline-none"
        />

      </div>

      {/* Categories Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredCategories.map((category) => (

          <div
            key={category.id}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-[#003366]">

                {category.icon}

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  category.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {category.status}
              </span>

            </div>

            <div className="mt-5">

              <h2 className="text-xl font-bold text-[#003366]">
                {category.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {category.description}
              </p>

            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-4">

              <p className="text-sm text-gray-500">
                Publications
              </p>

              <p className="mt-1 text-3xl font-bold text-[#003366]">
                {category.publications}
              </p>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                className="flex-1 rounded-xl border border-blue-200 bg-blue-50 py-3 font-medium text-[#003366] transition hover:bg-blue-100 flex items-center justify-center gap-2"
              >

                <Pencil size={17} />

                Edit

              </button>

              <button
                onClick={() =>
                  setCategories((prev) =>
                    prev.filter(
                      (item) => item.id !== category.id
                    )
                  )
                }
                className="flex-1 rounded-xl border border-red-200 bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100 flex items-center justify-center gap-2"
              >

                <Trash2 size={17} />

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

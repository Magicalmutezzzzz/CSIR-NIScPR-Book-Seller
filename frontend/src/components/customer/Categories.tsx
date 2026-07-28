import {
  BookOpen,
  BookText,
  Newspaper,
  Microscope,
  FileText,
  Library,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Books",
    description: "Scientific books across multiple disciplines.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    link: "/customer/books",
  },
  {
    title: "Journals",
    description: "Peer-reviewed national & international journals.",
    icon: BookText,
    color: "bg-green-100 text-green-700",
    link: "/customer/journals",
  },
  {
    title: "Magazines",
    description: "Monthly and quarterly science magazines.",
    icon: Newspaper,
    color: "bg-orange-100 text-orange-700",
    link: "/customer/magazines",
  },
  {
    title: "Research",
    description: "Research papers and scientific reports.",
    icon: Microscope,
    color: "bg-purple-100 text-purple-700",
    link: "/customer/research",
  },
  {
    title: "Reports",
    description: "Government reports and policy documents.",
    icon: FileText,
    color: "bg-cyan-100 text-cyan-700",
    link: "/customer/research",
  },
  {
    title: "Other Publications",
    description: "Conference proceedings and publications.",
    icon: Library,
    color: "bg-pink-100 text-pink-700",
    link: "/customer/other-publications",
  },
];

export default function Categories() {
  return (
    <section className="bg-gray-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-[#003366]">
            Explore Categories
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Browse publications by category and discover quality scientific
            literature from CSIR-NIScPR.
          </p>

        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                to={category.link}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#003366] hover:shadow-xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}
                >
                  <Icon size={32} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#003366]">
                  {category.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {category.description}
                </p>

                <div className="mt-8 flex items-center font-semibold text-[#003366]">
                  Explore

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
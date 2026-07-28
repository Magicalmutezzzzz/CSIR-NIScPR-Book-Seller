import { Link } from "react-router-dom";
import {
  Microscope,
  CalendarDays,
  User,
} from "lucide-react";

const researchData = [
  {
    id: 1,
    title: "Artificial Intelligence in Drug Discovery",
    author: "Dr. Rajesh Kumar",
    category: "Artificial Intelligence",
    date: "15 July 2026",
    image: "https://placehold.co/600x400?text=AI+Research",
    description:
      "Exploring how artificial intelligence is accelerating drug discovery and reducing development timelines.",
  },
  {
    id: 2,
    title: "Advancements in Green Energy Technologies",
    author: "Dr. Neha Sharma",
    category: "Renewable Energy",
    date: "10 July 2026",
    image: "https://placehold.co/600x400?text=Green+Energy",
    description:
      "Recent breakthroughs in sustainable energy production and environmentally friendly technologies.",
  },
  {
    id: 3,
    title: "Nanotechnology for Medical Applications",
    author: "Dr. Amit Verma",
    category: "Nanotechnology",
    date: "05 July 2026",
    image: "https://placehold.co/600x400?text=Nanotechnology",
    description:
      "How nanotechnology is transforming diagnostics, drug delivery, and modern healthcare solutions.",
  },
];

export default function ResearchHighlights() {
  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-[#003366]">
            Research Highlights
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Discover recent scientific achievements, innovative technologies,
            and impactful research from CSIR-NIScPR.
          </p>

        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
                      {researchData.map((research) => (
            <div
              key={research.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="overflow-hidden">

                <img
                  src={research.image}
                  alt={research.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-6">

                <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  <Microscope size={16} />
                  {research.category}
                </span>

                <h3 className="mt-5 line-clamp-2 text-2xl font-bold text-[#003366]">
                  {research.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-gray-600">
                  <User size={18} />
                  <span>{research.author}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <CalendarDays size={18} />
                  <span>{research.date}</span>
                </div>

                <p className="mt-5 line-clamp-3 leading-7 text-gray-600">
                  {research.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                                      <Link
                    to={`/research/${research.id}`}
                    className="rounded-xl bg-[#003366] px-5 py-3 font-semibold text-white transition hover:bg-[#002855]"
                  >
                    Read More
                  </Link>

                  <span className="text-sm font-medium text-gray-500">
                    Explore Research →
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/research"
            className="rounded-xl border-2 border-[#003366] px-8 py-4 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
          >
            View All Research
          </Link>
        </div>

      </div>

    </section>
  );
}
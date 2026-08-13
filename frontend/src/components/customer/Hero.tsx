import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#003366] via-[#004b8d] to-[#005ea6] text-white">

      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 lg:flex-row lg:justify-between">

        {/* Left Content */}

        <div className="max-w-3xl">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
            CSIR • National Institute of Science Communication & Policy Research
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight lg:text-6xl">

            Explore India's

            <span className="block text-yellow-300">
              Scientific Publications
            </span>

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-blue-100">

            Discover books, journals, magazines, reports and research
            publications from CSIR-NIScPR. Search, read and access
            high-quality scientific knowledge in one place.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/customer/books"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#003366] transition hover:scale-105"
            >
              Browse Publications
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/customer/journals"
              className="rounded-xl border border-white px-6 py-4 font-semibold transition hover:bg-white hover:text-[#003366]"
            >
              Latest Books
            </Link>

          </div>
                  {/* Search Box */}

          <div className="mt-12 rounded-2xl bg-white p-3 shadow-2xl">

            <div className="flex flex-col gap-3 md:flex-row">

              <div className="relative flex-1">

                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  placeholder="Search books, journals, magazines or research papers..."
                  className="w-full rounded-xl border border-gray-300 py-4 pl-12 pr-4 text-gray-800 outline-none transition focus:border-[#003366]"
                />

              </div>

              <button className="rounded-xl bg-[#003366] px-8 py-4 font-semibold transition hover:bg-[#002855]">
                Search
              </button>

            </div>

          </div>

        </div>

        {/* Right Side Statistics */}

        <div className="mt-16 grid w-full max-w-md grid-cols-2 gap-5 lg:mt-0">

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">

            <BookOpen
              size={40}
              className="text-yellow-300"
            />

            <h3 className="mt-4 text-4xl font-bold">
              500+
            </h3>

            <p className="mt-2 text-blue-100">
              Books
            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">

            <FileText
              size={40}
              className="text-green-300"
            />

            <h3 className="mt-4 text-4xl font-bold">
              15+
            </h3>

            <p className="mt-2 text-blue-100">
              Journals
            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">

            <BookOpen
              size={40}
              className="text-pink-300"
            />

            <h3 className="mt-4 text-4xl font-bold">
              3+
            </h3>

            <p className="mt-2 text-blue-100">
              Magazines
            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">

            <FileText
              size={40}
              className="text-cyan-300"
            />

            <h3 className="mt-4 text-4xl font-bold">
              100+
            </h3>

            <p className="mt-2 text-blue-100">
              Other Publications
            </p>

          </div>
        </div>

      </div>

      {/* Decorative Background Elements */}

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl"></div>

    </section>
  );
}
import Navbar from "../../components/customer/Navbar";
import DashboardHero from "../../components/customer/DashboardHero";
import SearchBar from "./SearchBar";
import Categories from "../../components/customer/Categories";
import FeaturedPublications from "../../components/customer/FeaturedPublications";
import LatestJournals from "../../components/customer/LatestJournals";
import Footer from "../../components/customer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <DashboardHero />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search */}
        <SearchBar />

        {/* Categories */}
        <section className="mt-10">
          <Categories />
        </section>

        {/* Featured Publications */}
        <section className="mt-14">
          <FeaturedPublications />
        </section>

        {/* Latest Journals */}
        <section className="mt-14">
          <LatestJournals />
        </section>
      </main>

      <Footer />
    </div>
  );
}
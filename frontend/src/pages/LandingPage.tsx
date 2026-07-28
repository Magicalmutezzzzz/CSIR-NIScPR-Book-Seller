import PublicNavbar from "../components/Public/PublicNavbar";
import Hero from "../components/customer/Hero";
import Categories from "../components/customer/Categories";
import FeaturedPublications from "../components/customer/FeaturedPublications";
import LatestJournals from "../components/customer/LatestJournals";
import ResearchHighlights from "../components/customer/ResearchHighlights";
import Stats from "../components/customer/Stats";
import Newsletter from "../components/customer/Newsletter";
import Footer from "../components/customer/Footer";

export default function LandingPage() {
  return (
    <>
      <PublicNavbar />

      <Hero />

      <Categories />

      <FeaturedPublications />

      <LatestJournals />

      <ResearchHighlights />

      <Stats />

      <Newsletter />

      <Footer />
    </>
  );
}
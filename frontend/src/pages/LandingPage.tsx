import GlobalNavbar from "../components/common/GlobalNavbar";
import Hero from "../components/customer/Hero";
import Categories from "../components/customer/Categories";
import FeaturedPublications from "../components/customer/FeaturedPublications";
import LatestJournals from "../components/customer/LatestBooks";
import Footer from "../components/customer/Footer";

export default function LandingPage() {
  return (
    <>
      <GlobalNavbar />

      <Hero />

      <Categories />

      <FeaturedPublications />

      <LatestJournals />  

      <Footer />
    </>
  );
}
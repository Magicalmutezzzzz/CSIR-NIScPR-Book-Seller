import {
  BookOpen,
  Library,
  Newspaper,
  ShoppingCart,
} from "lucide-react";

import StatCard from "../../components/admin/StatCard";
import QuickActions from "../../components/admin/QuickActions";
import RecentPublications from "../../components/admin/RecentPublications";
import { publicationService } from "../../services/publicationService";

export default function Dashboard() {
  const publications = publicationService.getAll();
  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-[#003366]">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the CSIR-NIScPR Publication Management System.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Books"
          value={String(publications.filter((item) => item.type === "Book").length)}
          icon={BookOpen}
          color="bg-blue-600"
        />

        <StatCard
          title="Journals"
          value={String(publications.filter((item) => item.type === "Journal").length)}
          icon={Library}
          color="bg-green-600"
        />

        <StatCard
          title="Magazines"
          value={String(publications.filter((item) => item.type === "Magazine").length)}
          icon={Newspaper}
          color="bg-orange-500"
        />

        <StatCard
          title="Research"
          value={String(publications.filter((item) => item.type === "Research").length)}
          icon={ShoppingCart}
          color="bg-purple-600"
        />

      </div>

      {/* Quick Actions */}

      <QuickActions />

      {/* Recent Publications */}

      <RecentPublications />

    </div>
  );
}

import {
  BookOpen,
  Library,
  Newspaper,
  ShoppingCart,
} from "lucide-react";

import StatCard from "../../components/admin/StatCard";
import QuickActions from "../../components/admin/QuickActions";
import RecentPublications from "../../components/admin/RecentPublications";

export default function Dashboard() {
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
          value="1,245"
          icon={BookOpen}
          color="bg-blue-600"
        />

        <StatCard
          title="Journals"
          value="326"
          icon={Library}
          color="bg-green-600"
        />

        <StatCard
          title="Magazines"
          value="94"
          icon={Newspaper}
          color="bg-orange-500"
        />

        <StatCard
          title="Orders"
          value="523"
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
import { useEffect, useState } from "react";

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
import { getPublicationTypes } from "../../api/publicationTypes";

import type { Publication } from "../../types/publication";

interface PublicationType {
  id: string;
  name: string;
}

export default function Dashboard() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [publicationTypes, setPublicationTypes] = useState<
    PublicationType[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [publicationsData, typesData] = await Promise.all([
          publicationService.getAll(),
          getPublicationTypes(),
        ]);

        setPublications(publicationsData);
        setPublicationTypes(typesData);
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );

        setPublications([]);
        setPublicationTypes([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /*
   * Convert publication_type_id into
   * Book / Journal / Magazine / Research
   */
  const getTypeName = (typeId: string): string => {
    return (
      publicationTypes.find(
        (type) => type.id === typeId
      )?.name || ""
    );
  };

  /*
   * Count publications by type
   */
  const booksCount = publications.filter(
    (publication) =>
      getTypeName(
        publication.publication_type_id
      ).toLowerCase() === "book"
  ).length;

  const journalsCount = publications.filter(
    (publication) =>
      getTypeName(
        publication.publication_type_id
      ).toLowerCase() === "journal"
  ).length;

  const magazinesCount = publications.filter(
    (publication) =>
      getTypeName(
        publication.publication_type_id
      ).toLowerCase() === "magazine"
  ).length;

  const researchCount = publications.filter(
    (publication) =>
      getTypeName(
        publication.publication_type_id
      ).toLowerCase() === "research"
  ).length;

  /*
   * Loading screen
   */
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-2xl bg-white px-8 py-6 text-center shadow">
          <div className="text-lg font-semibold text-[#003366]">
            Loading dashboard...
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Fetching publications and publication types.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-[#003366]">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to the CSIR-NIScPR Publication
          Management System.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Books */}
        <StatCard
          title="Books"
          value={String(booksCount)}
          icon={BookOpen}
          color="bg-blue-600"
        />

        {/* Journals */}
        <StatCard
          title="Journals"
          value={String(journalsCount)}
          icon={Library}
          color="bg-green-600"
        />

        {/* Magazines */}
        <StatCard
          title="Magazines"
          value={String(magazinesCount)}
          icon={Newspaper}
          color="bg-orange-500"
        />

        {/* Research */}
        <StatCard
          title="Research"
          value={String(researchCount)}
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
import { useState } from "react";

import PublicationFilters from "../../components/admin/publications/PublicationFilters";
import PublicationTable from "../../components/admin/publications/PublicationTable";
import PublicationPagination from "../../components/admin/publications/PublicationPagination";
import PublicationExportModal from "../../components/admin/publications/PublicationExportModal";
import ViewPublicationModal from "../../components/admin/publications/ViewPublicationModal";
import EditPublicationModal from "../../components/admin/publications/EditPublicationModal";
import DeletePublicationModal from "../../components/admin/publications/DeletePublicationModal";

interface Publication {
  id: number;
  image: string;
  title: string;
  type: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  status: "Draft" | "Pending Review" | "Published" | "Archived";
  created: string;
}

const demoPublications: Publication[] = [
  {
    id: 1,
    image: "https://placehold.co/60x80",
    title: "Artificial Intelligence in Healthcare",
    type: "Book",
    category: "Medical",
    price: 950,
    stock: 120,
    sold: 54,
    revenue: 51300,
    status: "Published",
    created: "20 Jul 2026",
  },
  {
    id: 2,
    image: "https://placehold.co/60x80",
    title: "Nature Biotechnology",
    type: "Journal",
    category: "Biotechnology",
    price: 650,
    stock: 40,
    sold: 19,
    revenue: 12350,
    status: "Pending Review",
    created: "18 Jul 2026",
  },
  {
    id: 3,
    image: "https://placehold.co/60x80",
    title: "Science Today",
    type: "Magazine",
    category: "Science",
    price: 250,
    stock: 90,
    sold: 65,
    revenue: 16250,
    status: "Published",
    created: "15 Jul 2026",
  },
  {
    id: 4,
    image: "https://placehold.co/60x80",
    title: "Tauopathy Research",
    type: "Research Article",
    category: "Neuroscience",
    price: 1500,
    stock: 15,
    sold: 5,
    revenue: 7500,
    status: "Draft",
    created: "12 Jul 2026",
  },
];

export default function Publications() {
  const [publications, setPublications] =
  useState<Publication[]>(demoPublications);

  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-[#003366]">
          Publications Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all Books, Journals, Magazines and Research Articles.
        </p>

      </div>

      <PublicationFilters
        onExport={() => setExportOpen(true)}
      />

      <PublicationTable
        publications={publications}
        onView={(publication) => {
          setSelectedPublication(publication);
          setViewOpen(true);
        }}
        onEdit={(publication) => {
          setSelectedPublication(publication);
          setEditOpen(true);
        }}
        onDelete={(publication) => {
          setPublications((prev) =>
            prev.filter((item) => item.id !== publication.id)
          );

          setDeleteOpen(false);
          setSelectedPublication(null);
        }}
      />

        <PublicationPagination
        currentPage={1}
        totalPages={5}
        totalItems={publications.length}
        itemsPerPage={10}
        onPageChange={() => {}}
        onItemsPerPageChange={() => {}}
      />

      <PublicationExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        onExport={(options) => {
          console.log("Export Options:", options);

          // TODO:
          // PDF Export
          // CSV Export
          // Excel Export
          // FastAPI API Call

          setExportOpen(false);
        }}
      />

        <ViewPublicationModal
          open={viewOpen}
          publication={selectedPublication}
          onClose={() => {
            setSelectedPublication(null);
            setViewOpen(false);
          }}
        />

          <EditPublicationModal
  open={editOpen}
  publication={selectedPublication}
  onClose={() => {
    setSelectedPublication(null);
    setEditOpen(false);
  }}
  onSave={(updatedPublication) => {
    if (!selectedPublication) return;

    setPublications((prev) =>
      prev.map((publication) =>
        publication.id === selectedPublication.id
          ? {
              ...publication,
              ...updatedPublication,
            }
          : publication
      )
    );

    setEditOpen(false);
    setSelectedPublication(null);
  }}
/>

            <DeletePublicationModal
              open={deleteOpen}
              publication={selectedPublication}
              onClose={() => {
                setDeleteOpen(false);
                setSelectedPublication(null);
              }}
              onDelete={(publication) => {
                setPublications((prev) =>
                  prev.filter((item) => item.id !== publication.id)
                );

                // TODO:
                // await publicationService.delete(publication.id);

                setDeleteOpen(false);
                setSelectedPublication(null);
              }}
          />
                        
    </div>
  );
}
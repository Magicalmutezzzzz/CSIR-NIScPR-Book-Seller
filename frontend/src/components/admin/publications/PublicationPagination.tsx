import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PublicationPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

export default function PublicationPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PublicationPaginationProps) {
  const start =
    totalItems === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const end = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div className="text-sm text-gray-600">
          Showing
          <span className="font-semibold mx-1">
            {start}
          </span>
          to
          <span className="font-semibold mx-1">
            {end}
          </span>
          of
          <span className="font-semibold mx-1">
            {totalItems}
          </span>
          entries
        </div>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-600">
            Rows
          </span>

          <select
            value={itemsPerPage}
            onChange={(e) =>
              onItemsPerPageChange(Number(e.target.value))
            }
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003366]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

        </div>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              onPageChange(currentPage - 1)
            }
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          {pages.map((page) => (

            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition ${
                page === currentPage
                  ? "bg-[#003366] text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {page}
            </button>

          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() =>
              onPageChange(currentPage + 1)
            }
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}
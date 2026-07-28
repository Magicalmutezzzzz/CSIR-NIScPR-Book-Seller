import { Search, RotateCcw, Download, Plus } from "lucide-react";

interface PublicationFiltersProps {
  search?: string;
  type?: string;
  status?: string;
  category?: string;
  sort?: string;
  onSearchChange?: (value: string) => void;
  onTypeChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onReset?: () => void;
  onExport: () => void;
  onAddPublication?: () => void;
}

export default function PublicationFilters({
  search = "",
  type = "",
  status = "",
  category = "",
  sort = "",
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onCategoryChange,
  onSortChange,
  onReset,
  onExport,
  onAddPublication,
}: PublicationFiltersProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6">

      <div className="flex flex-col gap-5">

        {/* Top Row */}

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search publications..."
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003366]"
            />

          </div>

          <button
            onClick={onAddPublication}
            className="flex items-center justify-center gap-2 bg-[#003366] hover:bg-[#002855] text-white px-5 py-3 rounded-xl transition"
          >
            <Plus size={18} />
            Add Publication
          </button>

        </div>

        {/* Filters */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">

          <select
            value={type}
            onChange={(e) => onTypeChange?.(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Types</option>
            <option value="Book">Book</option>
            <option value="Journal">Journal</option>
            <option value="Magazine">Magazine</option>
            <option value="Research Article">Research Article</option>
          </select>

          <select
            value={status}
            onChange={(e) => onStatusChange?.(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            value={category}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Categories</option>
            <option>Science</option>
            <option>Medical</option>
            <option>Biotechnology</option>
            <option>Neuroscience</option>
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Sort By</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
            <option value="price">Price</option>
          </select>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 border rounded-xl hover:bg-gray-100 transition"
          >
            <RotateCcw size={18} />
            Reset
          </button>

          <button
            onClick={onExport}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
          >
            <Download size={18} />
            Export
          </button>

        </div>

      </div>

    </div>
  );
}
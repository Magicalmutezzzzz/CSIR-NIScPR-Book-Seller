import {
  BookOpen,
  Newspaper,
  Library,
} from "lucide-react";

const publications = [
  {
    id: 1,
    title: "Artificial Intelligence in Healthcare",
    type: "Book",
    status: "Published",
    date: "20 Jul 2026",
  },
  {
    id: 2,
    title: "Nature Biotechnology",
    type: "Journal",
    status: "Pending Review",
    date: "18 Jul 2026",
  },
  {
    id: 3,
    title: "Science Today",
    type: "Magazine",
    status: "Draft",
    date: "15 Jul 2026",
  },
];

export default function RecentPublications() {
  const getIcon = (type: string) => {
    switch (type) {
      case "Book":
        return <BookOpen size={20} className="text-blue-600" />;
      case "Journal":
        return <Library size={20} className="text-green-600" />;
      default:
        return <Newspaper size={20} className="text-orange-600" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#003366] mb-6">
        Recent Publications
      </h2>

      <div className="space-y-4">
        {publications.map((publication) => (
          <div
            key={publication.id}
            className="flex items-center justify-between border rounded-2xl p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                {getIcon(publication.type)}
              </div>

              <div>
                <h3 className="font-semibold">
                  {publication.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {publication.type} • {publication.date}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                publication.status
              )}`}
            >
              {publication.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
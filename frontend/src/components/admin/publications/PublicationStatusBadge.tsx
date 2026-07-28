interface PublicationStatusBadgeProps {
  status: "Draft" | "Pending Review" | "Published" | "Archived";
}

export default function PublicationStatusBadge({
  status,
}: PublicationStatusBadgeProps) {
  const styles = {
    Draft:
      "bg-gray-100 text-gray-700 border border-gray-300",

    "Pending Review":
      "bg-yellow-100 text-yellow-800 border border-yellow-300",

    Published:
      "bg-green-100 text-green-700 border border-green-300",

    Archived:
      "bg-red-100 text-red-700 border border-red-300",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}
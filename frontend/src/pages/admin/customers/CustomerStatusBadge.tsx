interface CustomerStatusBadgeProps {
  status: "Active" | "Inactive" | "Blocked";
}

export default function CustomerStatusBadge({
  status,
}: CustomerStatusBadgeProps) {
  const styles = {
    Active:
      "bg-green-100 text-green-700 border-green-200",

    Inactive:
      "bg-yellow-100 text-yellow-700 border-yellow-200",

    Blocked:
      "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          status === "Active"
            ? "bg-green-500"
            : status === "Inactive"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      />

      {status}
    </span>
  );
}
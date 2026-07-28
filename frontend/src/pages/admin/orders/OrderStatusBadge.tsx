interface OrderStatusBadgeProps {
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
}

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Processing:
      "bg-purple-100 text-purple-700",

    Shipped:
      "bg-blue-100 text-blue-700",

    Delivered:
      "bg-green-100 text-green-700",

    Cancelled:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
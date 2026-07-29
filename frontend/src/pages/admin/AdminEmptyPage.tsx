import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";

export default function AdminEmptyPage({ title, description, actionLabel, actionPath }: { title: string; description: string; actionLabel?: string; actionPath?: string }) {
  return <div className="space-y-6">
    <div><h1 className="text-3xl font-bold text-[#003366]">{title}</h1><p className="mt-2 text-gray-500">{description}</p></div>
    <section className="rounded-3xl border bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#003366]"><ClipboardList size={28} /></div>
      <h2 className="mt-5 text-xl font-semibold text-[#003366]">No records yet</h2>
      <p className="mx-auto mt-2 max-w-md text-gray-500">This area is ready for real records. No sample data is displayed.</p>
      {actionLabel && actionPath && <Link to={actionPath} className="mt-6 inline-block rounded-xl bg-[#003366] px-5 py-3 font-medium text-white hover:bg-[#002855]">{actionLabel}</Link>}
    </section>
  </div>;
}

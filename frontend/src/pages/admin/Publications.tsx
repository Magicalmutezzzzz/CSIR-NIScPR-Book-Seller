import { Link } from "react-router-dom";

import { publicationService } from "../../services/publicationService";
import type { PublicationType } from "../../types/publication";

interface PublicationsProps { typeFilter?: PublicationType }

export default function Publications({ typeFilter }: PublicationsProps) {
  const publications = publicationService.getAll().filter((item) => !typeFilter || item.type === typeFilter);
  const title = typeFilter ? `${typeFilter} publications` : "Publications";

  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-bold text-[#003366]">{title}</h1><p className="mt-2 text-gray-500">Create and manage the customer catalogue.</p></div>
      <Link to="/admin/publications/add" className="rounded-xl bg-[#003366] px-5 py-3 font-medium text-white hover:bg-[#002855]">Add publication</Link>
    </div>
    {publications.length === 0 ? <div className="rounded-3xl border bg-white p-14 text-center shadow-sm"><h2 className="text-xl font-semibold text-[#003366]">No {typeFilter?.toLowerCase() ?? ""} publications yet</h2><p className="mt-2 text-gray-500">Use “Add publication” to build the catalogue manually.</p></div> :
      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm"><table className="min-w-full text-left"><thead className="bg-slate-50 text-sm text-[#003366]"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4"></th></tr></thead><tbody className="divide-y">{publications.map((item) => <tr key={item.id}><td className="px-6 py-4 font-medium">{item.title}<p className="text-sm font-normal text-gray-500">{item.author}</p></td><td className="px-6 py-4">{item.type}</td><td className="px-6 py-4">{item.category}</td><td className="px-6 py-4">₹{item.price}</td><td className="px-6 py-4">{item.stock}</td><td className="px-6 py-4"><button onClick={() => { publicationService.delete(item.id); window.location.reload(); }} className="text-sm font-medium text-red-600">Delete</button></td></tr>)}</tbody></table></div>}
  </div>;
}

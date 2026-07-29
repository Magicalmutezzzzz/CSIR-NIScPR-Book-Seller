import { Link } from "react-router-dom";
import { publicationService } from "../../services/publicationService";

export default function RecentPublications() {
  const publications = publicationService.getAll().slice(-5).reverse();
  return <section className="rounded-3xl border bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-[#003366]">Recent publications</h2><Link to="/admin/publications" className="font-medium text-[#003366]">View all</Link></div>
    {publications.length === 0 ? <p className="py-10 text-center text-gray-500">No publications have been added yet.</p> : <div className="mt-5 divide-y">{publications.map((item) => <div key={item.id} className="flex items-center justify-between py-4"><div><p className="font-semibold text-[#003366]">{item.title}</p><p className="text-sm text-gray-500">{item.type} · {item.category}</p></div><span className="text-sm font-medium">₹{item.price}</span></div>)}</div>}
  </section>;
}

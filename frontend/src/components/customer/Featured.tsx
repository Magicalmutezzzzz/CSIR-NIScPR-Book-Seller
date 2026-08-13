import { Link } from "react-router-dom";
import { publicationService } from "../../services/publicationService";

export default function Featured() {
  const publications = publicationService.getFeatured();
  return <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><div className="flex items-center justify-between gap-4"><div><h2 className="text-4xl font-bold text-[#003366]">Featured Publications</h2><p className="mt-2 text-gray-500">Selections made by the publication team.</p></div><Link to="/customer/books" className="rounded-xl bg-[#003366] px-5 py-3 text-white">View catalogue</Link></div>{publications.length === 0 ? <p className="mt-12 rounded-3xl bg-slate-50 p-10 text-center text-gray-500">No featured publications have been selected yet.</p> : <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{publications.map((item) => <Link key={item.id} to={`/customer/book/${item.id}`} className="rounded-2xl border p-5 shadow-sm"><h3 className="font-bold text-[#003366]">{item.title}</h3><p className="mt-2 text-sm text-gray-500">{item.author}</p><p className="mt-4 font-semibold">{item.price}</p></Link>)}</div>}</div></section>;
}

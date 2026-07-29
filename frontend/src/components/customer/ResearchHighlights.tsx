import { Link } from "react-router-dom";
import { publicationService } from "../../services/publicationService";

export default function ResearchHighlights() {
  const publications = publicationService.getResearch().slice(0, 3);
  return <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><div className="text-center"><h2 className="text-4xl font-bold text-[#003366]">Research Highlights</h2><p className="mt-4 text-lg text-gray-600">Research articles published through CSIR-NIScPR.</p></div>
    {publications.length === 0 ? <div className="mx-auto mt-12 max-w-2xl rounded-3xl border bg-slate-50 p-10 text-center text-gray-500">Research highlights will appear here after they are added by an administrator.</div> : <div className="mt-14 grid gap-8 lg:grid-cols-3">{publications.map((item) => <article key={item.id} className="rounded-3xl border p-6 shadow-sm"><p className="text-sm font-medium text-blue-700">{item.category}</p><h3 className="mt-3 text-xl font-bold text-[#003366]">{item.title}</h3><p className="mt-2 text-gray-500">{item.author} · {item.year}</p><p className="mt-4 line-clamp-3 text-gray-600">{item.description}</p><Link to={`/customer/book/${item.id}`} className="mt-6 inline-block font-semibold text-[#003366]">Read more →</Link></article>)}</div>}
    <div className="mt-12 text-center"><Link to="/customer/research" className="rounded-xl border-2 border-[#003366] px-7 py-3 font-semibold text-[#003366]">View all research</Link></div></div></section>;
}

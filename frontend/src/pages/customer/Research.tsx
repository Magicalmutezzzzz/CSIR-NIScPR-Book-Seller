import BookCard from "../../components/customer/BookCard";
import { publicationService } from "../../services/publicationService";

export default function Research() {
  const publications = publicationService.getResearch();
  return <main className="min-h-screen bg-slate-50"><section className="bg-[#003366] px-6 py-16 text-white"><div className="mx-auto max-w-7xl"><h1 className="text-4xl font-bold">Research Articles</h1><p className="mt-3 text-blue-100">Research articles added by CSIR-NIScPR administrators.</p></div></section><div className="mx-auto max-w-7xl px-6 py-12">{publications.length === 0 ? <div className="rounded-3xl bg-white p-14 text-center text-gray-500 shadow">No research articles have been published yet.</div> : <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{publications.map((item) => <BookCard key={item.id} id={item.id} title={item.title} author={item.author} category={item.category} image={item.coverImage} price={item.price} stock={item.stock} year={item.year} />)}</div>}</div></main>;
}

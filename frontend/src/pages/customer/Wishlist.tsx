import { Link } from "react-router-dom";
import { customerDataService } from "../../services/customerDataService";
import { publicationService } from "../../services/publicationService";
import { Empty } from "./Cart";

export default function Wishlist() {
  const publications = customerDataService.getWishlist().flatMap((id) => { const item = publicationService.getById(id); return item ? [item] : []; });
  return <main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-bold text-[#003366]">Wishlist</h1>{publications.length === 0 ? <Empty message="Your wishlist is empty." /> : <div className="mt-8 grid gap-5 sm:grid-cols-2">{publications.map((item) => <article key={item.id} className="rounded-2xl border bg-white p-5"><h2 className="font-semibold text-[#003366]">{item.title}</h2><p className="mt-1 text-sm text-gray-500">{item.author}</p><p className="mt-3 font-semibold">{item.price}</p><div className="mt-4 flex gap-4"><Link to={`/customer/book/${item.id}`} className="text-sm font-medium text-[#003366]">View</Link><button onClick={() => { customerDataService.toggleWishlist(item.id); window.location.reload(); }} className="text-sm text-red-600">Remove</button></div></article>)}</div>}</main>;
}

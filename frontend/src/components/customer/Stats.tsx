import { BookOpen, FileText, Newspaper } from "lucide-react";
import { publicationService } from "../../services/publicationService";

export default function Stats() {
  const publications = publicationService.getAll();
  const stats = [
    { title: "Publications", value: publications.length, icon: BookOpen },
    { title: "Research Articles", value: publications.filter((item) => item.type === "Research").length, icon: FileText },
    { title: "Journals", value: publications.filter((item) => item.type === "Journal").length, icon: Newspaper },
  ];
  return <section className="bg-[#003366] py-20"><div className="mx-auto max-w-7xl px-6"><div className="text-center"><h2 className="text-4xl font-bold text-white">Catalogue at a glance</h2><p className="mt-4 text-blue-100">Live totals from the publications managed by CSIR-NIScPR.</p></div><div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3">{stats.map((stat) => { const Icon = stat.icon; return <div key={stat.title} className="rounded-3xl bg-white/10 p-8 text-center"><Icon className="mx-auto text-white" size={34} /><p className="mt-5 text-4xl font-bold text-white">{stat.value}</p><p className="mt-2 text-blue-100">{stat.title}</p></div>; })}</div></div></section>;
}

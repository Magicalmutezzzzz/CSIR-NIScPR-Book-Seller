import {
  BookOpen,
  Newspaper,
  ScrollText,
  ShoppingCart,
} from "lucide-react";
import { publicationService } from "../../services/publicationService";

export default function DashboardHero() {
  const publications = publicationService.getAll();
  const cards = [
    {
      title: "Books",
      value: String(publications.filter((item) => item.type === "Book").length),
      icon: BookOpen,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Journals",
      value: String(publications.filter((item) => item.type === "Journal").length),
      icon: Newspaper,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Magazines",
      value: String(publications.filter((item) => item.type === "Magazine").length),
      icon: ScrollText,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Your Cart",
      value: "0",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#003366] to-[#0056B3] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-blue-100 max-w-3xl">
          Explore books, journals, magazines and research publications
          from CSIR–NIScPR.
        </p>

        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-gray-700 font-semibold">
                  {card.title}
                </h3>

                <p className="text-3xl font-bold text-[#003366] mt-2">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

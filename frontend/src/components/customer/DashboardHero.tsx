import { useEffect, useState } from "react";
import {
  BookOpen,
  Newspaper,
  ScrollText,
  ShoppingCart,
} from "lucide-react";

import { publicationService } from "../../services/publicationService";

export default function DashboardHero() {
  const [bookCount, setBookCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [magazineCount, setMagazineCount] = useState(0);

  useEffect(() => {
    const loadPublicationCounts = async () => {
      try {
        const [books, journals, magazines] = await Promise.all([
          publicationService.getBooks(),
          publicationService.getJournals(),
          publicationService.getMagazines(),
        ]);

        setBookCount(books.length);
        setJournalCount(journals.length);
        setMagazineCount(magazines.length);
      } catch (error) {
        console.error(
          "Failed to load publication counts:",
          error
        );
      }
    };

    loadPublicationCounts();
  }, []);

  const cards = [
    {
      title: "Books",
      value: String(bookCount),
      icon: BookOpen,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Journals",
      value: String(journalCount),
      icon: Newspaper,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Magazines",
      value: String(magazineCount),
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
      <div className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-3 max-w-3xl text-blue-100">
          Explore books, journals, magazines and research publications
          from CSIR–NIScPR.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 font-semibold text-gray-700">
                  {card.title}
                </h3>

                <p className="mt-2 text-3xl font-bold text-[#003366]">
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
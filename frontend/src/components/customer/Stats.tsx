import {
  BookOpen,
  FileText,
  Newspaper,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Publications",
    value: "12,500+",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Research Papers",
    value: "8,200+",
    icon: FileText,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Journals",
    value: "450+",
    icon: Newspaper,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Registered Readers",
    value: "1.2 Lakh+",
    icon: Users,
    color: "bg-purple-100 text-purple-700",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#003366] py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-white">
            Our Impact in Numbers
          </h2>

          <p className="mt-4 text-lg text-blue-100">
            Supporting scientific research and knowledge dissemination through
            high-quality publications and digital access.
          </p>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon size={38} />
                </div>

                <h3 className="mt-6 text-4xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-lg text-blue-100">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
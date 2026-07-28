import { Eye, ShoppingCart } from "lucide-react";

const books = [
  {
    title: "Science Reporter",
    price: "₹750",
    image: "https://www.niscpr.res.in/includes/images/researchjournals/science_reporter.jpg",
  },
  {
    title: "Science Diplomacy",
    price: "₹799",
    image: "https://nopr.niscpr.res.in/retrieve/200513",
  },
  {
    title: "Natural Products and Resource Repository",
    price: "₹520",
    image: "https://nopr.niscpr.res.in/retrieve/35099",
  },
  {
    title: "Science ki Duniya",
    price: "₹650",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBsKVXRn96OPgkSg6veEa5fVWvosjpNmu1-tPW7v2P5eU9AvA-xHdU8VI&s=10",
  },
];

export default function Featured() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h2 className="text-4xl font-bold text-[#003366]">
              Featured Publications
            </h2>

            <p className="text-gray-500 mt-2">
              Latest scientific publications from CSIR–NIScPR
            </p>

          </div>

          <button className="bg-[#003366] text-white px-6 py-3 rounded-xl hover:bg-blue-900">
            View All
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {books.map((book) => (

            <div
              key={book.title}
              className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              <img
                src={book.image}
                alt={book.title}
                className="h-80 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="font-bold text-xl">
                  {book.title}
                </h3>

                <p className="text-[#003366] font-bold text-lg mt-3">
                  {book.price}
                </p>

                <div className="flex gap-3 mt-6">

                  <button className="flex-1 bg-[#003366] text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-900">
                    <Eye size={18} />
                    View
                  </button>

                  <button className="flex-1 border border-[#003366] text-[#003366] py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-[#003366] hover:text-white">
                    <ShoppingCart size={18} />
                    Cart
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
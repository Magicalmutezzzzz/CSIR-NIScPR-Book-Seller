import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-[1700px] px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">

          {/* About */}
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              CSIR–NIScPR
            </h2>

            <p className="text-sm leading-7 text-gray-400">
              National Institute of Science Communication and Policy Research
              provides scientific publications, journals, books and knowledge
              resources for researchers, academicians and students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/customer/books"
                  className="transition-colors hover:text-white"
                >
                  Books
                </Link>
              </li>

              <li>
                <Link
                  to="/customer/journals"
                  className="transition-colors hover:text-white"
                >
                  Journals
                </Link>
              </li>

              <li>
                <Link
                  to="/customer/magazines"
                  className="transition-colors hover:text-white"
                >
                  Magazines
                </Link>
              </li>

              <li>
                <Link
                  to="/customer/other-publications"
                  className="transition-colors hover:text-white"
                >
                  Other Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-gray-400">

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>
                  CSIR–National Institute of Science Communication and Policy
                  Research, New Delhi, India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>011-2584 6301</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@csir.res.in</span>
              </div>

            </div>
          </div>

          {/* Our Location */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Our Location
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-700 shadow-lg">
              <iframe
                title="CSIR-NIScPR Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.5138480397695!2d77.17099697581169!3d28.638596475661416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02bf13cc1601%3A0x54cf2bcebd14cf24!2sCSIR%E2%80%93National%20Institute%20Of%20Science%20Communication%20and%20Policy%20Research%20(CSIR%E2%80%93NIScPR)!5e1!3m2!1sen!2sin!4v1785405026008!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-sm text-gray-500">
          © 2026 CSIR–NIScPR Publications Portal. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
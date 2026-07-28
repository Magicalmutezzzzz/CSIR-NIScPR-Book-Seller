import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* About */}
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              CSIR–NIScPR
            </h2>

            <p className="leading-7 text-gray-400">
              National Institute of Science Communication and Policy
              Research provides scientific publications, journals,
              books and knowledge resources for researchers,
              academicians and students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/auth/login" className="hover:text-white">
                  Publications
                </Link>
              </li>

              <li>
                <Link to="/auth/login" className="hover:text-white">
                  Journals
                </Link>
              </li>

              <li>
                <Link to="/auth/login" className="hover:text-white">
                  Magazines
                </Link>
              </li>

              <li>
                <Link to="/auth/login" className="hover:text-white">
                  Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex gap-3">
                <MapPin size={20} />
                New Delhi, India
              </div>

              <div className="flex gap-3">
                <Phone size={20} />
                +91-XXXXXXXXXX
              </div>

              <div className="flex gap-3">
                <Mail size={20} />
                info@csir.res.in
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-500">
          © 2026 CSIR–NIScPR Publications Portal. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#003366] to-[#0056B3] p-10 md:p-14">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <Mail size={32} className="text-white" />
              </div>

              <h2 className="text-4xl font-bold text-white">
                Stay Updated
              </h2>

              <p className="mt-5 text-lg leading-8 text-blue-100">
                Subscribe to receive notifications about newly published books,
                journals, magazines, research articles, and other scientific
                publications from CSIR-NIScPR.
              </p>

            </div>

            <div>

              <form className="space-y-5">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl border-0 bg-white px-6 py-4 text-gray-700 outline-none ring-2 ring-transparent transition focus:ring-blue-300"
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-[#003366] transition hover:bg-gray-100"
                >
                  <Send size={20} />
                  Subscribe Now
                </button>

              
                    <div className="space-y-3 text-sm text-blue-100">

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    Latest books, journals and magazines
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    Research highlights and scientific updates
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    Special announcements and publication releases
                  </div>

                </div>

                <p className="mt-6 text-sm leading-6 text-blue-100">
                  We respect your privacy. Your email will only be used to send
                  updates related to CSIR-NIScPR publications and you can
                  unsubscribe at any time.
                </p>

                </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
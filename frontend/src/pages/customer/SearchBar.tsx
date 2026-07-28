export default function SearchBar() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <input
          type="text"
          placeholder="Search publications..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
      </div>
    </section>
  );
}
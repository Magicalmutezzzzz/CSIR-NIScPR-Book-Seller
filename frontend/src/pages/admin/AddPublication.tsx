import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { publicationService } from "../../services/publicationService";
import type { PublicationType } from "../../types/publication";

const publicationTypes: PublicationType[] = [
  "Book", "Journal", "Magazine", "Research", "Other",
];

export default function AddPublication() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", author: "", type: "Book" as PublicationType, category: "",
    description: "", language: "English", isbn: "", pages: "", year: "",
    price: "", stock: "", coverImage: "", featured: false,
  });

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publicationService.create({
      ...form,
      pages: Number(form.pages) || 0,
      year: Number(form.year) || new Date().getFullYear(),
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
    });
    navigate("/admin/publications");
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#003366]">Add publication</h1>
        <p className="mt-2 text-gray-500">Add a real catalogue item for customers to browse.</p>
      </div>
      <div className="grid gap-6 rounded-3xl border bg-white p-6 shadow-sm md:grid-cols-2">
        <Field label="Title" value={form.title} onChange={(value) => update("title", value)} required />
        <Field label="Author" value={form.author} onChange={(value) => update("author", value)} required />
        <label className="space-y-2 text-sm font-medium text-gray-700">Publication type
          <select value={form.type} onChange={(event) => update("type", event.target.value)} className="w-full rounded-xl border p-3">
            {publicationTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <Field label="Category" value={form.category} onChange={(value) => update("category", value)} required />
        <Field label="Language" value={form.language} onChange={(value) => update("language", value)} required />
        <Field label="ISBN / ISSN" value={form.isbn} onChange={(value) => update("isbn", value)} />
        <Field label="Publication year" type="number" value={form.year} onChange={(value) => update("year", value)} />
        <Field label="Pages" type="number" value={form.pages} onChange={(value) => update("pages", value)} />
        <Field label="Price (₹)" type="number" value={form.price} onChange={(value) => update("price", value)} />
        <Field label="Stock" type="number" value={form.stock} onChange={(value) => update("stock", value)} />
        <Field label="Cover image URL" value={form.coverImage} onChange={(value) => update("coverImage", value)} />
        <label className="flex items-center gap-3 self-end rounded-xl border p-3 text-sm font-medium text-gray-700">
          <input type="checkbox" checked={form.featured} onChange={(event) => update("featured", event.target.checked)} /> Feature on home page
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-700 md:col-span-2">Description
          <textarea value={form.description} onChange={(event) => update("description", event.target.value)} required rows={5} className="w-full rounded-xl border p-3" />
        </label>
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => navigate(-1)} className="rounded-xl border px-5 py-3 font-medium">Cancel</button>
        <button type="submit" className="rounded-xl bg-[#003366] px-5 py-3 font-medium text-white hover:bg-[#002855]">Publish publication</button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="space-y-2 text-sm font-medium text-gray-700">{label}
    <input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border p-3" />
  </label>;
}

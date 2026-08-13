import { useEffect, useState } from "react";

import { categoryService } from "../../services/categoryService";
import type { Category } from "../../types/category";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-[#003366]">
        Categories
      </h1>

      <div className="rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Active</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-t"
              >
                <td className="p-4">{category.name}</td>

                <td className="p-4">
                  {category.description}
                </td>

                <td className="p-4">
                  {category.is_active ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
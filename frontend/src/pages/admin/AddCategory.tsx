import { useState } from "react";
import { ArrowLeft, FolderPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "BookOpen",
    color: "#003366",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("New Category:", formData);

    alert("Category added successfully!");

    setFormData({
      name: "",
      description: "",
      icon: "BookOpen",
      color: "#003366",
      status: "Active",
    });
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#003366]">
            Add Category
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new publication category.
          </p>

        </div>

        <Link
          to="/admin/categories"
          className="flex items-center gap-2 rounded-xl border px-5 py-3 transition hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">

            <FolderPlus
              size={34}
              className="text-[#003366]"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#003366]">
              Category Information
            </h2>

            <p className="text-gray-500">
              Fill in the details below.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div className="grid gap-6 md:grid-cols-2">
                        {/* Category Name */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
                required
              />

            </div>

            {/* Icon */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Icon
              </label>

              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
              >
                <option value="BookOpen">Book</option>
                <option value="Newspaper">Journal</option>
                <option value="Library">Library</option>
                <option value="FileText">Research Paper</option>
                <option value="ScrollText">Magazine</option>
              </select>

            </div>

            {/* Theme Color */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Theme Color
              </label>

              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="h-14 w-full cursor-pointer rounded-xl border p-2"
              />

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>
                    {/* Description */}

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter a short description for this category..."
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]"
              />

              <div className="mt-2 flex justify-between text-sm text-gray-500">

                <span>
                  This description will appear in the admin panel.
                </span>

                <span>
                  {formData.description.length}/250
                </span>

              </div>

            </div>

            {/* Preview */}

            <div className="md:col-span-2">

              <label className="mb-3 block font-medium text-gray-700">
                Live Preview
              </label>

              <div className="rounded-2xl border bg-gray-50 p-6">

                <div className="flex items-center gap-4">

                  <div
                    className="h-14 w-14 rounded-2xl"
                    style={{ backgroundColor: formData.color }}
                  />

                  <div>

                    <h3 className="text-xl font-semibold text-[#003366]">
                      {formData.name || "Category Name"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {formData.description ||
                        "Category description will appear here."}
                    </p>

                    <span
                      className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        formData.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {formData.status}
                    </span>

                  </div>

                </div>

              </div>

            </div>

                    {/* Display Settings */}

            <div className="md:col-span-2">

              <h3 className="mb-4 text-xl font-semibold text-[#003366]">
                Display Settings
              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <label className="flex items-center justify-between rounded-2xl border p-4">

                  <div>

                    <p className="font-medium text-[#003366]">
                      Show on Homepage
                    </p>

                    <p className="text-sm text-gray-500">
                      Display this category on the public homepage.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#003366]"
                    defaultChecked
                  />

                </label>

                <label className="flex items-center justify-between rounded-2xl border p-4">

                  <div>

                    <p className="font-medium text-[#003366]">
                      Featured Category
                    </p>

                    <p className="text-sm text-gray-500">
                      Highlight this category in featured sections.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#003366]"
                  />

                </label>

              </div>

            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex justify-end gap-4 border-t pt-6">

            <Link
              to="/admin/categories"
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[#003366] px-6 py-3 font-medium text-white transition hover:bg-[#002855]"
            >
              Save Category
            </button>

          </div>
                </form>

      </div>

    </div>
  );
}
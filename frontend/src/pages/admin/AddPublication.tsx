import { useState } from "react";
import {
  Save,
  Eye,
  Upload,
  BookOpen,
  FileText,
  FileSpreadsheet,
} from "lucide-react";

export default function AddPublication() {
  const [publicationType, setPublicationType] = useState("Book");

  const [status, setStatus] = useState("Draft");

  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [homepage, setHomepage] = useState(false);
  const [newArrival, setNewArrival] = useState(false);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-3xl font-bold text-[#003366]">
              Add Publication
            </h1>

            <p className="text-gray-500 mt-2">
              Create Books, Journals, Magazines, Research Articles and Other Publications.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              className="flex items-center gap-2 border rounded-xl px-6 py-3 hover:bg-gray-100"
            >
              <Eye size={18} />
              Preview
            </button>

            <button
              className="flex items-center gap-2 bg-[#003366] text-white rounded-xl px-6 py-3 hover:bg-[#00254d]"
            >
              <Save size={18} />
              Save Draft
            </button>

          </div>

        </div>

      </div>

      {/* BASIC INFORMATION */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-semibold">
              Publication Type
            </label>

            <select
              value={publicationType}
              onChange={(e) =>
                setPublicationType(e.target.value)
              }
              className="w-full border rounded-xl p-3"
            >
              <option>Book</option>

              <option>Journal</option>

              <option>Magazine</option>

              <option>Research Article</option>

              <option>Other Publication</option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Publication Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full border rounded-xl p-3"
            >

              <option>Draft</option>

              <option>Pending Review</option>

              <option>Published</option>

              <option>Archived</option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Title
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Publication Title"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Subtitle
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Subtitle"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Category
            </label>

            <select className="w-full border rounded-xl p-3">

              <option>Select Category</option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Publisher
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Publisher"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Author
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Author"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Language
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="English"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Publication Date
            </label>

            <input
              type="date"
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Edition
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Edition"
            />

          </div>

        </div>

      </div>
          {/* DESCRIPTION */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Description
        </h2>

        <div className="space-y-6">

          <div>

            <label className="block mb-2 font-semibold">
              Short Description
            </label>

            <textarea
              rows={3}
              className="w-full border rounded-xl p-4"
              placeholder="Short Description"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Full Description
            </label>

            <textarea
              rows={8}
              className="w-full border rounded-xl p-4"
              placeholder="Detailed Description"
            />

          </div>

        </div>

      </div>

      {/* PRICING */}

      {publicationType !== "Magazine" && (

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Pricing
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div>

            <label className="block mb-2 font-semibold">
              MRP
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="₹"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Selling Price
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="₹"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Discount %
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="0"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              GST %
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="18"
            />

          </div>

        </div>

      </div>
      )}
      {/* INVENTORY */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Inventory
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <label className="block mb-2 font-semibold">
              Stock Quantity
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="0"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Low Stock Alert
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="10"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              SKU
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="SKU-001"
            />

          </div>

        </div>

      </div>

      {/* DYNAMIC PUBLICATION DETAILS */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Publication Details
        </h2>

        {publicationType === "Book" && (

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <input
              className="border rounded-xl p-3"
              placeholder="ISBN"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Pages"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Binding"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Weight"
            />

          </div>

        )}

        {publicationType === "Journal" && (

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <input
              className="border rounded-xl p-3"
              placeholder="ISSN"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Volume"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Issue"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Year"
            />

          </div>

        )}

        {publicationType === "Magazine" && (

            <div className="space-y-8">

              <h3 className="text-xl font-bold text-[#003366]">
                Magazine Subscription Plans
              </h3>

              <div className="grid md:grid-cols-3 gap-6">

                {/* 1 Year */}

                <div className="border rounded-2xl p-6 shadow-sm">

                  <h4 className="font-bold text-lg mb-5">
                    1 Year Subscription
                  </h4>

                  <label className="block mb-2 font-medium">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="₹ 999"
                    className="w-full border rounded-xl p-3"
                  />

                </div>

                {/* 2 Years */}

                <div className="border rounded-2xl p-6 shadow-sm">

                  <h4 className="font-bold text-lg mb-5">
                    2 Years Subscription
                  </h4>

                  <label className="block mb-2 font-medium">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="₹ 1799"
                    className="w-full border rounded-xl p-3"
                  />

                </div>

                {/* 3 Years */}

                <div className="border rounded-2xl p-6 shadow-sm">

                  <h4 className="font-bold text-lg mb-5">
                    3 Years Subscription
                  </h4>

                  <label className="block mb-2 font-medium">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="₹ 2499"
                    className="w-full border rounded-xl p-3"
                  />

                </div>

              </div>

            </div>

            )}

        {publicationType === "Research Article" && (

          <div className="grid md:grid-cols-2 gap-6">

            <input
              className="border rounded-xl p-3"
              placeholder="DOI"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Keywords"
            />

            <textarea
              rows={5}
              className="border rounded-xl p-3 md:col-span-2"
              placeholder="Abstract"
            />

          </div>

        )}

      </div>
            {/* IMAGES */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Images
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Cover */}

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#003366] transition">

            <Upload size={40} className="mx-auto text-gray-400 mb-4" />

            <h3 className="font-semibold mb-2">
              Cover Image
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              JPG, PNG (Max 5 MB)
            </p>

            <input type="file" />

          </div>

          {/* Back Cover */}

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#003366] transition">

            <Upload size={40} className="mx-auto text-gray-400 mb-4" />

            <h3 className="font-semibold mb-2">
              Back Cover
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              JPG, PNG (Max 5 MB)
            </p>

            <input type="file" />

          </div>

          {/* Thumbnail */}

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#003366] transition">

            <Upload size={40} className="mx-auto text-gray-400 mb-4" />

            <h3 className="font-semibold mb-2">
              Thumbnail
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              JPG, PNG
            </p>

            <input type="file" />

          </div>

        </div>

      </div>

      {/* GALLERY */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Gallery Images
        </h2>

        <div className="grid md:grid-cols-5 gap-5">

          {[1,2,3,4,5].map((item)=>(
            <div
              key={item}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#003366] transition"
            >

              <Upload
                size={30}
                className="mx-auto text-gray-400 mb-3"
              />

              <p className="text-sm mb-3">
                Image {item}
              </p>

              <input type="file"/>

            </div>
          ))}

        </div>

      </div>

      {/* PDF FILES */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          PDF Files
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="border rounded-2xl p-6">

            <FileText
              size={35}
              className="text-red-500 mb-4"
            />

            <h3 className="font-semibold mb-3">
              Preview PDF
            </h3>

            <input type="file" />

          </div>

          <div className="border rounded-2xl p-6">

            <BookOpen
              size={35}
              className="text-blue-600 mb-4"
            />

            <h3 className="font-semibold mb-3">
              Complete PDF
            </h3>

            <input type="file" />

          </div>

          <div className="border rounded-2xl p-6">

            <FileSpreadsheet
              size={35}
              className="text-green-600 mb-4"
            />

            <h3 className="font-semibold mb-3">
              Sample Chapter
            </h3>

            <input type="file" />

          </div>

        </div>

      </div>

      {/* EXTRA DOCUMENTS */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Supporting Documents
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block font-semibold mb-2">
              Copyright Certificate
            </label>

            <input
              type="file"
              className="w-full"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Additional Attachment
            </label>

            <input
              type="file"
              className="w-full"
            />

          </div>

        </div>

      </div>

            {/* SEO */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          SEO Settings
        </h2>

        <div className="grid gap-6">

          <div>

            <label className="block font-semibold mb-2">
              Meta Title
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Meta Title"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Meta Description
            </label>

            <textarea
              rows={4}
              className="w-full border rounded-xl p-3"
              placeholder="Meta Description"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              URL Slug
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="publication-name"
            />

          </div>

        </div>

      </div>

      {/* HOMEPAGE SETTINGS */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Homepage Settings
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

            <input
              type="checkbox"
              checked={featured}
              onChange={() => setFeatured(!featured)}
            />

            Featured Publication

          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

            <input
              type="checkbox"
              checked={bestSeller}
              onChange={() => setBestSeller(!bestSeller)}
            />

            Bestseller

          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

            <input
              type="checkbox"
              checked={homepage}
              onChange={() => setHomepage(!homepage)}
            />

            Show on Homepage

          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

            <input
              type="checkbox"
              checked={newArrival}
              onChange={() => setNewArrival(!newArrival)}
            />

            New Arrival

          </label>

        </div>

      </div>

      {/* REVIEW WORKFLOW */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-[#003366] mb-8">
          Review Workflow
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block font-semibold mb-2">
              Reviewer
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Reviewer Name"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Approval Notes
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Optional"
            />

          </div>

        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        <div className="flex flex-wrap justify-end gap-4">

          <button
            className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition"
          >
            Save Draft
          </button>

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Send For Review
          </button>

          <button
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Publish
          </button>

        </div>

      </div>

    </div>
  );
}

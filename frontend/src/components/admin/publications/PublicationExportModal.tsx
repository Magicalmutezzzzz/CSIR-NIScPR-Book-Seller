import { useState } from "react";
import {
  X,
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";

interface PublicationExportModalProps {
  open: boolean;
  onClose: () => void;
  onExport?: (options: ExportOptions) => void;
}

type ExportFormat =
  | "pdf"
  | "csv"
  | "excel";

type ExportScope =
  | "current"
  | "filtered"
  | "all";

interface ExportOptions {
  format: ExportFormat;
  scope: ExportScope;
  fromDate: string;
  toDate: string;
  publicationType: string;
  status: string;
  includeImages: boolean;
}

export default function PublicationExportModal({
  open,
  onClose,
  onExport,
}: PublicationExportModalProps) {
  const [options, setOptions] =
    useState<ExportOptions>({
      format: "pdf",
      scope: "filtered",
      fromDate: "",
      toDate: "",
      publicationType: "All",
      status: "All",
      includeImages: true,
    });

  if (!open) return null;

  const handleChange = (
    field: keyof ExportOptions,
    value: string | boolean
  ) => {
    setOptions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExport = () => {
    if (onExport) {
      onExport(options);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold text-[#003366]">
              Export Publications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Export publication reports in multiple formats.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-8">

          {/* Export Format */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-[#003366]">
              Export Format
            </h3>

            <div className="grid gap-5 md:grid-cols-3">

              <button
                type="button"
                onClick={() =>
                  handleChange("format", "pdf")
                }
                className={`rounded-2xl border p-5 transition ${
                  options.format === "pdf"
                    ? "border-red-500 bg-red-50"
                    : "hover:bg-gray-50"
                }`}
              >

                <FileText
                  size={38}
                  className="mx-auto mb-4 text-red-600"
                />

                <h4 className="font-semibold">
                  PDF
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Best for printing and sharing.
                </p>

              </button>

              <button
                type="button"
                onClick={() =>
                  handleChange("format", "csv")
                }
                className={`rounded-2xl border p-5 transition ${
                  options.format === "csv"
                    ? "border-green-500 bg-green-50"
                    : "hover:bg-gray-50"
                }`}
              >

                <FileSpreadsheet
                  size={38}
                  className="mx-auto mb-4 text-green-600"
                />

                <h4 className="font-semibold">
                  CSV
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Compatible with Excel.
                </p>

              </button>

              <button
                type="button"
                onClick={() =>
                  handleChange("format", "excel")
                }
                className={`rounded-2xl border p-5 transition ${
                  options.format === "excel"
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >

                <File
                  size={38}
                  className="mx-auto mb-4 text-blue-600"
                />

                <h4 className="font-semibold">
                  Excel
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Native spreadsheet format.
                </p>

              </button>

            </div>

          </div>

                    {/* Export Scope */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-[#003366]">
              Export Scope
            </h3>

            <div className="grid gap-4 md:grid-cols-3">

              {[
                {
                  label: "Current Page",
                  value: "current",
                },
                {
                  label: "Filtered Results",
                  value: "filtered",
                },
                {
                  label: "All Publications",
                  value: "all",
                },
              ].map((scope) => (

                <button
                  key={scope.value}
                  type="button"
                  onClick={() =>
                    handleChange(
                      "scope",
                      scope.value as ExportScope
                    )
                  }
                  className={`rounded-xl border p-4 font-medium transition ${
                    options.scope === scope.value
                      ? "border-[#003366] bg-blue-50 text-[#003366]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {scope.label}
                </button>

              ))}

            </div>

          </div>

          {/* Filters */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-lg font-semibold text-[#003366]">
              Export Filters
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  From Date
                </label>

                <input
                  type="date"
                  value={options.fromDate}
                  onChange={(e) =>
                    handleChange(
                      "fromDate",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  To Date
                </label>

                <input
                  type="date"
                  value={options.toDate}
                  onChange={(e) =>
                    handleChange(
                      "toDate",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Publication Type
                </label>

                <select
                  value={options.publicationType}
                  onChange={(e) =>
                    handleChange(
                      "publicationType",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                >
                  <option>All</option>
                  <option>Book</option>
                  <option>Journal</option>
                  <option>Magazine</option>
                  <option>Research Article</option>
                  <option>Other Publication</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Publication Status
                </label>

                <select
                  value={options.status}
                  onChange={(e) =>
                    handleChange(
                      "status",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                >
                  <option>All</option>
                  <option>Draft</option>
                  <option>Pending Review</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>

              </div>

            </div>

          </div>

          {/* Export Options */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-lg font-semibold text-[#003366]">
              Additional Options
            </h3>

            <label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

              <div>

                <p className="font-semibold">
                  Include Publication Images
                </p>

                <p className="text-sm text-gray-500">
                  Include cover images in the exported report.
                </p>

              </div>

              <input
                type="checkbox"
                checked={options.includeImages}
                onChange={(e) =>
                  handleChange(
                    "includeImages",
                    e.target.checked
                  )
                }
                className="h-5 w-5 accent-[#003366]"
              />

            </label>

          </div>

                  {/* Export Summary */}

          <div className="rounded-2xl border bg-gray-50 p-6">

            <h3 className="mb-5 text-lg font-semibold text-[#003366]">
              Export Summary
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Export Format
                </p>

                <p className="mt-1 font-semibold capitalize">
                  {options.format}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Export Scope
                </p>

                <p className="mt-1 font-semibold capitalize">
                  {options.scope}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Publication Type
                </p>

                <p className="mt-1 font-semibold">
                  {options.publicationType}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="mt-1 font-semibold">
                  {options.status}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Date Range
                </p>

                <p className="mt-1 font-semibold">

                  {options.fromDate || "Any"}

                  {"  "}to{"  "}

                  {options.toDate || "Any"}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Images Included
                </p>

                <p className="mt-1 font-semibold">

                  {options.includeImages
                    ? "Yes"
                    : "No"}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t px-8 py-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExport}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition ${
              options.format === "pdf"
                ? "bg-red-600 hover:bg-red-700"
                : options.format === "csv"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#003366] hover:bg-[#002855]"
            }`}
          >

            {options.format === "pdf" ? (
              <FileText size={18} />
            ) : options.format === "csv" ? (
              <FileSpreadsheet size={18} />
            ) : (
              <File size={18} />
            )}

            Export{" "}

            {options.format.toUpperCase()}

          </button>

        </div>

      </div>

    </div>

  );
}
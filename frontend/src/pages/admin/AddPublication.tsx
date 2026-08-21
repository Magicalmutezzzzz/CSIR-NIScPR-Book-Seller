import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import api from "../../api/axios";
import { getCategories } from "../../api/categories";
import { getPublicationTypes } from "../../api/publicationTypes";
import { createPublicationImage } from "../../api/publicationImages";
import { createSubscriptionPlan } from "../../api/subscriptionPlans";

import type { PublicationType as ApiPublicationType } from "../../api/publicationTypes";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order?: number;
  is_active?: boolean;
}

type FormPublicationType =
  | "Book"
  | "Journal"
  | "Magazine"
  | "Research"
  | "Other";

interface FormState {
  title: string;
  author: string;
  publicationTypeId: string;
  categoryId: string;

  year: string;

  price: string;
  stock: string;

  description: string;

  isbn: string;
  issn: string;

  language: string;

  coverImage: string;

  page1: string;
  page2: string;
  page3: string;
  page4: string;
  page5: string;

  featured: boolean;

  subscription1Year: string;
  subscription2Year: string;
  subscription3Year: string;
}

const SUBSCRIPTION_TYPES: FormPublicationType[] = [
  "Journal",
  "Magazine",
  "Research",
];

export default function AddPublication() {
  const navigate = useNavigate();

  const [publicationTypes, setPublicationTypes] = useState<
    ApiPublicationType[]
  >([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [loadingOptions, setLoadingOptions] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setForm] = useState<FormState>({
    title: "",
    author: "",
    publicationTypeId: "",
    categoryId: "",

    year: new Date().getFullYear().toString(),

    price: "",
    stock: "0",

    description: "",

    isbn: "",
    issn: "",

    language: "English",

    coverImage: "",

    page1: "",
    page2: "",
    page3: "",
    page4: "",
    page5: "",

    featured: false,

    subscription1Year: "",
    subscription2Year: "",
    subscription3Year: "",
  });

  /*
   * Load publication types and categories
   */
  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoadingOptions(true);
        setError("");

        const [
          publicationTypesData,
          categoriesData,
        ] = await Promise.all([
          getPublicationTypes(),
          getCategories(),
        ]);

        setPublicationTypes(
          publicationTypesData,
        );

        setCategories(
          categoriesData.filter(
            (category: Category) =>
              category.is_active !== false,
          ),
        );

        /*
         * Automatically select the first
         * publication type if available.
         */
        if (publicationTypesData.length > 0) {
          setForm((current) => ({
            ...current,
            publicationTypeId:
              current.publicationTypeId ||
              publicationTypesData[0].id,
          }));
        }
      } catch (err) {
        console.error(
          "Failed to load publication options:",
          err,
        );

        setError(
          "Failed to load publication types or categories.",
        );
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  /*
   * Find selected publication type
   */
  const selectedPublicationType =
    publicationTypes.find(
      (type) =>
        type.id === form.publicationTypeId,
    );

  const selectedTypeName =
    selectedPublicationType?.name ||
    "";

  const isSubscriptionPublication =
    SUBSCRIPTION_TYPES.includes(
      selectedTypeName as FormPublicationType,
    );

  const isBookOrOther =
    selectedTypeName === "Book" ||
    selectedTypeName === "Other";

  /*
   * Update form
   */
  const update = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
   * Submit
   */
  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");
    setSuccess("");

    /*
     * Basic validation
     */
    if (!form.title.trim()) {
      setError("Please enter the publication title.");
      return;
    }

    if (!form.publicationTypeId) {
      setError(
        "Please select a publication type.",
      );
      return;
    }

    if (!form.categoryId) {
      setError("Please select a category.");
      return;
    }

    if (!form.year) {
      setError(
        "Please enter the publication year.",
      );
      return;
    }

    if (!form.description.trim()) {
      setError(
        "Please enter the publication description.",
      );
      return;
    }

    /*
     * At least four page/image URLs are required.
     */
    const pageUrls = [
      form.page1.trim(),
      form.page2.trim(),
      form.page3.trim(),
      form.page4.trim(),
      form.page5.trim(),
    ].filter(Boolean);

    if (pageUrls.length < 4) {
      setError(
        "Please provide at least 4 page/image links.",
      );
      return;
    }

    /*
     * Subscription validation
     */
    if (isSubscriptionPublication) {
      if (
        !form.subscription1Year ||
        !form.subscription2Year ||
        !form.subscription3Year
      ) {
        setError(
          "Please enter prices for 1 year, 2 years and 3 years.",
        );
        return;
      }

      if (
        Number(form.subscription1Year) <= 0 ||
        Number(form.subscription2Year) <= 0 ||
        Number(form.subscription3Year) <= 0
      ) {
        setError(
          "Subscription prices must be greater than zero.",
        );
        return;
      }
    }

    try {
      setSubmitting(true);

      /*
       * Generate slug.
       *
       * The backend also generates a slug,
       * but the frontend sends a valid value because
       * PublicationCreate currently requires slug.
       */
      const slug = createSlug(form.title);

      /*
       * IMPORTANT:
       *
       * Book / Other:
       *     ISBN is used.
       *
       * Journal / Magazine / Research:
       *     ISSN is used.
       */
      const isbn =
        isBookOrOther &&
        form.isbn.trim()
          ? form.isbn.trim()
          : null;

      const issn =
        isSubscriptionPublication &&
        form.issn.trim()
          ? form.issn.trim()
          : null;

      /*
       * Publication base price.
       *
       * Subscription publications use their
       * subscription plans for actual pricing.
       *
       * The publications table still requires
       * a price, so we use 0 for subscription
       * publications.
       */
      const publicationPrice =
        isSubscriptionPublication
          ? 0
          : Number(form.price);

      /*
       * Create publication
       */

      console.log("Selected Type ID:", form.publicationTypeId);
      console.log("Selected Type:", selectedTypeName);

      const publicationResponse =
        await api.post(
          "/publications",
          {
            title: form.title.trim(),

            subtitle: null,

            slug,

            description:
              form.description.trim(),

            author:
              form.author.trim() || null,

            keywords: null,

            publication_type_id:
              form.publicationTypeId,

            publisher_id: null,

            isbn,

            issn,

            doi: null,

            sku: null,

            price: publicationPrice,

            discount_price: null,

            stock: isSubscriptionPublication
              ? 0
              : Number(form.stock) || 0,

            language:
              form.language.trim() ||
              "English",

            format: null,

            edition: null,

            pages: null,

            publication_date:
              `${form.year}-01-01`,

            cover_image:
              form.coverImage.trim() ||
              null,

            pdf_preview: null,

            is_featured:
              form.featured,

            is_active: true,
          },
        );

      const publication =
        publicationResponse.data;

      const publicationId =
        publication.id;

      /*
       * Safety check
       */
      if (!publicationId) {
        throw new Error(
          "Publication was created but no publication ID was returned.",
        );
      }

      /*
       * Assign selected category
       */
      await api.post(
        "/publication-categories",
        {
          publication_id: publicationId,
          category_id: form.categoryId,
        },
      );

      /*
       * Create publication images.
       *
       * First image is marked primary.
       */
      await Promise.all(
        pageUrls.map(
          (imageUrl, index) =>
            createPublicationImage({
              publication_id:
                publicationId,

              image_url: imageUrl,

              alt_text:
                `${form.title} - Page ${index + 1}`,

              display_order:
                index + 1,

              is_primary:
                index === 0,
            }),
        ),
      );

      /*
       * Create subscription plans
       */
      if (isSubscriptionPublication) {
        await Promise.all([
          createSubscriptionPlan({
            publication_id:
              publicationId,

            duration_years: 1,

            price: Number(
              form.subscription1Year,
            ),

            is_active: true,
          }),

          createSubscriptionPlan({
            publication_id:
              publicationId,

            duration_years: 2,

            price: Number(
              form.subscription2Year,
            ),

            is_active: true,
          }),

          createSubscriptionPlan({
            publication_id:
              publicationId,

            duration_years: 3,

            price: Number(
              form.subscription3Year,
            ),

            is_active: true,
          }),
        ]);
      }

      /*
       * Everything succeeded.
       */
      setSuccess(
        "Publication created successfully.",
      );

      /*
       * Give the success message a moment
       * before navigating.
       */
      setTimeout(() => {
        navigate("/admin/publications");
      }, 800);
    
    } catch (err: unknown) {
      console.error(
        "Failed to create publication:",
        err,
      );

      let message =
        "Failed to create publication.";

      /*
      * Handle Axios errors returned by FastAPI.
      */
      if (isAxiosError(err)) {
        const detail = err.response?.data?.detail;

        /*
        * FastAPI validation errors normally
        * return an array like:
        *
        * [
        *   {
        *     "loc": [...],
        *     "msg": "...",
        *     "type": "..."
        *   }
        * ]
        */
        if (Array.isArray(detail)) {
          message = detail
            .map((item: unknown) => {
              if (
                typeof item === "object" &&
                item !== null &&
                "msg" in item
              ) {
                const validationItem =
                  item as { msg?: string };

                return (
                  validationItem.msg ||
                  "Validation error"
                );
              }

              return "Validation error";
            })
            .join(", ");
        }

        /*
        * FastAPI can also return:
        *
        * {
        *   "detail": "Some error"
        * }
        */
        else if (
          typeof detail === "string"
        ) {
          message = detail;
        }

        /*
        * If Axios received a response but
        * there was no useful FastAPI detail.
        */
        else if (err.response?.status) {
          message =
            `Request failed with status ${err.response.status}.`;
        }
      }

      /*
      * Non-Axios JavaScript errors.
      */
      else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOptions) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
          <div className="text-lg font-semibold text-[#003366]">
            Loading publication options...
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Loading publication types and
            categories from PostgreSQL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-6xl space-y-6"
    >
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <div>
        <h1 className="text-3xl font-bold text-[#003366]">
          Add Publication
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new CSIR-NIScPR publication
          to the catalogue.
        </p>
      </div>

      {/* ============================= */}
      {/* ERROR */}
      {/* ============================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* ============================= */}
      {/* SUCCESS */}
      {/* ============================= */}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      {/* ============================= */}
      {/* BASIC INFORMATION */}
      {/* ============================= */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#003366]">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the main details of the
            publication.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <Field
            label="Title"
            value={form.title}
            onChange={(value) =>
              update("title", value)
            }
            required
            placeholder="Enter publication title"
          />

          {/* Author */}
          <Field
            label="Author"
            value={form.author}
            onChange={(value) =>
              update("author", value)
            }
            placeholder="Enter author name"
          />

          {/* Publication Type */}
          <label className="space-y-2 text-sm font-medium text-gray-700">
            <span>
              Publication Type
              <span className="text-red-500">
                {" "}
                *
              </span>
            </span>

            <select
              value={
                form.publicationTypeId
              }
              onChange={(event) =>
                update(
                  "publicationTypeId",
                  event.target.value,
                )
              }
              required
              className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10"
            >
              <option value="">
                Select publication type
              </option>

              {publicationTypes.map(
                (type) => (
                  <option
                    key={type.id}
                    value={type.id}
                  >
                    {type.name}
                  </option>
                ),
              )}
            </select>
          </label>

          {/* Category */}
          <label className="space-y-2 text-sm font-medium text-gray-700">
            <span>
              Category
              <span className="text-red-500">
                {" "}
                *
              </span>
            </span>

            <select
              value={form.categoryId}
              onChange={(event) =>
                update(
                  "categoryId",
                  event.target.value,
                )
              }
              required
              className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10"
            >
              <option value="">
                Select category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ),
              )}
            </select>

            <p className="text-xs text-gray-400">
              Categories are loaded from
              PostgreSQL.
            </p>
          </label>

          {/* Year */}
          <Field
            label="Publication Year"
            type="number"
            value={form.year}
            onChange={(value) =>
              update("year", value)
            }
            required
            min="1900"
            max="2100"
          />

          {/* Language */}
          <Field
            label="Language"
            value={form.language}
            onChange={(value) =>
              update("language", value)
            }
            placeholder="English"
          />
        </div>
      </section>

      {/* ============================= */}
      {/* IDENTIFICATION */}
      {/* ============================= */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#003366]">
            Identification
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the ISBN or ISSN associated
            with the publication.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ISBN */}
          {isBookOrOther && (
            <Field
              label="ISBN"
              value={form.isbn}
              onChange={(value) =>
                update("isbn", value)
              }
              placeholder="Enter ISBN"
            />
          )}

          {/* ISSN */}
          {isSubscriptionPublication && (
            <Field
              label="ISSN"
              value={form.issn}
              onChange={(value) =>
                update("issn", value)
              }
              placeholder="Enter ISSN"
            />
          )}
        </div>
      </section>

      {/* ============================= */}
      {/* BOOK / OTHER PRICING */}
      {/* ============================= */}

      {isBookOrOther && (
        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#003366]">
              Publication Pricing
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Price (₹)"
              type="number"
              value={form.price}
              onChange={(value) =>
                update("price", value)
              }
              required
              min="0"
              step="0.01"
              placeholder="Enter price"
            />

            <Field
              label="Stock"
              type="number"
              value={form.stock}
              onChange={(value) =>
                update("stock", value)
              }
              min="0"
              placeholder="Enter stock quantity"
            />
          </div>
        </section>
      )}

      {/* ============================= */}
      {/* SUBSCRIPTION PRICING */}
      {/* ============================= */}

      {isSubscriptionPublication && (
        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#003366]">
              Subscription Pricing
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Set the subscription price for
              each duration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Field
              label="1 Year Price (₹)"
              type="number"
              value={
                form.subscription1Year
              }
              onChange={(value) =>
                update(
                  "subscription1Year",
                  value,
                )
              }
              required
              min="0"
              step="0.01"
              placeholder="₹"
            />

            <Field
              label="2 Year Price (₹)"
              type="number"
              value={
                form.subscription2Year
              }
              onChange={(value) =>
                update(
                  "subscription2Year",
                  value,
                )
              }
              required
              min="0"
              step="0.01"
              placeholder="₹"
            />

            <Field
              label="3 Year Price (₹)"
              type="number"
              value={
                form.subscription3Year
              }
              onChange={(value) =>
                update(
                  "subscription3Year",
                  value,
                )
              }
              required
              min="0"
              step="0.01"
              placeholder="₹"
            />
          </div>
        </section>
      )}

      {/* ============================= */}
      {/* DESCRIPTION */}
      {/* ============================= */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <label className="space-y-2 text-sm font-medium text-gray-700">
          <span>
            Description
            <span className="text-red-500">
              {" "}
              *
            </span>
          </span>

          <textarea
            value={form.description}
            onChange={(event) =>
              update(
                "description",
                event.target.value,
              )
            }
            required
            rows={7}
            placeholder="Enter publication description..."
            className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10"
          />
        </label>
      </section>

      {/* ============================= */}
      {/* COVER IMAGE */}
      {/* ============================= */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#003366]">
            Cover Image
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the URL of the publication
            cover.
          </p>
        </div>

        <Field
          label="Cover Image URL"
          value={form.coverImage}
          onChange={(value) =>
            update("coverImage", value)
          }
          placeholder="https://..."
        />
      </section>

      {/* ============================= */}
      {/* PAGE / PREVIEW IMAGES */}
      {/* ============================= */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#003366]">
            Publication Pages / Preview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add at least 4 page/image links.
            The fifth link is optional.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Page 1 URL"
            value={form.page1}
            onChange={(value) =>
              update("page1", value)
            }
            required
            placeholder="https://..."
          />

          <Field
            label="Page 2 URL"
            value={form.page2}
            onChange={(value) =>
              update("page2", value)
            }
            required
            placeholder="https://..."
          />

          <Field
            label="Page 3 URL"
            value={form.page3}
            onChange={(value) =>
              update("page3", value)
            }
            required
            placeholder="https://..."
          />

          <Field
            label="Page 4 URL"
            value={form.page4}
            onChange={(value) =>
              update("page4", value)
            }
            required
            placeholder="https://..."
          />

          <Field
            label="Page 5 URL (Optional)"
            value={form.page5}
            onChange={(value) =>
              update("page5", value)
            }
            placeholder="https://..."
          />
        </div>
      </section>

      {/* ============================= */}
      {/* FEATURED */}
      {/* ============================= */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) =>
              update(
                "featured",
                event.target.checked,
              )
            }
            className="h-4 w-4"
          />

          Feature this publication on the
          home page
        </label>
      </section>

      {/* ============================= */}
      {/* BUTTONS */}
      {/* ============================= */}

      <div className="flex justify-end gap-3 pb-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={submitting}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            submitting ||
            loadingOptions
          }
          className="rounded-xl bg-[#003366] px-6 py-3 font-semibold text-white transition hover:bg-[#002855] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Publishing..."
            : "Publish Publication"}
        </button>
      </div>
    </form>
  );
}

/*
 * Reusable input
 */
function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  min,
  max,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-gray-700">
      <span>
        {label}

        {required && (
          <span className="text-red-500">
            {" "}
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10"
      />
    </label>
  );
}

/*
 * Create a URL-friendly slug.
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
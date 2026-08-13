import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  BookOpen,
  Globe,
  Calendar,
  FileText,
  Boxes,
  IndianRupee,
} from "lucide-react";

import type { Publication } from "../../types/publication";

import { publicationService } from "../../services/publicationService";
import { cartService } from "../../services/cartService";
import { wishlistService } from "../../services/wishlistService";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [publication, setPublication] =
    useState<Publication | null>(null);

  const [loading, setLoading] = useState(true);

  const [isInWishlist, setIsInWishlist] =
    useState(false);

  /*
   * ============================================================
   * LOAD PUBLICATION
   * ============================================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadPublication = async () => {
      if (!id) {
        if (!cancelled) {
          setPublication(null);
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);

        const data =
          await publicationService.getById(id);

        if (!cancelled) {
          setPublication(data ?? null);
        }
      } catch (error) {
        console.error(
          "Failed to load publication:",
          error
        );

        if (!cancelled) {
          setPublication(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPublication();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /*
   * ============================================================
   * CHECK WISHLIST
   * ============================================================
   */

  useEffect(() => {
    if (!publication) {
      setIsInWishlist(false);
      return;
    }

    setIsInWishlist(
      wishlistService.isInWishlist(
        publication.id
      )
    );
  }, [publication]);

  /*
   * ============================================================
   * ADD TO CART
   * ============================================================
   */

  const handleAddToCart = () => {
    if (!publication) {
      return;
    }

    if (publication.stock <= 0) {
      alert(
        "This publication is currently out of stock."
      );

      return;
    }

    cartService.addToCart(publication);

    alert(
      "Publication added to cart successfully."
    );
  };

  /*
   * ============================================================
   * BUY NOW
   * ============================================================
   */

  const handleBuyNow = () => {
    if (!publication) {
      return;
    }

    if (publication.stock <= 0) {
      alert(
        "This publication is currently out of stock."
      );

      return;
    }

    cartService.addToCart(publication);

    navigate("/customer/cart");
  };

  /*
   * ============================================================
   * WISHLIST
   * ============================================================
   */

  const handleWishlist = () => {
    if (!publication) {
      return;
    }

    wishlistService.toggle(publication);

    const updatedStatus =
      wishlistService.isInWishlist(
        publication.id
      );

    setIsInWishlist(updatedStatus);
  };

  /*
   * ============================================================
   * LOADING STATE
   * ============================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
          <div className="text-xl font-semibold text-[#003366]">
            Loading publication...
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Please wait.
          </p>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * PUBLICATION NOT FOUND
   * ============================================================
   */

  if (!publication) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-[#003366]">
            Publication Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The publication you are looking for does
            not exist or could not be loaded.
          </p>

          <Link
            to="/customer/books"
            className="mt-6 inline-flex items-center rounded-xl bg-[#003366] px-6 py-3 font-semibold text-white transition hover:bg-[#002855]"
          >
            <ArrowLeft
              className="mr-2"
              size={18}
            />

            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * DERIVED VALUES
   * ============================================================
   */

  const isOutOfStock =
    publication.stock <= 0;

  const formattedDate =
    publication.publication_date
      ? new Date(
          publication.publication_date
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  const publicationYear =
    publication.publication_date
      ? new Date(
          publication.publication_date
        ).getFullYear()
      : "N/A";

  const authorNames =
    publication.authors &&
    publication.authors.length > 0
      ? publication.authors
          .map(
            (author) =>
              author.full_name
          )
          .join(", ")
      : "N/A";

  const categoryNames =
    publication.categories &&
    publication.categories.length > 0
      ? publication.categories
          .map(
            (category) =>
              category.name
          )
          .join(", ")
      : "N/A";

  const hasAdditionalInformation =
    (publication.authors &&
      publication.authors.length > 0) ||
    (publication.categories &&
      publication.categories.length > 0) ||
    Boolean(publication.edition) ||
    Boolean(publication.format) ||
    Boolean(publication.issn) ||
    Boolean(publication.doi);

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================================
          BACK NAVIGATION
          ====================================================== */}

      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            to="/customer/books"
            className="inline-flex items-center gap-2 font-medium text-[#003366] transition hover:underline"
          >
            <ArrowLeft size={18} />

            Back to Books
          </Link>
        </div>
      </div>

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">

          {/* ==================================================
              LEFT SIDE — COVER
              ================================================== */}

          <div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

              <img
                src={
                  publication.cover_image ||
                  "/DefaultBook.jpg"
                }
                alt={publication.title}
                className="h-[650px] w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "/DefaultBook.jpg";
                }}
              />

            </div>
          </div>

          {/* ==================================================
              RIGHT SIDE — DETAILS
              ================================================== */}

          <div>

            {/* =================================================
                PUBLICATION TYPE
                ================================================= */}

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#003366]">
              {publication.publication_type_id ||
                "Publication"}
            </span>

            {/* =================================================
                TITLE
                ================================================= */}

            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#003366] md:text-5xl">
              {publication.title}
            </h1>

            {/* =================================================
                SUBTITLE
                ================================================= */}

            {publication.subtitle && (
              <p className="mt-3 text-lg text-gray-600">
                {publication.subtitle}
              </p>
            )}

            {/* =================================================
                PUBLISHER
                ================================================= */}

            <p className="mt-3 text-xl text-gray-600">
              CSIR-NIScPR
            </p>

            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <div className="mt-8 rounded-2xl bg-white p-6 shadow">

              <h2 className="text-2xl font-bold text-[#003366]">
                Description
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                {publication.description ||
                  "No description available."}
              </p>

            </div>

            {/* =================================================
                PRICE
                ================================================= */}

            <div className="mt-8 flex flex-wrap items-center gap-3">

              <IndianRupee
                size={30}
                className="text-green-600"
              />

              <span className="text-4xl font-bold text-green-600">
                ₹{publication.price}
              </span>

              {publication.discount_price && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{publication.discount_price}
                </span>
              )}

            </div>

            {/* =================================================
                PUBLICATION INFORMATION
                ================================================= */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              {/* ----------------------------------------------
                  PUBLICATION TYPE
                  ---------------------------------------------- */}

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">

                <BookOpen
                  className="shrink-0 text-[#003366]"
                />

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    Publication Type
                  </p>

                  <p className="break-all font-semibold text-gray-800">
                    {publication.publication_type_id ||
                      "N/A"}
                  </p>

                </div>

              </div>

              {/* ----------------------------------------------
                  PUBLISHED DATE
                  ---------------------------------------------- */}

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">

                <Calendar
                  className="shrink-0 text-[#003366]"
                />

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    Published
                  </p>

                  <p className="font-semibold text-gray-800">
                    {formattedDate}
                  </p>

                </div>

              </div>

              {/* ----------------------------------------------
                  YEAR
                  ---------------------------------------------- */}

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">

                <Calendar
                  className="shrink-0 text-[#003366]"
                />

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    Year
                  </p>

                  <p className="font-semibold text-gray-800">
                    {publicationYear}
                  </p>

                </div>

              </div>

              {/* ----------------------------------------------
                  LANGUAGE
                  ---------------------------------------------- */}

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">

                <Globe
                  className="shrink-0 text-[#003366]"
                />

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    Language
                  </p>

                  <p className="font-semibold text-gray-800">
                    {publication.language ||
                      "N/A"}
                  </p>

                </div>

              </div>

              {/* ----------------------------------------------
                  PAGES
                  ---------------------------------------------- */}

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">

                <FileText
                  className="shrink-0 text-[#003366]"
                />

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    Pages
                  </p>

                  <p className="font-semibold text-gray-800">
                    {publication.pages ??
                      "N/A"}
                  </p>

                </div>

              </div>

              {/* ----------------------------------------------
                  STOCK
                  ---------------------------------------------- */}

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">

                <Boxes
                  className="shrink-0 text-[#003366]"
                />

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    Stock
                  </p>

                  <p
                    className={`font-semibold ${
                      isOutOfStock
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : `${publication.stock} Available`}
                  </p>

                </div>

              </div>

              {/* ----------------------------------------------
                  ISBN
                  ---------------------------------------------- */}

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">

                <BookOpen
                  className="shrink-0 text-[#003366]"
                />

                <div className="min-w-0">

                  <p className="text-sm text-gray-500">
                    ISBN
                  </p>

                  <p className="break-all font-semibold text-gray-800">
                    {publication.isbn ||
                      "N/A"}
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                ADDITIONAL INFORMATION
                ================================================= */}

            {hasAdditionalInformation && (
              <div className="mt-6 rounded-2xl bg-white p-6 shadow">

                <h2 className="text-xl font-bold text-[#003366]">
                  Additional Information
                </h2>

                <div className="mt-4 space-y-3 text-sm">

                  {/* --------------------------------------------
                      AUTHORS
                      -------------------------------------------- */}

                  {publication.authors &&
                    publication.authors.length > 0 && (
                      <div className="flex justify-between gap-4 border-b pb-3">

                        <span className="shrink-0 text-gray-500">
                          Authors
                        </span>

                        <span className="text-right font-semibold text-gray-800">
                          {authorNames}
                        </span>

                      </div>
                    )}

                  {/* --------------------------------------------
                      CATEGORIES
                      -------------------------------------------- */}

                  {publication.categories &&
                    publication.categories.length > 0 && (
                      <div className="flex justify-between gap-4 border-b pb-3">

                        <span className="shrink-0 text-gray-500">
                          Categories
                        </span>

                        <span className="text-right font-semibold text-gray-800">
                          {categoryNames}
                        </span>

                      </div>
                    )}

                  {/* --------------------------------------------
                      EDITION
                      -------------------------------------------- */}

                  {publication.edition && (
                    <div className="flex justify-between gap-4 border-b pb-3">

                      <span className="shrink-0 text-gray-500">
                        Edition
                      </span>

                      <span className="text-right font-semibold text-gray-800">
                        {publication.edition}
                      </span>

                    </div>
                  )}

                  {/* --------------------------------------------
                      FORMAT
                      -------------------------------------------- */}

                  {publication.format && (
                    <div className="flex justify-between gap-4 border-b pb-3">

                      <span className="shrink-0 text-gray-500">
                        Format
                      </span>

                      <span className="text-right font-semibold text-gray-800">
                        {publication.format}
                      </span>

                    </div>
                  )}

                  {/* --------------------------------------------
                      ISSN
                      -------------------------------------------- */}

                  {publication.issn && (
                    <div className="flex justify-between gap-4 border-b pb-3">

                      <span className="shrink-0 text-gray-500">
                        ISSN
                      </span>

                      <span className="break-all text-right font-semibold text-gray-800">
                        {publication.issn}
                      </span>

                    </div>
                  )}

                  {/* --------------------------------------------
                      DOI
                      -------------------------------------------- */}

                  {publication.doi && (
                    <div className="flex justify-between gap-4">

                      <span className="shrink-0 text-gray-500">
                        DOI
                      </span>

                      <span className="break-all text-right font-semibold text-gray-800">
                        {publication.doi}
                      </span>

                    </div>
                  )}

                </div>
              </div>
            )}

            {/* =================================================
                ACTION BUTTONS
                ================================================= */}

            <div className="mt-10 flex flex-wrap gap-4">

              {/* ----------------------------------------------
                  ADD TO CART
                  ---------------------------------------------- */}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[#003366] py-4 text-lg font-semibold text-white transition hover:bg-[#002855] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart size={22} />

                {isOutOfStock
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              {/* ----------------------------------------------
                  BUY NOW
                  ---------------------------------------------- */}

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="rounded-2xl border border-[#003366] px-8 py-4 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy Now
              </button>

              {/* ----------------------------------------------
                  WISHLIST
                  ---------------------------------------------- */}

              <button
                type="button"
                aria-label={
                  isInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                title={
                  isInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={handleWishlist}
                className={`rounded-2xl border p-4 transition ${
                  isInWishlist
                    ? "border-red-300 bg-red-500 text-white hover:bg-red-600"
                    : "border-gray-300 text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Heart
                  size={22}
                  fill={
                    isInWishlist
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
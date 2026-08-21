"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductDetailPage() {
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Gagal mengambil produk."
          );
        }

        const foundProduct = data.products?.find(
          (item) => item.id === params.id
        );

        if (!foundProduct) {
          setError("Produk tidak ditemukan.");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error(error);
        setError("Gagal memuat produk.");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-message">
          <div className="catalog-spinner"></div>

          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-message">

          <div className="catalog-empty-icon">
            ◇
          </div>

          <h2>
            {error || "Product not found"}
          </h2>

          <p>
            Produk yang Anda cari tidak tersedia.
          </p>

          <Link
            href="/katalog"
            className="product-back-button"
          >
            ← Back to Catalog
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">

      {/* BREADCRUMB */}

      <div className="product-detail-container">

        <div className="product-breadcrumb">
          <Link href="/">
            Home
          </Link>

          <span>/</span>

          <Link href="/katalog">
            Catalog
          </Link>

          <span>/</span>

          <strong>
            {product.name}
          </strong>
        </div>

        {/* PRODUCT */}

        <section className="product-detail-grid">

          {/* IMAGE */}

          <div className="product-detail-image">

            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            ) : (
              <div className="product-detail-no-image">
                No Image
              </div>
            )}

          </div>

          {/* INFORMATION */}

          <div className="product-detail-info">

            <p className="product-detail-category">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            <div className="product-detail-price">
              {formatPrice(product.price)}
            </div>

            <div className="product-detail-divider"></div>

            <div className="product-detail-description">

              <p className="detail-label">
                DESCRIPTION
              </p>

              <p>
                {product.description ||
                  "No description available for this product."}
              </p>

            </div>

            <div className="product-detail-stock">

              <span>
                STOCK
              </span>

              <strong>
                {product.stock} available
              </strong>

            </div>

            <button
              type="button"
              className="product-add-cart-button"
              disabled={product.stock <= 0}
            >
              {product.stock > 0
                ? "Add to Cart →"
                : "Out of Stock"}
            </button>

            <Link
              href="/katalog"
              className="product-continue-button"
            >
              ← Continue Shopping
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}
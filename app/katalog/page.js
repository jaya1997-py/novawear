"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getImageUrl(image) {
  if (!image) {
    return "/images/placeholder.jpg";
  }

  return image;
}

export default function KatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/products",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Gagal mengambil produk."
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error(
          "LOAD PRODUCTS ERROR:",
          error
        );

        setError(
          error.message ||
            "Terjadi kesalahan saat memuat produk."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="catalog-page">
        <section className="catalog-container">
          <p>Memuat produk...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="catalog-page">
        <section className="catalog-container">
          <h1>Katalog</h1>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="catalog-page">
      <section className="catalog-container">
        <header className="catalog-header">
          <p className="catalog-eyebrow">
            NOVAWEAR COLLECTION
          </p>

          <h1>Our Products</h1>

          <p>
            Discover our latest collection.
          </p>
        </header>

        {products.length === 0 ? (
          <div className="catalog-empty">
            <h2>Belum ada produk</h2>

            <p>
              Produk akan segera tersedia.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <Link
                href={`/produk/${product.id}`}
                className="product-card"
                key={product.id}
              >
                <div className="product-image">
                  <Image
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h2>
                    {product.name}
                  </h2>

                  <p className="product-price">
                    {formatPrice(product.price)}
                  </p>

                  <p className="product-stock">
                    Stock: {product.stock}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
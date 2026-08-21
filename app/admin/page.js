"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Gagal mengambil produk."
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("LOAD PRODUCTS ERROR:", error);

      setError(
        error.message ||
          "Gagal mengambil data produk."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <header className="admin-header">

          <div>
            <p className="admin-eyebrow">
              CATALOG MANAGEMENT
            </p>

            <h1>
              Products
            </h1>

            <p className="admin-welcome">
              Manage all products in your store.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="admin-add-button"
          >
            + Add Product
          </Link>

        </header>

        <section className="admin-panel products-panel">

          <div className="admin-panel-header">

            <div>
              <p>CATALOG</p>

              <h2>
                All Products
              </h2>
            </div>

            <span className="product-total">
              {products.length} products
            </span>

          </div>

          {loading && (
            <div className="admin-empty">

              <div className="admin-empty-icon">
                ◌
              </div>

              <h3>
                Loading products...
              </h3>

              <p>
                Reading products from GitHub.
              </p>

            </div>
          )}

          {!loading && error && (
            <div className="admin-empty">

              <div className="admin-empty-icon">
                !
              </div>

              <h3>
                Failed to load products
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="admin-empty-button"
                onClick={loadProducts}
              >
                Try Again
              </button>

            </div>
          )}

          {!loading &&
            !error &&
            products.length === 0 && (
              <div className="admin-empty">

                <div className="admin-empty-icon">
                  ◇
                </div>

                <h3>
                  No products available
                </h3>

                <p>
                  Your products will appear here
                  after you add them.
                </p>

                <Link
                  href="/admin/products/new"
                  className="admin-empty-button"
                >
                  Add Product
                </Link>

              </div>
            )}

          {!loading &&
            !error &&
            products.length > 0 && (

              <div className="products-grid">

                {products.map((product) => (

                  <article
                    key={product.id}
                    className="product-card"
                  >

                    <div className="product-card-image">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    </div>

                    <div className="product-card-content">

                      <span className="product-card-category">
                        {product.category}
                      </span>

                      <h3>
                        {product.name}
                      </h3>

                      <strong>
                        {formatPrice(product.price)}
                      </strong>

                      <p>
                        Stock: {product.stock}
                      </p>

                    </div>

                  </article>

                ))}

              </div>

            )}

        </section>

      </main>

    </div>
  );
}
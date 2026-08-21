import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function ProductsPage() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">

        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">
              CATALOG MANAGEMENT
            </p>

            <h1>Products</h1>

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
              <h2>All Products</h2>
            </div>

            <span className="product-total">
              0 products
            </span>
          </div>

          <div className="admin-empty">

            <div className="admin-empty-icon">
              ◇
            </div>

            <h3>No products available</h3>

            <p>
              Your products will appear here after
              you add them.
            </p>

            <Link
              href="/admin/products/new"
              className="admin-empty-button"
            >
              Add Product
            </Link>

          </div>

        </section>

      </main>
    </div>
  );
}
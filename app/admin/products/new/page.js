import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="admin-layout">

      {/* =========================
          ADMIN SIDEBAR
      ========================== */}

      <AdminSidebar />


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="admin-main">


        {/* =========================
            HEADER
        ========================== */}

        <header className="admin-header">

          <div>

            <p className="admin-eyebrow">
              CATALOG / PRODUCTS
            </p>

            <h1>
              Add Product
            </h1>

            <p className="admin-welcome">
              Create a new product for your store.
            </p>

          </div>


          {/* BACK BUTTON */}

          <Link
            href="/admin/products"
            className="back-button"
          >
            ← Back to Products
          </Link>

        </header>


        {/* =========================
            PRODUCT FORM
        ========================== */}

        <ProductForm />

      </main>

    </div>
  );
}
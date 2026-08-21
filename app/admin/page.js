import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">
              NOVAWEAR ADMIN
            </p>

            <h1>
              Dashboard
            </h1>

            <p className="admin-welcome">
              Manage your store from one place.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="admin-add-button"
          >
            + Add Product
          </Link>
        </header>

        <section className="admin-stats">

          <div className="admin-stat-card">
            <p>Total Products</p>
            <strong>0</strong>
            <span>Products in catalog</span>
          </div>

          <div className="admin-stat-card">
            <p>Orders</p>
            <strong>0</strong>
            <span>Total orders</span>
          </div>

          <div className="admin-stat-card">
            <p>Customers</p>
            <strong>0</strong>
            <span>Registered customers</span>
          </div>

          <div className="admin-stat-card">
            <p>Revenue</p>
            <strong>Rp0</strong>
            <span>Total revenue</span>
          </div>

        </section>

        <section className="admin-content-grid">

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p>PRODUCTS</p>
                <h2>Recent Products</h2>
              </div>

              <Link href="/admin/products">
                View All →
              </Link>
            </div>

            <div className="admin-empty">

              <div className="admin-empty-icon">
                ◇
              </div>

              <h3>
                No products yet
              </h3>

              <p>
                Start building your catalog
                by adding your first product.
              </p>

              <Link
                href="/admin/products/new"
                className="admin-empty-button"
              >
                Add Your First Product
              </Link>

            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p>STORE</p>
                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions">

              <Link href="/admin/products/new">
                <span>＋</span>
                <div>
                  <strong>Add Product</strong>
                  <small>
                    Create a new product
                  </small>
                </div>
              </Link>

              <Link href="/admin/products">
                <span>◈</span>
                <div>
                  <strong>Manage Products</strong>
                  <small>
                    View your catalog
                  </small>
                </div>
              </Link>

              <Link href="/">
                <span>↗</span>
                <div>
                  <strong>View Store</strong>
                  <small>
                    Open your storefront
                  </small>
                </div>
              </Link>

            </div>
          </div>

        </section>

      </main>

    </div>
  );
}

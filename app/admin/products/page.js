import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import products from "@/data/products.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductsPage() {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        {/* =========================
            HEADER
        ========================== */}

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


        {/* =========================
            PRODUCT SUMMARY
        ========================== */}

        <section className="admin-product-summary">

          <div>
            <span>
              Total Products
            </span>

            <strong>
              {totalProducts}
            </strong>
          </div>


          <div>
            <span>
              Total Stock
            </span>

            <strong>
              {totalStock}
            </strong>
          </div>


          <div>
            <span>
              Categories
            </span>

            <strong>
              {
                new Set(
                  products.map(
                    (product) =>
                      product.category
                  )
                ).size
              }
            </strong>
          </div>

        </section>


        {/* =========================
            PRODUCT LIST
        ========================== */}

        <section className="admin-panel products-panel">

          <div className="admin-panel-header">

            <div>

              <p>
                CATALOG
              </p>

              <h2>
                All Products
              </h2>

            </div>

            <span className="product-total">
              {totalProducts}{" "}
              {totalProducts === 1
                ? "product"
                : "products"}
            </span>

          </div>


          {/* EMPTY STATE */}

          {products.length === 0 ? (

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

          ) : (


            /* PRODUCT TABLE */

            <div className="products-table-wrapper">

              <table className="products-table">

                <thead>

                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map((product) => (

                    <tr key={product.id}>

                      {/* PRODUCT */}

                      <td>

                        <div className="product-table-info">

                          <div className="product-table-image">

                            {product.image ? (

                              <img
                                src={product.image}
                                alt={product.name}
                              />

                            ) : (

                              <span>
                                ◇
                              </span>

                            )}

                          </div>


                          <div>

                            <strong>
                              {product.name}
                            </strong>

                            <small>
                              ID: {product.id}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td>

                        <span className="product-category">

                          {product.category}

                        </span>

                      </td>


                      {/* PRICE */}

                      <td>

                        {formatPrice(
                          product.price
                        )}

                      </td>


                      {/* STOCK */}

                      <td>

                        {product.stock}

                      </td>


                      {/* STATUS */}

                      <td>

                        {Number(product.stock) > 0 ? (

                          <span className="product-status available">
                            In Stock
                          </span>

                        ) : (

                          <span className="product-status sold-out">
                            Out of Stock
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}
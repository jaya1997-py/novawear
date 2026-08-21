import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Essential Black Hoodie",
    category: "Hoodie",
    price: "Rp249.000",
  },
  {
    id: 2,
    name: "Classic White T-Shirt",
    category: "T-Shirt",
    price: "Rp149.000",
  },
  {
    id: 3,
    name: "Vintage Denim Jacket",
    category: "Jacket",
    price: "Rp399.000",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="section-container">

        <div className="featured-header">
          <div>
            <p>CURATED FOR YOU</p>
            <h2>FEATURED PRODUCTS</h2>
          </div>

          <Link href="/katalog">
            VIEW ALL →
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <div className="product-image">
                <span>PRODUCT {product.id}</span>
              </div>

              <div className="product-info">
                <p className="product-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <p className="product-price">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
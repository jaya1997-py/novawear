import Link from "next/link";

const categories = [
  {
    name: "T-SHIRT",
    description: "Everyday essentials",
  },
  {
    name: "HOODIE",
    description: "Comfort meets style",
  },
  {
    name: "JACKET",
    description: "Modern outerwear",
  },
  {
    name: "PANTS",
    description: "Made for movement",
  },
];

export default function CategorySection() {
  return (
    <section className="categories">
      <div className="section-container">

        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>SHOP BY CATEGORY</h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              href="/katalog"
              className="category-card"
              key={category.name}
            >
              <div className="category-image">
                {category.name}
              </div>

              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span>EXPLORE →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
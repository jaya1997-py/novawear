import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="promo">
      <div className="promo-content">

        <p>MADE FOR EVERYDAY</p>

        <h2>
          ELEVATE
          <br />
          YOUR STYLE.
        </h2>

        <p className="promo-description">
          Temukan koleksi yang dibuat untuk
          menjadi bagian dari cerita Anda.
        </p>

        <Link href="/katalog" className="promo-button">
          SHOP NOW →
        </Link>

      </div>
    </section>
  );
}
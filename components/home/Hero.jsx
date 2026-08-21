import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-content">
          <p className="hero-subtitle">
            NEW COLLECTION 2026
          </p>

          <h1>
            DEFINE
            <br />
            YOUR
            <br />
            STYLE.
          </h1>

          <p className="hero-description">
            Koleksi fashion modern untuk menemani
            gaya Anda setiap hari.
          </p>

          <Link href="/katalog" className="hero-button">
            EXPLORE COLLECTION
            <span>→</span>
          </Link>
        </div>

        <div className="hero-image">
          <div className="hero-image-placeholder">
            <span>NOVAWEAR</span>
            <p>NEW SEASON</p>
          </div>
        </div>

      </div>
    </section>
  );
}
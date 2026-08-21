import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* BAGIAN KIRI */}
        <div className="hero-content">
          <p className="hero-label">
            NEW COLLECTION — 2026
          </p>

          <h1 className="hero-title">
            DEFINE
            <br />
            YOUR
            <br />
            <span>STYLE.</span>
          </h1>

          <p className="hero-description">
            Temukan koleksi fashion modern yang dirancang
            untuk membantu Anda mengekspresikan gaya terbaik
            setiap hari.
          </p>

          <div className="hero-actions">
            <Link href="/katalog" className="hero-button">
              SHOP COLLECTION
              <span>→</span>
            </Link>

            <Link
              href="/koleksi"
              className="hero-secondary-button"
            >
              EXPLORE LOOKBOOK
            </Link>
          </div>
        </div>

        {/* BAGIAN KANAN - GAMBAR ASLI */}
        <div className="hero-visual">

          <div className="hero-image-box">
            <Image
              src="/images/hero/hero-fashion.jpg"
              alt="NOVAWEAR Fashion Collection"
              fill
              priority
              className="hero-fashion-image"
            />
          </div>

          <div className="hero-floating-card">
            <span>01</span>

            <div>
              <p>ESSENTIAL</p>
              <strong>NEW ARRIVAL</strong>
            </div>
          </div>

        </div>

      </div>

      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>

        <div className="hero-line"></div>

        <span>EST. 2026</span>
      </div>
    </section>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            NOVA<span>WEAR</span>
          </Link>

          <p>
            Fashion modern untuk membantu Anda
            mengekspresikan gaya setiap hari.
          </p>
        </div>

        <div className="footer-column">
          <h3>SHOP</h3>
          <Link href="/katalog">All Products</Link>
          <Link href="/katalog">New Arrivals</Link>
          <Link href="/koleksi">Collections</Link>
        </div>

        <div className="footer-column">
          <h3>COMPANY</h3>
          <Link href="/tentang">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>

        <div className="footer-column">
          <h3>FOLLOW</h3>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Facebook</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 NOVAWEAR. All rights reserved.</p>

        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
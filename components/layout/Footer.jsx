import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>
            NOVA<span>WEAR</span>
          </h2>

          <p>
            Modern fashion for your
            everyday story.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>SHOP</h3>

            <Link href="/katalog">All Products</Link>
            <Link href="/katalog">New Arrivals</Link>
            <Link href="/katalog">Collections</Link>
          </div>

          <div>
            <h3>COMPANY</h3>

            <Link href="/">About Us</Link>
            <Link href="/">Contact</Link>
            <Link href="/">FAQ</Link>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 NOVAWEAR. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
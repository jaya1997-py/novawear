"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        <Link href="/" className="logo">
          NOVA<span>WEAR</span>
        </Link>

        <nav className="desktop-menu">
          <Link href="/">HOME</Link>
          <Link href="/katalog">SHOP</Link>
          <Link href="/koleksi">COLLECTION</Link>
          <Link href="/tentang">ABOUT</Link>
        </nav>

        <div className="navbar-actions">
          <Link href="/login" className="login-link">
            LOGIN
          </Link>

          <Link href="/cart" className="cart-link">
            CART
            <span className="cart-count">0</span>
          </Link>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Buka menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            HOME
          </Link>

          <Link href="/katalog" onClick={() => setMenuOpen(false)}>
            SHOP
          </Link>

          <Link href="/koleksi" onClick={() => setMenuOpen(false)}>
            COLLECTION
          </Link>

          <Link href="/tentang" onClick={() => setMenuOpen(false)}>
            ABOUT
          </Link>

          <Link href="/login" onClick={() => setMenuOpen(false)}>
            LOGIN
          </Link>
        </div>
      )}
    </header>
  );
}
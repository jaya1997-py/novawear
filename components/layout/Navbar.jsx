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
          <Link href="/">Home</Link>
          <Link href="/katalog">Shop</Link>
          <Link href="/koleksi">Collection</Link>
        </nav>

        <div className="navbar-actions">
          <Link href="/login" className="nav-button">
            Login
          </Link>

          <Link href="/cart" className="cart-button">
            🛍
            <span>0</span>
          </Link>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-menu">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link
            href="/katalog"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>

          <Link
            href="/koleksi"
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </Link>
        </nav>
      )}
    </header>
  );
}
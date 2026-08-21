"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "▦",
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: "◈",
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: "□",
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: "○",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: "⚙",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">
        NOVA<span>WEAR</span>
        <small>ADMIN</small>
      </div>

      <nav className="admin-navigation">

        <p className="admin-menu-title">
          MANAGEMENT
        </p>

        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-menu-item ${
                active ? "active" : ""
              }`}
            >
              <span className="admin-menu-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      <div className="admin-sidebar-bottom">
        <Link href="/">
          ← Back to Store
        </Link>
      </div>

    </aside>
  );
}
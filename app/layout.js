import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "NOVAWEAR | Modern Fashion",
  description: "Modern fashion store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />

        <main className="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
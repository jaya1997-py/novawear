import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
    </>
  );
}
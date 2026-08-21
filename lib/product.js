import products from "@/data/products.json";

export function getProducts() {
  return products;
}

export function getProductCount() {
  return products.length;
}

export function getTotalStock() {
  return products.reduce(
    (total, product) =>
      total + Number(product.stock),
    0
  );
}
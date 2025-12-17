import type { Product } from "@/pages/HomePage";
import { fetchJson } from "./apiWrapper";

const API_URL = import.meta.env.VITE_API_URL;

type GetProductsResponse = { products: Product[] };

export async function getProducts(): Promise<Product[]> {
  const data = await fetchJson<GetProductsResponse>(`${API_URL}/api/products`);
  return data.products;
}

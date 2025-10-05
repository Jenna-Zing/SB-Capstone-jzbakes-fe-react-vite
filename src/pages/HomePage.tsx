import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "@/api/api";
import { showFriendlyFetchError } from "@/utils/errorHandlers";

export type Product = {
  id: number;
  name: string;
  cost: number;
  description: string;
  ingredients: string[];
  imgURL: string; // Just the filename, e.g., "chocolate_chip_cookie.jpg"
};

// Preload all baked_goods images using Vite's glob import
const imageMap = import.meta.glob("../assets/baked_goods/*", {
  eager: true,
  as: "url",
}) as Record<string, string>;

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const products = await getProducts();
      const mappedProducts = products.map((product: Product) => {
        const imagePath = `../assets/baked_goods/${product.imgURL}`;
        const resolvedImage = imageMap[imagePath] || "";
        return {
          ...product,
          imgURL: resolvedImage, // Replace filename with actual URL
        };
      });

      setProducts(mappedProducts);
    } catch (err) {
      showFriendlyFetchError(err, "getProducts failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomePage;

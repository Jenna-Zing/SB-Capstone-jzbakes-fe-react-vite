import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      console.log("Fetch GET PRODUCTS data:", data);

      const mappedProducts = data.products.map((product: Product) => {
        const imagePath = `../assets/baked_goods/${product.imgURL}`;
        const resolvedImage = imageMap[imagePath] || "";
        return {
          ...product,
          imgURL: resolvedImage, // Replace filename with actual URL
        };
      });

      console.log("Mapped products:", mappedProducts);
      setProducts(mappedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
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

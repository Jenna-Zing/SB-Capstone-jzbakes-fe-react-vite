import type { Product } from "../pages/HomePage";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <img
        src={product.imgURL}
        alt={product.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h2>{product.name}</h2>
      <p>Cost: {"$" + product.cost.toFixed(2)}</p>
      <p>{product.description}</p>
    </div>
  );
}

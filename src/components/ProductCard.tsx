import { useState } from "react";
import { type Product } from "../pages/HomePage";
import useCart from "../hooks/useCart";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart(); // Get addToCart function from cart provider
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  // Toggle description visibility
  const toggleDescription = () => setDescriptionExpanded((prev) => !prev);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      cost: product.cost,
      quantity: 1,
      imgURL: product.imgURL,
    });
  };

  return (
    <div className="w-[250px] border border-[#ddd] p-4 rounded-lg">
      <img
        src={product.imgURL}
        alt={product.name}
        className="w-full h-[175px] object-contain"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600">
        Cost: {"$" + product.cost.toFixed(2)}
      </p>

      {/* Expandable description */}
      <div>
        <p
          className={`${
            isDescriptionExpanded ? "line-clamp-none" : "line-clamp-3"
          } overflow-hidden`}
        >
          {product.description}
        </p>

        {/* Conditionally render the "Show More" button */}
        {product.description.length > 80 && ( // Adjust this threshold as needed
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:text-blue-700"
          >
            {isDescriptionExpanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Ingredients section */}
      {product.ingredients && product.ingredients.length > 0 && (
        <div className="mt-2">
          <h3 className="text-sm font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

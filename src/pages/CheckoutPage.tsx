import useCart from "@/hooks/useCart";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 w-32">Product</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Quantity</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Unit Price</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border border-gray-200">
                      {item.imgURL ? (
                        <img 
                          src={item.imgURL} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">
                    ${item.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    ${(item.cost * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
              <tr>
                <td colSpan={4} className="px-6 py-4 text-right font-bold text-lg text-gray-900">
                  Grand Total:
                </td>
                <td className="px-6 py-4 text-right font-bold text-xl text-blue-600">
                  ${totalCost.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Link 
          to="/"
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          Continue Shopping
        </Link>
        <button 
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium shadow-md transition-colors"
          onClick={() => alert("Payment integration coming soon!")}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

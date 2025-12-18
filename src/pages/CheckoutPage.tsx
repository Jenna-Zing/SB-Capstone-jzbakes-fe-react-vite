import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useCart from "@/hooks/useCart";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Pickup State
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");

  const totalCost = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  // Generate valid pickup times (e.g., 9 AM to 5 PM)
  const pickupTimes = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validation: Ensure Date and Time are selected
    if (!date) {
      setMessage("Please select a pickup date.");
      return;
    }
    if (!time) {
      setMessage("Please select a pickup time.");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/complete`,
        //   // Pass Pickup Details as Metadata to the Intent
        //   // This is what the Webhook will receive!
        //   payment_method_data: {
        //     funding: 'credit', // Explicitly typed, though usually inferred
        //     billing_details: {
        //         // You can add logic to collect this too
        //     }
        // },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion" as const,
  };

  // Disable past dates
  const isDateDisabled = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {/* Cart Summary Header */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 w-32">
                  Product
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-center">
                  Quantity
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                  Unit Price
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                  Total
                </th>
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
                <td
                  colSpan={4}
                  className="px-6 py-4 text-right font-bold text-lg text-gray-900"
                >
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

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pickup Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="text-blue-600" /> Pickup Details
          </h2>
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Pickup Address</p>
            <p className="font-medium text-gray-800">
              123 Bakery Street, Sweet City, SC 29000
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Select Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Select Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Choose a time...</option>
                  {pickupTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Section */}
        <form
          id="payment-form"
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner">
                  Processing...
                </div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && (
            <div
              id="payment-message"
              className="mt-4 text-red-500 text-sm text-center"
            >
              {message}
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

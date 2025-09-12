import { Calendar } from "@/components/ui/calendar";
import React from "react";

function OrderHistoryPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <h1>Order History Page</h1>
      {/* Additional content for order history can be added here */}
      {/* Testing ShadCN calendar for example  */}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    </div>
  );
}

export default OrderHistoryPage;

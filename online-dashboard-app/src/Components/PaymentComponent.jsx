import React, { useState } from "react";
import axios from "axios";

const PaymentComponent = () => {
  const [amount, setAmount] = useState(500); // Amount in INR

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/create-order",
        { amount },
      );

      // Step 2: Open Razorpay checkout
      const options = {
        key: data.key,
        amount: amount * 100,
        currency: "INR",
        name: "My Store",
        description: "Test Transaction",
        order_id: data.order_id,
        handler: async function (response) {
          // Step 3: Verify payment on Laravel backend
          await axios.post(
            "http://127.0.0.1:8000/api/verify-payment",
            response,
          );
          alert("Payment Successful!");
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div>
      <h2>Pay ₹{amount}</h2>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentComponent;

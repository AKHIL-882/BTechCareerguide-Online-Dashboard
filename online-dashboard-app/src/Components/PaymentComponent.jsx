import React, { useEffect } from "react";
import{ paymentInitiator} from "../api/projectApi";

const PaymentComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    console.log("asd")
    try {
      const accessToken = JSON.parse(localStorage.getItem("data"))?.access_token;
      console.log(accessToken)
      const res = await paymentInitiator(accessToken);
      const dataFromAPI = res.data.data;
      const options = {
        key: dataFromAPI.key,
        amount: dataFromAPI.amount,
        currency: dataFromAPI.currency,
        name: "Venky App",
        description: "Test Razorpay Payment",
        order_id: dataFromAPI.order_id,
        handler: function (response) {
          alert("Payment Success!");
          console.log("Payment Details:", response);
        },
        prefill: {
          name: "Venky",
          email: "venky@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true, // 👈 This enables UPI
          card: true,
          netbanking: true,
          wallet: true,
          emi: true,
          paylater:true
        },
      };

      const rzp = new window.Razorpay(options);
      console.log("Razorpay options:", options);
      console.log("Razorpay instance:", rzp);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div>
      <h1>Pay with Razorpay</h1>
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
};

export default PaymentComponent;

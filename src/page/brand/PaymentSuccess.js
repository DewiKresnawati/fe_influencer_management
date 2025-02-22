import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function FinishPayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  const transactionStatus = searchParams.get("transaction_status");

  useEffect(() => {
    console.log("Order ID:", orderId);
    console.log("Status Code:", statusCode);
    console.log("Transaction Status:", transactionStatus);

    if (!orderId || !statusCode || !transactionStatus) {
      console.error("Parameter tidak lengkap!");
      return;
    }

    // Misalnya, redirect ke dashboard jika sukses
    if (transactionStatus === "settlement") {
      navigate("/brand/dashboard/");
    } else {
      navigate("/");
    }
  }, [orderId, statusCode, transactionStatus, navigate]);

  return <p>Memproses pembayaran...</p>;
}

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FinishPayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  let transactionStatus = searchParams.get("transaction_status");

  if (transactionStatus) {
    transactionStatus = transactionStatus.replace(/"/g, "");
  }

  useEffect(() => {
    console.log("Order ID:", orderId);
    console.log("Status Code:", statusCode);
    console.log("Transaction Status:", transactionStatus);

    if (!orderId || !statusCode || !transactionStatus) {
      console.error("Parameter tidak lengkap!");
      return;
    }

    if (transactionStatus === "settlement") {
      Swal.fire({
        icon: "success",
        title: "Pembayaran Berhasil!",
        text: "Anda akan diarahkan ke dashboard.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate("/brand/dashboard/notifikasi");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Pembayaran Gagal!",
        text: "Anda akan diarahkan ke halaman utama.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    }
  }, [orderId, statusCode, transactionStatus, navigate]);

  return <p>Memproses pembayaran...</p>;
}

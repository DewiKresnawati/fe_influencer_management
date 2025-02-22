import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Ambil parameter dari URL
  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  const transactionStatus = searchParams.get("transaction_status");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Order ID tidak ditemukan.");
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          `https://mesindigital.xyz/influence-be/midtrans/get_pay.php?order_id=${orderId}&status_code=${statusCode}&transaction_status=${transactionStatus}`
        );
        const data = await response.json();

        if (response.ok && data.redirect_url) {
          window.location.href = data.redirect_url; // Redirect ke URL dari backend
        } else {
          setError(
            data.error || "Terjadi kesalahan saat mengambil status pembayaran."
          );
        }
      } catch (err) {
        setError("Gagal menghubungi server.");
      }
    };

    fetchPaymentStatus();
  }, [orderId]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {error ? (
          <>
            <p style={styles.error}>{error}</p>
            <button onClick={() => navigate("/")} style={styles.buttonPrimary}>
              Kembali ke Beranda
            </button>
          </>
        ) : (
          <p>Memproses pembayaran...</p>
        )}
      </div>
    </div>
  );
}

// Gaya CSS inline
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    width: "100%",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  buttonPrimary: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  },
};

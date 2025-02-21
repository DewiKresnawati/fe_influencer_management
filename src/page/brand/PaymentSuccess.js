import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Ambil parameter dari URL
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Order ID tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(`http://mesindigital.xyz/midtrans/get_pay.php?order_id=${orderId}`);
        const data = await response.json();

        if (response.ok) {
          setStatus(data);
        } else {
          setError(data.error || "Terjadi kesalahan saat mengambil status pembayaran.");
        }
      } catch (err) {
        setError("Gagal menghubungi server.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [orderId]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {loading ? (
          <p>Memeriksa status pembayaran...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <>
            <h2 style={styles.title}>
              {status.transaction_status === "success"
                ? "✅ Pembayaran Berhasil!"
                : "❌ Pembayaran Gagal"}
            </h2>
            <p><strong>Order ID:</strong> {status.order_id}</p>
            <p><strong>Status Kode:</strong> {status.status_code}</p>
            <p><strong>Status Transaksi:</strong> {status.transaction_status}</p>
            <div style={styles.buttonContainer}>
              <button onClick={() => navigate("/dashboard")} style={styles.buttonPrimary}>
                Kembali ke Dashboard
              </button>
              <button onClick={() => navigate("/")} style={styles.buttonSecondary}>
                Beranda
              </button>
            </div>
          </>
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
  title: {
    fontSize: "20px",
    marginBottom: "15px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  buttonPrimary: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonSecondary: {
    backgroundColor: "#555",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};


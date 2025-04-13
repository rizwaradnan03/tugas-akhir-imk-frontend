import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess?: (result: any) => void,
        onPending?: (result: any) => void,
        onError?: (result: any) => void,
      }) => void;
    };
  }
}

export const Pay = () => {
  const { token } = useParams()

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (window.snap && typeof window.snap.pay === 'function') {
        clearInterval(interval); // stop checking

        window.snap.pay(token, {
          onSuccess: (result) => {
            alert("Pembayaran berhasil!");
            console.log("Success:", result);
          },
          onPending: (result) => {
            alert("Menunggu pembayaran...");
            console.log("Pending:", result);
          },
          onError: (result) => {
            alert("Terjadi kesalahan saat pembayaran.");
            console.error("Error:", result);
          },
        });
      }
    }, 100); // cek setiap 100ms

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div>
      <h2>Loading pembayaran...</h2>
    </div>
  )
}

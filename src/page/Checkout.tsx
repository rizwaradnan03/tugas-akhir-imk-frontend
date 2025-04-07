import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('BCA');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handlePayment = () => {
    if (accountName && accountNumber) {
      alert(`Pembayaran melalui Bank ${paymentMethod} berhasil atas nama ${accountName}`);
      

      //PEMBAYARAN//
    } else {
      alert('Silakan isi semua data pembayaran.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      {state ? (
        <div className="row mt-4">
          <div className="col-md-4">
            <img src={state.src} alt={state.title} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h4>{state.title}</h4>
            <p className="text-success fw-bold">{state.price}</p>

            <hr />
            <h5>Metode Pembayaran</h5>
            <select
              className="form-select mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="BCA">Bank BCA</option>
              <option value="Mandiri">Bank Mandiri</option>
              <option value="BNI">Bank BNI</option>
              <option value="BRI">Bank BRI</option>
              <option value="DANA">Dana</option>
            </select>

            <div className="mb-3">
              <label className="form-label">Nama Pemilik Rekening</label>
              <input
                type="text"
                className="form-control"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nomor Rekening</label>
              <input
                type="text"
                className="form-control"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={handlePayment}>
              Bayar Sekarang
            </button>
          </div>
        </div>
      ) : (
        <p>Produk tidak ditemukan.</p>
      )}
    </div>
  );
};

export default Checkout;

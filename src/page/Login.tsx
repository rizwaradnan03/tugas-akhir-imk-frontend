import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika login atau redirect
    navigate('/');
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika login atau redirect
    navigate('/Register');
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#00AEEF', position: 'relative' }}>
      {/* Gambar dan teks kiri atas */}
      <div style={{ position: 'absolute', top: '20px', left: '20px' }} className="d-flex align-items-center">
        <img src="/bola.png" alt="logo" width={60} height={60} className="me-2" />
        <h4 className="text-white m-0 fw-bold">Selamat Datang</h4>
      </div>

      {/* Form login */}
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h4 className="fw-bold text-center mb-3">Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" id="username" className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Masuk
          </button>
          <button onClick={() => navigate('/register')} className="btn btn-info w-100 mt-2">
            Gak Punya Akun? Yuk Klik Ini
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

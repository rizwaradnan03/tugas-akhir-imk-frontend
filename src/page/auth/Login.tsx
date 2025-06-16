import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Login as LoginApi } from '@/api/auth';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const login = await LoginApi({data: {email: email, password: password}})

      localStorage.setItem("access_token", login.access_token)
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error("Kesalahan ketika login!")
    }
  };


  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#00AEEF', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px' }} className="d-flex align-items-center">
        <img src="/bola.png" alt="logo" width={60} height={60} className="me-2" />
        <h4 className="text-white m-0 fw-bold">Selamat Datang</h4>
      </div>

      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h4 className="fw-bold text-center mb-3">Login</h4>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="form-control" required />
          </div>
          <button onClick={() => handleSubmit()}  className="btn btn-primary w-100">
            Masuk
          </button>
      </div>
    </div>
  );
};

export default Login;

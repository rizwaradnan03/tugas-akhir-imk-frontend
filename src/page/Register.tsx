import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => { //buat target ke Daftar
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi tidak sama");
      return;
    }

    // Simpan data ke localStorage (simulasi signup)
    localStorage.setItem("user", JSON.stringify({ username: form.username, password: form.password }));
    alert("Akun berhasil dibuat!");
    navigate("/Login");
  };

  return (
    <div style={{ backgroundColor: "#00BFFF", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", width: "350px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>SignUP</h3>
        <form onSubmit={handleSubmit}>
          <label>Buat Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <label>Masukkan Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <label>Konfirmasi Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-2">Daftar</button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="btn btn-info w-100"
          >
            Punya Akun? Login Disini yaa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

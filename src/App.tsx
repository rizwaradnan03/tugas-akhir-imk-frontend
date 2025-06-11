import { Route, Routes, useLocation } from "react-router-dom";
import Category from "./page/Category";
import Home from "./page/Home";
import Product from "./page/Product";
import Login from "./page/auth/Login";
import Checkout from "./page/Checkout";
import { Pay } from "./page/Pay";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import Register from "./page/auth/Register"

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const snapScript = import.meta.env.VITE_SNAP_SCRIPT;
    const clientKey = import.meta.env.VITE_CLIENT_KEY;

    console.log("snap script", snapScript);
    console.log("client script", clientKey);

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const hideNavbar = ["/login", "/register"];

  return (
    <>
      {!hideNavbar.includes(location.pathname.toLowerCase()) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/pay/:token" element={<Pay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;

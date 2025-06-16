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
import { AdminDashboard } from "./page/admin/dashboard";
import ProductList from "./page/auth/product/product-list";
import ProductCreate from "./page/auth/product/product-create";
import { ProductEdit } from "./page/auth/product/product-edit";
import CategoryList from "./page/auth/category/category-list";
import CategoryCreate from "./page/auth/category/category-create";
import { CategoryEdit } from "./page/auth/category/category-edit";

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

        <Route path="/admin/*" element={
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />}></Route>

            <Route path="category/*" element={
              <Routes>
                <Route index element={<CategoryList />} />
                <Route path="create" element={<CategoryCreate />} />
                <Route path=":id" element={<CategoryEdit />} />
              </Routes>
            } />
            
            <Route path="product/*" element={
              <Routes>
                <Route index element={<ProductList />} />
                <Route path="create" element={<ProductCreate />} />
                <Route path=":id" element={<ProductEdit />} />
              </Routes>
            } />
          </Routes>
        } />

      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;

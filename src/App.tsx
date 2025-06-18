import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Category from "./page/Category";
import Home from "./page/Home";
import Product from "./page/Product";
import Login from "./page/auth/Login";
import Checkout from "./page/Checkout";
import { Pay } from "./page/Pay";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Register from "./page/auth/Register";
import { AdminDashboard } from "./page/admin/dashboard";
import ProductList from "./page/admin/product/product-list";
import ProductCreate from "./page/admin/product/product-create";
import { ProductEdit } from "./page/admin/product/product-edit";
import CategoryList from "./page/admin/category/category-list";
import CategoryCreate from "./page/admin/category/category-create";
import { CategoryEdit } from "./page/admin/category/category-edit";
import AdminCheckout from "./page/admin/checkout/checkout-list";
import CheckoutDetail from "./page/admin/checkout/checkout-detail";
import AccountList from "./page/admin/account/account-list";
import { RegisterCreate } from "./page/admin/account/account-create";

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

        <Route
          path="/admin/*"
          element={
            localStorage.getItem("access_token") ? (
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />

                <Route
                  path="category/*"
                  element={
                    <Routes>
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path=":id" element={<CategoryEdit />} />
                    </Routes>
                  }
                />

                <Route
                  path="product/*"
                  element={
                    <Routes>
                      <Route index element={<ProductList />} />
                      <Route path="create" element={<ProductCreate />} />
                      <Route path=":id" element={<ProductEdit />} />
                    </Routes>
                  }
                />

                <Route
                  path="checkout/*"
                  element={
                    <Routes>
                      <Route index element={<AdminCheckout />} />
                      <Route path="detail/:id" element={<CheckoutDetail />} />
                    </Routes>
                  }
                />

                <Route
                  path="account/*"
                  element={
                    <Routes>
                      <Route index element={<AccountList />} />
                      <Route path="register" element={<RegisterCreate />} />
                    </Routes>
                  }
                />
              </Routes>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;

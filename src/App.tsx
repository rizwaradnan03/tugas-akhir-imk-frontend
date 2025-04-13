import { Route, Routes } from "react-router-dom"
import Category from "./page/Category"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./page/Home"
import { Toaster } from "react-hot-toast"
import Product from "./page/Product";
import Navbar from "./components/navbar";
import Checkout from "./page/Checkout";
import { useEffect } from "react";
import { Pay } from "./page/Pay";

const App = () => {

  useEffect (() => {
    const snapScript = import.meta.env.VITE_SNAP_SCRIPT
    const clientKey = import.meta.env.VITE_CLIENT_KEY

    console.log("snap script", snapScript)
    console.log("client script", clientKey)

    const script = document.createElement("script")
    script.src = snapScript
    script.setAttribute("data-client-key", clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home route */}
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Home />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/pay/:token" element={<Pay />} />
        {/* <Route path="/Cart" elemnet={<Cart />}/> */}
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

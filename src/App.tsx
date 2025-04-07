import { Route, Routes } from "react-router-dom"
import Category from "./page/Category"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./page/Home"
import { Toaster } from "react-hot-toast"
import Product from "./page/Product";
import Navbar from "./components/navbar";
import Checkout from "./page/Checkout";
// import Cart from"./page/Cart;

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home route */}
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Home />} />
        <Route path="/Checkout" element={<Checkout />} />
        {/* <Route path="/Cart" elemnet={<Cart />}/> */}
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

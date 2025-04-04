import { BrowserRouter, Route, Routes } from "react-router-dom"
import Category from "./page/Category"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./page/Home"
import { Toaster } from "react-hot-toast"
import Product from "./page/Product";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home route */}
          <Route path="/category" element={<Category/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

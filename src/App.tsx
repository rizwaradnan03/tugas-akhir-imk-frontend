import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./page/Home"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

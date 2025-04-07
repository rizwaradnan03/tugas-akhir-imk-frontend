import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsCart3 } from 'react-icons/bs'

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0) 

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Beranda</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/category">Kategori</Link>
            <Link className="nav-link" to="/product">Produk</Link>
            <Link className="nav-link" to="/checkout">Checkout</Link>
            {/* <Link className="nav-link" to="/masukan keranjang">masukan keranjang</Link> */}
          </div>

          {/* Ikon Keranjang */}
          <div className="d-flex align-items-center">
            <Link to="/cart" className="text-decoration-none position-relative">
              <BsCart3 size={28} style={{ color: 'orange' }} />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

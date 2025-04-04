import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <div>
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Beranda</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/category">Kategori</Link>
        {/* <a className="nav-link" href="#">Produk</a> */}
        <Link className="nav-link" to="/product">product</Link>
        <Link className="nav-link" to="/Checkout">Checkout</Link>
        
      </div>
    </div>
  </div>
</nav>


        
    </div>
  )
}

export default Navbar
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';

const MyNavbar = () => {
  const [cartCount, setCartCount] = useState(0);

  // Fungsi untuk logout, bisa dihubungkan dengan sistem auth nanti
  const handleLogout = () => {
    console.log("Logout clicked");
    // Tambahkan logika logout di sini (misal hapus token, redirect, dll)
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">Beranda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/category">Kategori</Nav.Link>
            <Nav.Link as={Link} to="/product">Produk</Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <BsCart3 size={24} style={{ color: 'orange' }} />
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Tombol Logout dengan warna merah */}
            <Button variant="" onClick={handleLogout} className="ms-4">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

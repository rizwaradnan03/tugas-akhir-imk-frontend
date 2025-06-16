import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Badge, Button, NavLink, Nav } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';

const MyNavbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">Beranda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink as={Link} to={localStorage.getItem("access_token") ? "/admin/category" : "/category"}>Kategori</NavLink>
            <NavLink as={Link} to={localStorage.getItem("access_token") ? "/admin/product" : "/product"}>Produk</NavLink>
            {localStorage.getItem("acccess_token") ? (
              <NavLink as={Link} to="/checkout">Checkout</NavLink>
            ) : null}
          </Nav>

          <Nav className="align-items-center">
            <NavLink as={Link} to="/cart" className="position-relative">
              <BsCart3 size={24} style={{ color: 'orange' }} />
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </NavLink>

            <Button variant='' onClick={handleLogout} className="ms-4">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

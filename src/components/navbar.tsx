import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Button, NavLink, Nav } from "react-bootstrap";

const MyNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Beranda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink as={Link} to="/admin/category">
              Kategori
            </NavLink>
            <NavLink as={Link} to="/admin/product">
              Produk
            </NavLink>
            <NavLink as={Link} to={localStorage.getItem("access_token") ? "/admin/checkout" : "/checkout"}>
              Checkout
            </NavLink>
          </Nav>

          <Nav className="align-items-center ms-auto">
            <Button
            className={`btn ${localStorage.getItem("access_token") ? "btn-danger" : "btn-primary"}`}
            // className="btn btn-danger"
              onClick={() =>
                localStorage.getItem("access_token")
                  ? handleLogout()
                  : navigate("/login")
              }
            >
              {localStorage.getItem("access_token") ? "Logout" : "Login"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

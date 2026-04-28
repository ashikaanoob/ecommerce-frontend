import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Navbar className="navbar-custom" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">ShopZone</Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>

          {userInfo ? (
            <>
              {userInfo.isAdmin && (
                <Nav.Link as={Link} to="/admin">
                  Admin Dashboard
                </Nav.Link>
              )}

              <NavDropdown title={userInfo.name} id="user-menu">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
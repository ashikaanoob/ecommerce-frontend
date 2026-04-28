import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Nav className="d-flex gap-3 border rounded p-3 bg-white shadow-sm">
        <Nav.Link as={Link} to="/admin/products">Products</Nav.Link>
        <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
        <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
        <Nav.Link as={Link} to="/admin/product/add">Add Product</Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminNavbar;
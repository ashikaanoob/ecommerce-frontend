import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container className="mt-4">
      
      <h2>Admin Dashboard</h2>
   

      <Row className="mt-4">
        <Col md={4}>
          <Card as={Link} to="/admin/products" className="p-4 text-center shadow-sm text-decoration-none">
            <h4>Manage Products</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card as={Link} to="/admin/orders" className="p-4 text-center shadow-sm text-decoration-none">
            <h4>Manage Orders</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card as={Link} to="/admin/users" className="p-4 text-center shadow-sm text-decoration-none">
            <h4>Manage Users</h4>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
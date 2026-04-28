import { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>

      <Row>
        <Col md={8}>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </Col>

                  <Col md={4}>{item.name}</Col>
                  <Col md={3}>₹{item.price}</Col>
                  <Col md={3}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4>Total: ₹{totalPrice}</h4>

            <Button
              className="btn-custom mt-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
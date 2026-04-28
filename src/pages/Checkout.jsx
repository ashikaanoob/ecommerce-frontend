import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Checkout = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: 1,
        price: item.price,
        image: item.image,
        product: item._id,
      })),
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
      totalPrice: cartItems.reduce((acc, item) => acc + item.price, 0),
    };

    try {
      await API.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      localStorage.removeItem("cartItems");
      alert("Order Placed Successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <Card className="p-4 shadow-sm">
        <h2>Checkout</h2>

        <Form onSubmit={placeOrderHandler}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="btn-custom w-100">
            Place Order
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Checkout;
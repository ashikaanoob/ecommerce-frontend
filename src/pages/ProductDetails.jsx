import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import API from "../api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = async () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      alert("Product already in cart");
      return;
    }

    const cartProduct = {
      _id: product._id,
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    };

    const updatedCart = [...cart, cartProduct];

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    try {
      await API.put("/users/cart", { cart: updatedCart });
    } catch (error) {
      console.log(error);
    }

    navigate("/cart");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="img-fluid rounded"
          />
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h2>{product.name}</h2>
            <h4 className="my-3">₹{product.price}</h4>
            <p>{product.description}</p>

            <Button className="btn-custom mt-3" onClick={addToCartHandler}>
              Add To Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
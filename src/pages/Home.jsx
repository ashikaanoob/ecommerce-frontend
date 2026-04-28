import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import API from "../api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Latest Products</h2>
      <Row>
        {products.map((product) => (
          <Col md={4} lg={3} sm={6} xs={12} className="mb-4" key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
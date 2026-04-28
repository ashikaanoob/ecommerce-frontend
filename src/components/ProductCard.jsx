import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card className="card-custom shadow-sm">
      <Card.Img
        variant="top"
        src={product.image || "https://via.placeholder.com/300"}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>₹{product.price}</Card.Text>

        <Button as={Link} to={`/product/${product._id}`} className="btn-custom w-100">
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
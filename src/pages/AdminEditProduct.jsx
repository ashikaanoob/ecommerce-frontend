import { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";
const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setName(data.name);
      setPrice(data.price);
      setCategory(data.category);
      setCountInStock(data.countInStock);
      setDescription(data.description);
      setImage(data.image);
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.put(`/products/${id}`, {
      name,
      price,
      category,
      countInStock,
      description,
      image,
    });

    alert("Product Updated");
    navigate("/admin/products");
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
        
      <Card className="p-4 shadow-sm">
        <h2>Edit Product</h2>
<AdminNavbar />
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control value={countInStock} onChange={(e) => setCountInStock(e.target.value)} placeholder="Stock" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </Form.Group>

          <Button type="submit" className="btn-custom w-100">
            Update Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminEditProduct;
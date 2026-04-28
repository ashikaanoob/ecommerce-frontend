import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.post("/products", {
      name,
      price,
      category,
      countInStock,
      description,
      image,
    });

    alert("Product Added");
    navigate("/admin/products");
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <h2>Add Product</h2>
      <AdminNavbar />

      <Card className="p-4 shadow-sm">
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
            Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminAddProduct;
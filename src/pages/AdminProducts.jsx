import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import API from "../api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await API.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      
      <h2>Manage Products</h2>
<AdminNavbar />
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.countInStock}</td>
              <td>
                <Button
  variant="warning"
  size="sm"
  className="me-2"
  onClick={() => navigate(`/admin/product/${product._id}/edit`)}
>
  Edit
</Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProducts;
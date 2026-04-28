import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await API.get("/orders");
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <Container className="mt-4">
      
      <h2>Manage Orders</h2>
<AdminNavbar />
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>₹{order.totalPrice}</td>
              <td>{order.shippingAddress?.city}</td>
              <td>{order.shippingAddress?.country}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrders;
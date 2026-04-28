import { useEffect, useState } from "react";
import { Container, Card, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

const AdminUserDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await API.get(`/users/${id}`);
      setData(res.data);
    };

    fetchUserDetails();
  }, [id]);

  if (!data) return <h4 className="m-4">Loading...</h4>;

  return (
    <Container className="mt-4">
      <h2>User Details</h2>
      <AdminNavbar />

      <Card className="p-4 mb-4 shadow-sm">
        <h4>{data.user.name}</h4>
        <p><strong>Email:</strong> {data.user.email}</p>
        <p><strong>Admin:</strong> {data.user.isAdmin ? "Yes" : "No"}</p>
      </Card>

      <h4>Order History</h4>

      {data.orders.map((order) => (
        <Card key={order._id} className="p-3 mb-4 shadow-sm">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          <p>
            <strong>Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <Table bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      ))}
    </Container>
  );
};

export default AdminUserDetails;
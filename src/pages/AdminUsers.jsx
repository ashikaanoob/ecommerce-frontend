import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await API.get("/users");
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Manage Users</h2>
      <AdminNavbar />

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => navigate(`/admin/users/${user._id}`)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsers;
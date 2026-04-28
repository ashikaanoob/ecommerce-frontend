import { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Profile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Fetching profile data...");
      try {
        const { data } = await API.get("/users/profile");

        console.log("PROFILE DATA:", data);

        setForm({
          name: data?.name ?? "",
          email: data?.email ?? "",
          password: "",
          address: data?.address?.address ?? "",
          city: data?.address?.city ?? "",
          postalCode: data?.address?.postalCode ?? "",
          country: data?.address?.country ?? "",
        });
      } catch (error) {
        console.log("PROFILE FETCH ERROR:", error);
      }
    };

    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email) {
    alert("Name and Email are required");
    return;
  }

  try {
    const { data } = await API.put("/users/profile", form);

    localStorage.setItem("userInfo", JSON.stringify(data));

    alert("Profile Updated Successfully");
    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Profile update failed");
  }
};
  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <Card className="p-4 shadow-sm">
        <h2>My Profile</h2>

        <Form onSubmit={submitHandler} autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={form.name}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={form.email}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="New Password"
              value={form.password}
              autoComplete="new-password"
              style={{ marginBottom: "18px" }}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Address"
              value={form.address}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="City"
              value={form.city}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Postal Code"
              value={form.postalCode}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Country"
              value={form.country}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </Form.Group>

          <Button type="submit" className="btn-custom w-100">
            Update Profile
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/register", { name, email, password });

      alert("Registered Successfully");

      // clear form
      setName("");
      setEmail("");
      setPassword("");

      // go to login
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2>Register</h2>
      <Form onSubmit={submitHandler} autoComplete="off">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="btn-custom w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
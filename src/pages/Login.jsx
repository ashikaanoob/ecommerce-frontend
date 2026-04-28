import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", { email, password });

      // Save user info
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Load saved cart from DB
      const cartRes = await API.get("/users/cart", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      localStorage.setItem("cartItems", JSON.stringify(cartRes.data));

      alert("Login Successful");

      // clear form
      setEmail("");
      setPassword("");

      // go home
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2>Login</h2>
      <Form onSubmit={submitHandler} autoComplete="off">
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
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
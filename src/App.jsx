import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import "./Global.css";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminUserDetails from "./pages/AdminUserDetails";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/orders" element={<AdminOrders />} />
<Route path="/admin/users" element={<AdminUsers />} />
<Route path="/admin/product/:id/edit" element={<AdminEditProduct />} />
<Route path="/admin/product/add" element={<AdminAddProduct />} />
<Route path="/admin/users/:id" element={<AdminUserDetails />} />
<Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
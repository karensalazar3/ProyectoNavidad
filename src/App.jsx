import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import { UserProvider} from "./context/UserContext/UserState";
import { ProductProvider } from "./context/ProductContext/ProductState";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";

function App() {
  const isLoggedIn = localStorage.getItem("token");  

  return (
    <UserProvider>
      <BrowserRouter>
        <ProductProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

            </Routes>
          </main>
          <Footer />
        </ProductProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

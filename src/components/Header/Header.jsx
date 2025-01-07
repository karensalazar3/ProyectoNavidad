import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserState";
import { Avatar, Space, Button, Badge, Menu, Dropdown } from "antd";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./Header.scss";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(ProductContext);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button onClick={logoutUser} type="link">
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">Adornate con amor</Link>
      </div>
      <div className="header-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/cart">
              <Badge count={cart.length} showZero>
                <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />
              </Badge>
            </Link>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space size={16} className="header-user">
                <Avatar>{user.name[0].toUpperCase()}</Avatar>
              </Space>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import { Button, Empty, Card, notification, Spin } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ProductContext } from "../../context/ProductContext/ProductState";
import "./Cart.scss";

const Cart = () => {
  const { cart, removeCart, createOrder } = useContext(ProductContext); 
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); 
      if (!token) {
        throw new Error("User not authenticated");
      }

      const orderData = {
        items: cart.map((product) => ({
          productId: product._id,
          quantity: 1,
        })),
        total: cart.reduce((sum, product) => sum + (parseFloat(product.price) || 0), 0),
      };

      await createOrder(orderData, token);
      notification.success({
        message: "Order created",
        description: "Your order has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      notification.error({
        message: "Error",
        description: "There was an issue creating your order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = (productId) => {
    removeCart(productId);
    notification.info({
      message: "Product removed",
      description: "The product has been removed from the cart.",
    });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <Empty description="The cart is empty" />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-products">
        {cart.map((product) => (
          <Card
            key={product._id}
            className="cart-product-card"
            title={product.name}
            bordered={false}
            extra={`Price: ${product.price} €`}
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveProduct(product._id)}
              >
                Remove
              </Button>,
            ]}
          >
            <p>{product.description || "No description available"}</p>
          </Card>
        ))}
      </div>
      <h3 className="cart-total">
        Total: {cart.reduce((sum, product) => sum + (parseFloat(product.price) || 0), 0)} €
      </h3>
      <div className="cart-actions">
        <Button
          onClick={handleCreateOrder}
          type="primary"
          icon={<ShoppingCartOutlined />}
          loading={loading}
        >
          Create Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;

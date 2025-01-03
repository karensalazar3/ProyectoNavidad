import React, { useContext, useState } from "react";
import { Button, Empty, Card, notification, Spin } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ProductContext } from "../../context/ProductContext/ProductState";
import "./Cart.scss";

const Cart = () => {
  const { cart, clearCart, createOrder } = useContext(ProductContext);
  const [loading, setLoading] = useState(false); 

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      await createOrder();
      notification.success({
        message: "Pedido creado",
        description: "Tu pedido se ha creado exitosamente.",
      });
      clearCart();
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      notification.error({
        message: "Error",
        description: "Hubo un problema al crear tu pedido. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <Empty description="El carrito está vacío" />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Carrito</h2>
      <div className="cart-products">
        {cart.map((product) => (
          <Card
            key={product._id}
            className="cart-product-card"
            title={product.name}
            bordered={false}
            extra={`Precio: ${product.price} €`}
          >
            <p>{product.description || "Sin descripción disponible"}</p>
          </Card>
        ))}
      </div>
      <h3 className="cart-total">
        Total: {cart.reduce((sum, product) => sum + product.price, 0)} €
      </h3>
      <div className="cart-actions">
        <Button onClick={clearCart} danger icon={<DeleteOutlined />}>
          Vaciar carrito
        </Button>
        <Button
          onClick={handleCreateOrder}
          type="primary"
          icon={<ShoppingCartOutlined />}
          loading={loading}
        >
          Crear pedido
        </Button>
      </div>
    </div>
  );
};

export default Cart;

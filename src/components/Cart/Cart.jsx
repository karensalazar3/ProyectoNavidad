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
        throw new Error("Usuario no autenticado");
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
        message: "Pedido creado",
        description: "Tu pedido se ha creado exitosamente.",
      });
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

  const handleRemoveProduct = (productId) => {
    removeCart(productId);
    notification.info({
      message: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito.",
    });
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
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveProduct(product._id)}
              >
                Eliminar
              </Button>,
            ]}
          >
            <p>{product.description || "Sin descripción disponible"}</p>
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
          Crear pedido
        </Button>
      </div>
    </div>
  );
};

export default Cart;

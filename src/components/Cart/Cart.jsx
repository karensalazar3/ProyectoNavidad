import React, { useContext } from 'react';
import { Button, Empty } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { ProductContext } from '../../context/ProductContext/ProductState';

const Cart = () => {
  const { cart, clearCart, createOrder } = useContext(ProductContext);

  if (cart.length === 0) {
    return <Empty description="The cart is empty" />;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((product) => (
        <div key={product._id}>
          <p>
            Product name: {product.name} | Price: {product.price} €
          </p>
        </div>
      ))}
      <h3>
        Total: {cart.reduce((sum, product) => sum + product.price, 0)} €
      </h3>
      <Button onClick={clearCart}>
        Clear cart <DeleteOutlined />
      </Button>
      <Button onClick={createOrder} type="primary">
        Create order
      </Button>
    </div>
  );
};

export default Cart;

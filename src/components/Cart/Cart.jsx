import React, { useContext } from 'react';
import { Button, Empty } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import OrderService from '../../services/OrderService';

const Cart = () => {
  const { cart } = useContext(ProductContext);

  if (cart.length === 0) {
    return <Empty description="The cart is empty" />;
  }

  const handleCreateOrder = async () => {
    try {
    
      await OrderService.createOrder(cart);
      dispatch({ type: 'CLEAR_CART' }); 
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    }
  };

  return (
    <div>
      {cart.map((product) => (
        <div key={product._id}>
          <p>Product name: {product.name} Price: {product.price} €</p>
        </div>
      ))}
      <Button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear cart <DeleteOutlined />
      </Button>
      <Button onClick={handleCreateOrder}>Create order</Button>
    </div>
  );
};

export default Cart;

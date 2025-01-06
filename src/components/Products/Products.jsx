import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Button, Card, Spin, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from '../../assets/logo.jpg';
import "./Products.scss";

const Products = () => {
  const { fetchProducts, products, loading, error, addCart } = useContext(ProductContext);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLocalLoading(true);
      try {
        await fetchProducts();
      } catch (err) {
        message.error("Error loading products.");
      } finally {
        setLocalLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error loading products. {error.message}</div>;
  }

  if (localLoading || loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <div>No products available.</div>
        ) : (
          products.map((product) => (
            <Card
              key={product._id}
              title={product.name}
              bordered={false}
              style={{ width: 300 }}
            >
              {/* Display product image */}
              <img
                src={logo}
                alt="Logo"
                style={{ width: '100%', height: 'auto' }}
              />
              <p>{product.price} €</p>
              <Button
                type="default"
                onClick={() => addCart(product)}
                icon={<ShoppingCartOutlined />}
              >
                Add to Cart
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;

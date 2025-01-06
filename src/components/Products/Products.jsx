import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Button, Card, Spin, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
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
        message.error("Error al cargar los productos.");
      } finally {
        setLocalLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error al cargar los productos. {error.message}</div>;
  }

  if (localLoading || loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <h2>Productos</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <div>No hay productos disponibles.</div>
        ) : (
          products.map((product) => (
            <Card
              key={product._id}
              title={product.name}
              bordered={false}
              style={{ width: 300 }}
            >
              {/* Mostrar la imagen del producto */}
              


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

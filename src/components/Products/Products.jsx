import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Button, Card } from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons"
const Products = () => {
  const { fetchProducts, products,addCart } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      hola
      {/* {console.log(products)} */}
      {products.map((product) => {
        return (
          <Card
            title={product.name}
            bordered={false}
            style={{
              width: 300,
            }}
            key={product._id}
          >
            <p>{product.price} €</p>
            <Button color="default" variant="filled" onClick={()=>addCart(product)}><ShoppingCartOutlined /> Add Cart </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;
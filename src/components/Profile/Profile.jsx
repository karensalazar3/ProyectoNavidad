import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import { Card, Spin } from 'antd';
import './Profile.scss'; // Asegúrate de importar el archivo SCSS

const Profile = () => {
  const { getUserInfo, user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener información del usuario
    getUserInfo();

    // Obtener los pedidos del usuario
    fetch('/api/orders') // Cambia esta URL según tu API
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [getUserInfo]);

  // Verificación de que los datos del usuario estén cargados
  if (loading) {
    return (
      <div className="profile-loading">
        <Spin size="large" />
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {user && user.name ? (
        <Card className="profile-card" title={user.name} bordered={false}>
          <p>{user.email}</p>
          <h3 className="orders-title">Mis pedidos:</h3>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order.id} className="order-card" title={`Pedido #${order.id}`} bordered={false}>
                <p>Detalles: {order.details}</p>
                <p>Fecha: {order.date}</p>
              </Card>
            ))
          ) : (
            <p>No tienes pedidos.</p>
          )}
        </Card>
      ) : (
        <p>No se ha podido cargar la información del usuario.</p>
      )}
    </div>
  );
};

export default Profile;

import { Button, Form, Input, notification } from "antd";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import { useNavigate } from "react-router-dom";
import "./Register.scss"; // Estilo del componente

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Register Success:", values);

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        login(data);

        notification.success({
          message: "Registro Exitoso",
          description: "El usuario ha sido registrado con éxito.",
        });

        navigate("/profile");
      } else {
        notification.error({
          message: "Error en el Registro",
          description: data.message || "Hubo un error al registrar el usuario.",
        });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      notification.error({
        message: "Error del Servidor",
        description: "No se pudo conectar al servidor. Intenta nuevamente más tarde.",
      });
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro de Usuario</h2>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Campo de Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Por favor ingresa tu correo electrónico!" },
            { type: "email", message: "Por favor ingresa un correo electrónico válido!" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Campo de Contraseña */}
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña!" },
            { min: 6, message: "La contraseña debe tener al menos 6 caracteres." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Campo Confirmar Contraseña */}
        <Form.Item
          label="Confirmar Contraseña"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Por favor confirma tu contraseña!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Las contraseñas no coinciden!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Botón de Registro */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

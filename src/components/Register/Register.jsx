import { Button, Form, Input, notification, DatePicker } from "antd"; // Import DatePicker
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import { useNavigate } from "react-router-dom";

import "./Register.scss";

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Register Success:", values);

    const formattedValues = {
      ...values,
      birthdate: values.birthdate ? values.birthdate.format("YYYY-MM-DD") : "", // Format the date
    };

    try {
      const response = await fetch("http://localhost:3000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        login(data);

        notification.success({
          message: "Registration Successful",
          description: "The user has been successfully registered.",
        });

        navigate("/profile");
      } else {
        notification.error({
          message: "Registration Error",
          description: data.message || "There was an error registering the user.",
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      notification.error({
        message: "Server Error",
        description: "Could not connect to the server. Please try again later.",
      });
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">User Registration</h2>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Name Field */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "The password must be at least 6 characters long." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Birthdate Field */}
        <Form.Item
          label="Birthdate"
          name="birthdate"
          rules={[{ required: true, message: "Please select your birthdate!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        {/* Register Button */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Typography, Spin } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { RentContext } from "../Context/Context";
import { motion } from "framer-motion";
import { User, Lock, ArrowRight } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { setlogin } = useContext(RentContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Login successful");
        setlogin(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        navigate(data.user.role === "admin" ? "/admin" : "/");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 bg-blue-600">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-lg"
            >
              <User size={32} className="text-blue-600" />
            </motion.div>
            <Title level={3} className="text-center text-white mt-4 mb-0">
              Welcome Back
            </Title>
            <p className="text-center text-blue-100 mt-2">
              Please sign in to continue
            </p>
          </div>

          <div className="p-8">
            <ToastContainer />
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              method="POST"
              className="space-y-4"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input
                    prefix={<User className="text-gray-400" size={18} />}
                    className="h-12 rounded-lg"
                    placeholder="Enter your email"
                  />
                </Form.Item>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password
                    prefix={<Lock className="text-gray-400" size={18} />}
                    className="h-12 rounded-lg"
                    placeholder="Enter your password"
                  />
                </Form.Item>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="h-12 rounded-lg text-lg flex items-center justify-center"
                >
                  {loading ? (
                    <Spin />
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Login</span>
                      <ArrowRight size={18} />
                    </div>
                  )}
                </Button>
              </motion.div>
            </Form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-1 text-sm"
              >
                <span>Don't have an account?</span>
                <span className="font-semibold">Sign up</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
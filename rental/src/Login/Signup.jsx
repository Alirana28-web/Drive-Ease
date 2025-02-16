import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { RentContext } from '../Context/Context';

const { Title } = Typography;
const Signup = () => {
  const navigate = useNavigate(); 
  const { setlogin } = useContext(RentContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setlogin(true);
        navigate('/');
        toast.success("Signup successful");
      } else {
        toast.error(data.error || "Email already exists");
      }
    } catch (error) {
      console.error('Server error:', error);
      toast.error("Server error occurred");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex justify-center items-center min-h-screen p-4 bg-gray-100"
    >
      <ToastContainer />
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <Title level={3} className="text-center mb-4">Sign Up</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }, { min: 3, message: 'Name must be at least 3 characters' }]}> 
            <Input name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}> 
            <Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }, { min: 6, message: 'Password must be at least 6 characters' }]}> 
            <Input.Password name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password' }, ({ getFieldValue }) => ({ validator(_, value) { return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('Passwords do not match')); } })]}> 
            <Input.Password name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button type="primary" htmlType="submit" block>Sign Up</Button>
            </motion.div>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          Already have an account? <Link to="/login"><Button type="link">Login</Button></Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
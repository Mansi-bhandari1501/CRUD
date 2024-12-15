import { Box } from '@mui/material';
import React from 'react';
import './login.css';
import LoginPage from '../../components/Forms/LoginForm.jsx';

const Login = () => {
  return (
    <Box className="login-container">
      <Box className="login-image" />
      <Box className="login-form">
        <LoginPage />
      </Box>
    </Box>
  );
}

export default Login;

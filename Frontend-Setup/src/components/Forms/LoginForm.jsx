
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginApi } from '../../feature/user/user.action';
import useNotification from '../../hooks/useNotification';

const schema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
});

const LoginPage = () => {
  const showNotification = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (payload) => {
    try {
      const res = await dispatch(LoginApi(payload));
      if (res?.meta?.requestStatus === "fulfilled") {
        showNotification("Logged-In successfully", "success");

        // Check for token in local storage
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/owner/panel");
          
        } else {
          showNotification("No token found. Please log in again.", "error");
        }
      } else if (res?.meta?.requestStatus === "rejected") {
        showNotification(res?.payload?.response?.data.error, "error");
      }
    } catch (error) {
      showNotification("Error", "error");
      console.log('error: ', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100vw', height: '100vh', padding: '16px' }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%', maxWidth: '400px' }}
      >
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;

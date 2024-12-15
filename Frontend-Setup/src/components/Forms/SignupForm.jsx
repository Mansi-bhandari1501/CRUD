
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUserData } from '../../feature/user/user.action';
import useNotification from '../../hooks/useNotification.jsx'


const userSchema = z.object({
  username: z.string().min(4, 'Username is required'),
  email: z.string().email('Invalid email address').min(6,'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long').min(6,'Password is required'),
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showNotification =useNotification();

  const { register: registerUser, handleSubmit: handleSubmitUser, formState: { errors: errorsUser } } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmitUser = async(data) => {
    const payload ={
      ...data,
    }
    try {
      const res = await dispatch(signupUserData(payload));
      if (res?.meta?.requestStatus === "fulfilled") {
          showNotification("Registered successfully", "success");
          navigate("/login")
      }
      if (res?.meta?.requestStatus === "rejected") {
          showNotification(res?.payload?.response?.data.error , "error");
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
        Sign Up
      </Typography>
      {/* <RadioGroup
        value={signupType}
        onChange={(e) => setSignupType(e.target.value)}
        row
        sx={{ mb: 2, gap: '25px' }}
      >
        <FormControlLabel value="user" control={<Radio />} label="As User" />
        <FormControlLabel value="restaurant" control={<Radio />} label="As Owner" />
      </RadioGroup> */}

     
        <Box
          component="form"
          onSubmit={handleSubmitUser(onSubmitUser)}
          sx={{ width: '100%', maxWidth: '400px' }}
        >
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...registerUser('username')}
            error={!!errorsUser.username}
            helperText={errorsUser.username?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...registerUser('email')}
            error={!!errorsUser.email}
            helperText={errorsUser.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...registerUser('password')}
            error={!!errorsUser.password}
            helperText={errorsUser.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up as User
          </Button>
        </Box>
   
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
          Log in
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupPage;

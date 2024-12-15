import { Box } from '@mui/material'
import React from 'react'
import SignupPage from '../../components/Forms/SignupForm'
import "./signup.css"

const Signup = () => {
  return (
    <Box className="signup-container">
    <Box className="signup-form">
    <SignupPage/>
    </Box>
    <Box className="signup-image" />
  </Box>
   
  )
}

export default Signup

import React, { useState } from 'react';
import './navbar.css';
import { Avatar, Divider, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import OwnerSideBar from '../SideBar.jsx/OwnerSidebar';
import { useDispatch } from 'react-redux';
import { logout } from '../../feature/user/user.slice';

const OwnerNavbar = ({ name }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Stack pt={1} height={"100%"} width={"100%"} className='navbar'>
      <Stack 
        direction={"row"} 
        justifyContent={"space-between"} 
        alignItems="center" 
        sx={{
          background: 'linear-gradient(90deg, #1E88E5, #1976D2)', // Blue gradient
          padding: '10px 20px',
          borderBottom: '2px solid #fff'
        }}
      >
        <Stack ml={5}>
          {/* <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>Food App</Typography> */}
          {/* <Typography variant="subtitle1" sx={{ color: '#bbdefb' }}>{name} Panel</Typography>  */}
        </Stack>
        <IconButton onClick={handleClick}>
          <Avatar sx={{ bgcolor: '#ffab00' }} /> 
        </IconButton>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <OwnerSideBar />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout} sx={{ bgcolor: '#e57373', color: '#fff' }}>Logout</MenuItem> {/* Soft red for logout */}
      </Menu>
    </Stack>
  );
};

export default OwnerNavbar;

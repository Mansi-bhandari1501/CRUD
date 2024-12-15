import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; 
import image from "../../assets/Images/Image.webp";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 900,
  minWidth: 800,
  margin: 10,
  borderRadius: 8,
  marginBottom: 15,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
  },
}));

const UserOrderCard = ({ restaurant }) => {
  const { restaurant_id, name, image_url, food_type, description, cuisine } = restaurant;
  const navigate = useNavigate(); 
  const colorPalette = ['primary', 'secondary', 'success', 'error', 'warning']; 

  const getChipColor = (index, type) => {
    if (type === 'food_type') {
      return food_type === 'veg' ? 'success' : 'error';
    }
    return colorPalette[index % colorPalette.length];
  };

  const handleCardClick = () => {
    navigate(`/restaurant/${restaurant_id}`,{ state: restaurant });

  };

  return (
    <StyledCard onClick={handleCardClick}> 
      
    </StyledCard>
  );
};

export default UserOrderCard;

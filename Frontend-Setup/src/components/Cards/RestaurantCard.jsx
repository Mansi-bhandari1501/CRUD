 import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; 
import image from "../../assets/Images/Image.webp";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 350,
  minWidth: 320,
  margin: 10,
  borderRadius: 8,
  marginBottom: 15,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
  },
}));

const RestaurantCard = ({ restaurant }) => {
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
      <CardMedia
        component="img"
        height="140"
        image={image_url ? `http://localhost:8080/${image_url}` : image}
        alt={name || 'Restaurant Image'}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name || 'Restaurant Name'}
        </Typography>
        <Typography sx={{ fontSize: "12px" }} gutterBottom>
          {description || 'No description available.'}
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={.5}>
          {Array.isArray(cuisine) && cuisine.map((item, index) => (
            <Chip
              key={`cuisine-${item}`} 
              sx={{ height: "20px", fontSize: "12px" }}
              label={item}
              color={getChipColor(index, 'cuisine')} 
              variant="outlined"
            />
          ))}
          {Array.isArray(food_type) && food_type.map((food) => (
            <Chip
              key={`food-${food}`} 
              sx={{ height: "20px", fontSize: "12px" }}
              label={food}
              color={food === 'veg' ? 'success' : 'error'}
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default RestaurantCard;

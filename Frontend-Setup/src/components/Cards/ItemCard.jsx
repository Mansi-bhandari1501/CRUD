import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Check } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import image from "../../assets/Images/foodimage.jpg";
import { addToCart } from '../../feature/cart/cart.action';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  minWidth: 250,
  margin: 10,
  borderRadius: 8,
  marginBottom: 10,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Fallback shadow
  },
}));

const PriceTypography = styled(Typography)({
  fontWeight: 'bold',
  marginTop: 8,
});

const DescriptionTypography = styled(Typography)({
  marginTop: 8,
  color: 'text.secondary',
});

const FoodItemCard = ({ item }) => {
  console.log('item: ', item);
  const { name, image_url, food_type, price, description, cuisine,restaurant } = item;
  console.log('restaurant: ', restaurant);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();

  // const handleAddToCartClick = () => {
  //   const cartItem = { ...item, quantity };
  //   dispatch(addToCart(cartItem));
  //   setAddedToCart(true);
  //   setShowQuantityControls(true);

  //   // Save to localStorage
  //   const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  //   existingCart.push(cartItem);
  //   localStorage.setItem('cart', JSON.stringify(existingCart));
  // };
  const handleAddToCartClick = () => {
    const cartItem = { ...item, quantity: 1 ,restaurant_id:restaurant?.restaurant_id}; // Adjust the quantity as needed
    console.log('cartItem---: ', cartItem);
    dispatch(addToCart(cartItem));
    setAddedToCart(true);

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const itemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1; 
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };
  // const handleIncreaseQuantity = () => {
  //   setQuantity(prev => prev + 1);
  // };

  // const handleDecreaseQuantity = () => {
  //   setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  // };
  

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="300"
        width="400"
        image={image_url ? `http://localhost:8080/${image_url}` : image}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            label={food_type}
            color={food_type === 'veg' ? 'success' : 'error'}
            variant="outlined"
          />
          <Chip
            label={cuisine}
            color="info"
            variant="outlined"
          />
        </Box>
        <PriceTypography variant="body1" component="div">
          ₹{price}
        </PriceTypography>
        <DescriptionTypography variant="body2" component="p">
          {description}
        </DescriptionTypography>
        <Button
          variant="contained"
          color={addedToCart ? 'success' : 'primary'}
          onClick={handleAddToCartClick}
          fullWidth
          disabled={addedToCart}
          sx={{ marginTop: 2, backgroundColor: addedToCart ? "" : "rgb(255, 165, 0)" }}
          startIcon={addedToCart ? <Check /> : null}
        >
          {addedToCart ? 'Added' : 'Add to Cart'}
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default FoodItemCard;

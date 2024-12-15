import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { capitalize } from "../../libs/commonFxn.js";

const RestaurantDetailHeader = ({ restaurant }) => {
  return (
    <Box className="header" sx={{ bgcolor: "#f5f5f5", padding: 4, textAlign: "center" }}>
      <Typography className="header-title" variant="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
        Welcome to {capitalize(restaurant?.name)}
      </Typography>
      <Typography className="header-para" sx={{ marginY: 2, color: '#555' }}>
        {restaurant?.description || "Discover a variety of dishes crafted with the finest ingredients."}
      </Typography>
      <Button 
        className="header-view-menu" 
        sx={{ color: "black", backgroundColor: "white", padding: "10px", borderRadius: "50px", "&:hover": { backgroundColor: "#ddd" } }}
      >
        View Menu
      </Button>
    </Box>
  );
};

export default RestaurantDetailHeader;

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddressForm = ({ onPlaceOrder }) => {
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onPlaceOrder(address);
    setIsSubmitting(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Enter Your Address
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Address"
          fullWidth
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </Box>
  );
};

export default AddressForm;

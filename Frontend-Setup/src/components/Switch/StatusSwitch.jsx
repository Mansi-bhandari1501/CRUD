

import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const StatusSwitch = ({ status1, setStatus }) => {
  const handleChange = (event) => {
    const newStatus = event.target.checked; 
    setStatus(newStatus);
  };

  return (
    <FormControlLabel
      control={<Switch checked={status1 === true} onChange={handleChange} />}
    //   label={status1 === true ? 'Active' : 'Inactive'} 
    />
  );
};

export default StatusSwitch;

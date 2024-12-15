import React, { useState } from 'react';
import { Box, Chip, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


const StatusFilter = ({ filterName,status, setStatus, statuses }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChipClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (selectedStatus) => {
    setStatus(selectedStatus);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const statusColors = {
    pending: '#6495ED',
    true: '#99d27f',
    false: '#f07373',
    weekly: '#6495ED',
    halfly: '#6495ED',
    fully: '#6495ED',
  };

  const currentStatusLabel = statuses.find((s) => s.value === status)?.label || filterName;

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        label={currentStatusLabel}
        icon={!open ? <ArrowDropDownIcon sx={{ fontSize: '15px' }} /> : <ArrowDropUpIcon sx={{ fontSize: '15px' }} />}
        clickable
        onClick={handleChipClick}
        sx={{
          backgroundColor: status ? statusColors[status] : '#F5F5F5',
          color: status ? '#fff' : '#000',
          py: 0.5,
        }}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {statuses?.map((s) => (
          <MenuItem key={s.value} onClick={() => handleMenuItemClick(s.value)}>
            {s.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default StatusFilter;

import React, { useState } from 'react';
import {
  Box,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Cancel, Done } from '@mui/icons-material';

const DateChipFilter = ({ label, name, onDateChange, setSelectedDate, selectedDate }) => {
  const [view, setView] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    const normalDate = date.format('YYYY-MM-DD');
    setSelectedDate(normalDate);
    onDateChange(name, normalDate); 
    handleClose();
  };

  const handleClear = () => {
    setSelectedDate(null);
    onDateChange(name, ''); 
  };

  return (
    <Box className="mui-date-picker">
      <Chip
        onDelete={selectedDate ? handleClear : undefined}
        onClick={handleClick}
        deleteIcon={<Cancel sx={{ color: '#707070' }} />}
        label={selectedDate ? selectedDate : label}
        icon={selectedDate ? <Done sx={{ fontSize: '20px' }} /> : open ? <ArrowDropUpIcon sx={{ pr: '10px' }} /> : <ArrowDropDownIcon sx={{ pr: '10px' }} />}
        sx={{ gap: selectedDate ? 1 : 0, p: '4px 5px 4px 8px', bgcolor: selectedDate ? '#e9f0fe' : '#F5F5F5', borderRadius: '16px', display: 'flex', flexDirection: selectedDate ? '' : 'row-reverse' }}
      />
      <Menu
        id="date-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'date-menu-button' }}
      >
        <MenuItem disableRipple sx={{ p: '0px !important' }}>
          <Box className="calendarBox">
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DateCalendar
                sx={{ maxHeight: '300px !important' }}
                onChange={handleDateChange}
                onViewChange={() => setView(!view)}
              />
            </LocalizationProvider>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DateChipFilter;

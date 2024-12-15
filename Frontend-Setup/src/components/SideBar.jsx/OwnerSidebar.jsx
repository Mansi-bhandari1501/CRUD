
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import Restaurant from '../../pages/Owner/restaurant';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function OwnerSideBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', width: '100%', borderRadius: 2 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          width: '20%',
          bgcolor: 'whitesmoke',
          '& .Mui-selected': {
            bgcolor: 'blue',
            color: 'white',
            fontWeight: 'bold',
          },
          '& .MuiTab-root': {
            padding: '12px 16px',
            '&:hover': {
              bgcolor: 'grey.300',
            },
          },
        }}
      >
        <Tab label="Restaurant" {...a11yProps(0)} />
        {/* <Tab label="Items" {...a11yProps(1)} />
        <Tab label="Orders" {...a11yProps(2)} />
        <Tab label="Profile Settings" {...a11yProps(3)} /> */}
      </Tabs>
      <TabPanel style={{ width: '100%' }} value={value} index={0}>
        <Restaurant />
      </TabPanel>
      {/* <TabPanel style={{ width: '100%' }} value={value} index={1}>
        <Items />
      </TabPanel>
      <TabPanel style={{ width: '100%' }} value={value} index={2}>
        <Order />
      </TabPanel>
      <TabPanel style={{ width: '100%' }} value={value} index={3}>
        <RestaurantProfileSettings />
      </TabPanel> */}
    </Box>
  );
}
